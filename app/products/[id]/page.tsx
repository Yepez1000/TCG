'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/profile/ui/card"
import { Button } from "@/components/profile/ui/button"
import { Input } from "@/components/profile/ui/input"
import { ShoppingCart, Heart } from "lucide-react"
import Link from 'next/link'
import useSWR from "swr";
import {CheckoutButton} from '@/components/checkout/checkout';
import { useContext } from 'react';
import { CartContext } from '@/components/context/CartContext';
import ProductDetail from "@/components/productpage/product-detail"
import ProductListings from "@/components/productpage/product-listings"
import AlsoBought from "@/components/productpage/also-bought"

interface Props {
    params: {
        id: string;
    };
}

const fetchCards = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
};

const fetchRecommendedCards = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
}

export default function CardDetailPage({ params: { id } }: Props) {
    const [quantity, setQuantity] = useState(1)

    const searchQuery = id;
    const encodedSearchQuery = encodeURIComponent(searchQuery || "");
    const { data: product, error, isLoading } = useSWR(`/api/products/single?q=${encodedSearchQuery}`, fetchCards, { revalidateOnFocus: false });
    const { data: recommended } = useSWR(`/api/products/recommended`, fetchRecommendedCards, { revalidateOnFocus: false }); 
    const cart = useContext(CartContext);

    if (!product || !recommended) {
        return <p>Loading...</p>
    }
    
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        setQuantity(isNaN(value) ? 1 : Math.max(1, value))
    }

   
    return (
        <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
            <ProductDetail product={product}/>
            <div className="space-y-4">
            <h2 className="text-2xl font-bold">Product Description</h2>
            <p className="text-muted-foreground">
                The Pokemon TCG: Prismatic Evolution Elite Trainer Box includes everything you need to start your
                collection: 8 Prismatic Evolution booster packs, 65 card sleeves featuring a stunning Charizard design, 45
                Energy cards, 6 damage-counter dice, 1 competition-legal coin-flip die, 2 acrylic condition markers, a
                collector's box to store it all, and a player's guide to the Prismatic Evolution expansion.
            </p>
            </div>
            <ProductListings />
            <AlsoBought />
           
        </div>
        </main>
    )
    
      

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-8">
                <nav className="text-sm breadcrumbs mb-4">
                    <ul className="flex space-x-2">
                        <li><Link href="/" className="text-blue-600 hover:underline">All Categories</Link></li>
                        <li>&gt;</li>
                        <li><Link href="/search/pokemon" className="text-blue-600 hover:underline">Pokémon</Link></li>
                        <li>&gt;</li>
                        <li>{product.name}</li>
                    </ul>
                </nav>

                <div className="grid md:grid-cols-2 gap-8">
                    <div
                        className="flex items-center justify-center bg-gray-300 rounded-lg overflow-hidden"
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            aspectRatio: '3/4',
                            margin: '0 auto',
                        }}
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
                        <p className="mb-4">{product.description}</p>
                        <div className="flex items-center space-x-4 mb-4">
                            <label htmlFor="quantity" className="font-medium">Quantity:</label>
                            <Input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                className="w-20"
                            />
                        </div>
                        <div className="flex space-x-4 mb-6">

                            <Button
                                className="flex-1"
                                onClick={(e) => { e.preventDefault(); cart.addOneToCart(product) }}
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                            </Button>
                           
                            <CheckoutButton className={"flex-1"} product={product}/>
                          
                        </div>
                      
                    </div>
                </div>

                <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Customers Also Purchased</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommended.map((card: any) => (
                            <Card key={card.id} className="flex flex-col">
                                <Link href={`/products/${card.id}`}>
                                    <CardHeader>
                                        <CardTitle>{card.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <img src={card.imageUrl} alt={card.name} className="w-full h-40 object-contain mb-4" />

                                        <p className="font-bold mt-2">${card.price.toFixed(2)}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">
                                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                        </Button>
                                    </CardFooter>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-muted mt-8">
                <div className="container mx-auto px-4 py-6 text-center">
                    <p>&copy; 2024 TCGCardmaster. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}