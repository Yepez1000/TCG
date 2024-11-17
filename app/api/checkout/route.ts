import { NextResponse } from 'next/server';
import { stripe } from '@/components/stripe/stripe';

export async function POST(request: Request) {
    try {
        
        const { lineItems, email, userId } = await request.json();

        console.log("this is line items", lineItems)




        const session = await stripe.checkout.sessions.create({
            metadata: {
                user_id: userId,
            },
            customer_email: email,
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/success`,
            cancel_url: `${request.headers.get('origin')}/cart`,
        });
        

        return NextResponse.json({ id: session.id });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}