import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/components/stripe/stripe';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


async function fulfillCheckout(sessionId: string) {
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys

    console.log('Fulfilling Checkout Session ' + sessionId);

    // TODO: Make this function safe to run multiple times,
    // even concurrently, with the same session ID

    // TODO: Make sure fulfillment hasn't already been
    // peformed for this Checkout Session

    // Retrieve the Checkout Session from the API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
    });

    console.log('Fulfilling Checkout Session ' + sessionId);
    console.log("this is the checkout session",checkoutSession)

    // Check the Checkout Session's payment_status property
    // to determine if fulfillment should be peformed
    if (checkoutSession.payment_status !== 'unpaid') {
        // TODO: Perform fulfillment of the line items

        // TODO: Record/save fulfillment status for this
        // Checkout Session
    }
}


export async function POST(request: NextRequest){
    try{

        console.log('go to webhook')

        const body = await request.text();
        const signature = request.headers.get('stripe-signature');

        let event;

        try {
            event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);

        }
        catch (error: any) {
            console.log('Webhook Error:', error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        } 


        if (event.type !== 'checkout.session.completed') {
            return NextResponse.json({ message: 'Invalid event type' }, { status: 400 });
        }

        const session: Stripe.Checkout.Session = event.data.object;
        console.log('Checkout session completed:', session);

        const userEmail = session.customer_email;
        if (!userEmail) {
            return NextResponse.json({ message: 'Missing customer email' }, { status: 400 });
        }

        // Fetch the user
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!user) {
            throw new Error("User not found.");
        }
        const userId = user.id;

        console.log("Session ID:", session.id);

        // Retrieve line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        console.log("Retrieved line items:", lineItems);

        // Fetch the user's cart
        const cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            throw new Error("Cart not found for the user.");
        }
        const cartId = cart.id;

        if (!session.amount_total) {
            throw new Error("Total amount not found.");
        }

        // Create the order
        const order = await prisma.order.create({
            data: {
                userId,
                status: "pending",
                totalAmount: session.amount_total,
            },
        });
        console.log("Order created:", order);

        // Process each line item
        await Promise.all(
            lineItems.data.map(async (lineItem) => {
                const productId = typeof lineItem.price?.product === 'string'
                    ? lineItem.price.product
                    : lineItem.price?.product?.id;

                if (!productId) {
                    console.error("Invalid product ID:", lineItem.price?.product);
                    return;
                }

                const quantity = lineItem.quantity ?? 1;

                console.log("Processing item - Product ID:", productId, "Quantity:", quantity);

                // Delete related cart items
                await prisma.cartItem.deleteMany({
                    where: {
                        cartId,
                        productId,
                    },
                });

                console.log("Deleted cart items for product:", productId);

                // Update stock or delete product if stock reaches 0
                const product = await prisma.product.findUnique({ where: { id: productId } });
                if (!product) {
                    console.error("Product not found:", productId);
                    return;
                }

                const newStock = product.stock - quantity;
                if (newStock <= 0) {
                    // Delete product if stock is depleted
                    await prisma.product.delete({ where: { id: productId } });
                    console.log("Product deleted as stock is depleted:", productId);
                } else {
                    // Update stock
                    await prisma.product.update({
                        where: { id: productId },
                        data: { stock: newStock },
                    });
                    console.log("Stock updated for product:", productId, "New stock:", newStock);
                }
            })
        );

        return NextResponse.json({ message: 'Order processed successfully' });
    } catch (error: any) {
        console.error("Error processing order:", error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
