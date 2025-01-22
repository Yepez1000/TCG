'use client';

import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { Button } from "@/components/profile/button"
import { useSession } from 'next-auth/react';


export function CheckoutButton({ product, className = '', ...props }: { product: any; className?: string }) {

    const { data: status } = useSession();


    const handleCheckout = async () => {
       

        if (!status) {
            toast.error("Please log in to create a new Stripe Checkout session");
            return;
        }
        const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        const stripe = await stripePromise;

        let lineItems = [
            {
                price: product.priceId,
                quantity: 1,
            },
        ];

        const response = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lineItems , userId: status.user?.name, email: status.user?.email }),
        });
        const session = await response.json();
        await stripe?.redirectToCheckout({ sessionId: session.id });
    }

    return (
       
        <Button variant="secondary" className={className} onClick={(e) => { e.preventDefault(); handleCheckout() }}>Buy Now</Button>
   
    );
}