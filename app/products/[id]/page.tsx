'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/profile/card"
import { Button } from "@/components/profile/button"
import { Input } from "@/components/profile/input"
import { ShoppingCart, Heart } from "lucide-react"
import Link from 'next/link'
import useSWR from "swr";
import {CheckoutButton} from '@/components/checkout';
import { useContext } from 'react';
import { CartContext } from '../../CartContext';

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
    const { data: product, error, isLoading } = useSWR(`/api/search?q=${encodedSearchQuery}`, fetchCards, { revalidateOnFocus: false });
    const { data: recommended } = useSWR(`/api/recommended`, fetchRecommendedCards, { revalidateOnFocus: false }); 
    const cart = useContext(CartContext);

    if (!product || !recommended) {
        return <p>Loading...</p>
    }
    
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        setQuantity(isNaN(value) ? 1 : Math.max(1, value))
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-8">
                <nav className="text-sm breadcrumbs mb-4">
                    <ul className="flex space-x-2">
                        <li><Link href="/" className="text-blue-600 hover:underline">All Categories</Link></li>
                        <li>&gt;</li>
                        <li><Link href="/Pokemon" className="text-blue-600 hover:underline">Pokémon</Link></li>
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