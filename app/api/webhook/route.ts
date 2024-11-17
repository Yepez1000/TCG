import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/components/stripe/stripe';
import Stripe from 'stripe';

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
        }




        return NextResponse.json({ message: 'success' });
    }
    
    catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


