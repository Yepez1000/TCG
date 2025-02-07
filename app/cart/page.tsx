'use client'

import { useState } from 'react'
import { Button } from "@/components/shopping/button"
import { Input } from "@/components/shopping/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shopping/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shopping/card"
import { Trash2, Plus, Minus } from "lucide-react"
import { CartContext } from '@/components/context/CartContext'
import { useContext } from 'react'
import { CartCheckoutButton } from '@/components/checkout/cartcheckout'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    image: string
}
const fetchCartItems = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}
export default function ShoppingCart() {

    const { data: session } = useSession()

    const cart = useContext(CartContext);

    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)


    console.log("this is cart items",cart.items)


    const { data, isLoading, error } = useSWR("/api/cartItems", fetchCartItems);

    // console.log("this is swr data",data.items)

   

    

    return (
        <div className="flex flex-col pb-80">
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Your Shopping Cart</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Image</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="w-[70px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                            
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-auto object-contain" />
                                    </TableCell>
                                    <TableCell>{item.product.name}</TableCell>
                                    <TableCell>${item.product.price}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => cart.removeOneFromCart(item.id)}
                                                aria-label={`Decrease quantity of ${item.product.name}`}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <Input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                // onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                className="w-16 text-center"
                                                aria-label={`Quantity of ${item.product.name}`}
                                            />
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => cart.addOneToCart(item.product)}
                                                aria-label={`Increase quantity of ${item.product.name}`}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => cart.deleteFromCart(item.id)}
                                            aria-label={`Remove ${item.product.name} from cart`}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="text-2xl font-bold">Total: ${total}</div>

                    <CartCheckoutButton products={cart.items} />
                </CardFooter>
            </Card>
        </div>
    )
}