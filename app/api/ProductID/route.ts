
import { stripe } from '@/components/stripe/stripe';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
    const { productId } = await req.json();
    const prices = await stripe.prices.list({
        product: productId, // Replace with your actual product ID
        active: true,
    });

    return NextResponse.json({ prices });
}

