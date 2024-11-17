'use client'

import { useState } from 'react'
import { Button } from "@/components/shopping/button"
import { Input } from "@/components/shopping/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shopping/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shopping/card"
import { Trash2, Plus, Minus } from "lucide-react"
import { CartContext } from '../CartContext'
import { useContext } from 'react'
import { CartCheckoutButton } from '@/components/cartcheckout'

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    image: string
}

export default function ShoppingCart() {

    const cart = useContext(CartContext);

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
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
                        
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-auto object-contain" />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => cart.RemoveOnefromCart(item.id)}
                                            aria-label={`Decrease quantity of ${item.name}`}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            // onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="w-16 text-center"
                                            aria-label={`Quantity of ${item.name}`}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => cart.addOneToCart(item)}
                                            aria-label={`Increase quantity of ${item.name}`}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => cart.deletefromCart(item.id)}
                                        aria-label={`Remove ${item.name} from cart`}
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
                <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>

                <CartCheckoutButton products={cart.items} />
            </CardFooter>
        </Card>
    )
}