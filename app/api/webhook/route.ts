import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/components/stripe/stripe';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';


async function fulfillCheckout(sessionId: String) {
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
    const stripe = require('stripe')('sk_test_51QFPThCORXixF1q5M721voqhf68ThtW8CKllmuSaC5biqLIEMILA8lmRdslv3XnoUeThbum9LeYMx3VSNbaeuviK00P95fMRhO');

    console.log('Fulfilling Checkout Session ' + sessionId);

    // TODO: Make this function safe to run multiple times,
    // even concurrently, with the same session ID

    // TODO: Make sure fulfillment hasn't already been
    // peformed for this Checkout Session

    // Retrieve the Checkout Session from the API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
    });

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

        if (event.type === 'checkout.session.completed') {
            const session: Stripe.Checkout.Session = event.data.object;
            console.log('Checkout session completed:', session);
            const user_id = session.metadata?.user_id; 
            
            console.log("this is the session id",session.metadata?.id)

            // await prisma.order.create({
            //     data: {

                    
            //     }
            // })
        }

    




        return NextResponse.json({ message: 'success' });
    }
    
    catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


