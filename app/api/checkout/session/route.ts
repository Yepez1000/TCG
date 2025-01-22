import { NextResponse } from 'next/server';
import { stripe } from '@/components/stripe/stripe';

export async function POST(request: Request) {
    try {
        
        const { lineItems, email, userId } = await request.json();

        const session = await stripe.checkout.sessions.create({
            metadata: {
                user_id: userId,
            },
            customer_email: email,
            payment_method_types: ['card'],
            line_items: lineItems,
            shipping_options: [{ shipping_rate: 'shr_1QQHgnCORXixF1q5WuLontgd' }],
            billing_address_collection: "required",
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/cart`,
        });
        

        return NextResponse.json({ id: session.id });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}