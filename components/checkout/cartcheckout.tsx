'use client';

import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { Button } from "@/components/profile/button"
import { useSession } from 'next-auth/react';


export function CartCheckoutButton(products: any) {

    const { data: status } = useSession();

    const handleCheckout = async () => {


        if (!status) {
            toast.error("Please log in to create a new Stripe Checkout session");
            return;
        }
        const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        const stripe = await stripePromise;



        let lineItems: Array<{ price: string; quantity: number }> = [];

        const productArray = products.products


        if (!Array.isArray(productArray)) {
            console.error('products is not an array:', products);
            return;
        }


        productArray.forEach((product: any) => {

            lineItems.push({
                price: product.product.priceId,
                quantity: product.quantity
            })
        })

        const response = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lineItems, userId: status.user?.name, email: status.user?.email }),
        });
        const session = await response.json();
        await stripe?.redirectToCheckout({ sessionId: session.id });
    }

    return (

        <Button  onClick={(e) => { e.preventDefault(); handleCheckout() }}>Proceed to Checkout</Button>

    );
}