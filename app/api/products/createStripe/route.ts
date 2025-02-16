import { NextResponse } from 'next/server';
import { stripe } from '@/components/stripe/stripe';

export async function POST(request: Request) {

    
    try {
        const { card } = await request.json();

        console.log('Stripe card',card )

        const images = Array.isArray(card.link)
            ? card.link // If already an array, use it
            : card.link
                ? [card.link] // If it's a string, wrap it in an array
                : []; // If undefined or null, use an empty array


        const product = await stripe.products.create({
            name: card.cardName,
            description: card.expansion,
            active: true,
            metadata: {
                name: card.cardName,
            },
            default_price_data: {
                currency: 'usd',
                unit_amount_decimal: card.price,
            },
            images,

        });

        return NextResponse.json({ product });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
