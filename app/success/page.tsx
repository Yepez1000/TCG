'use client'

import { Button } from "@/components/success/button"
import { Card, CardContent } from "@/components/success/card"
import { Separator } from "@/components/success/separator"
import { CheckCircle2, ShoppingBag, Mail, ArrowRight, Clock, Package } from 'lucide-react'
import Link from "next/link"

export default function PurchaseSuccess() {
    const orderDetails = {
        orderNumber: "ORD-2023-1234",
        date: new Date().toLocaleDateString(),
        email: "customer@example.com",
        total: 299.97,
        estimatedDelivery: "December 1-3, 2023"
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="container max-w-3xl mx-auto px-4 py-12">
                <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Thank You For Your Purchase!</h1>
                    <p className="text-gray-600">
                        We&apos;ve received your order and will notify you when it ships.
                    </p>
                </div>

                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="grid gap-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">Order Number</p>
                                    <p className="text-gray-600">{orderDetails.orderNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">Order Date</p>
                                    <p className="text-gray-600">{orderDetails.date}</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <p className="font-semibold mb-2">Order Confirmation</p>
                                <div className="flex items-center text-gray-600">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <p>Sent to {orderDetails.email}</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <p className="font-semibold mb-2">Estimated Delivery</p>
                                <div className="flex items-center text-gray-600">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <p>{orderDetails.estimatedDelivery}</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <p className="font-semibold mb-2">Order Total</p>
                                <p className="text-2xl font-bold">${orderDetails.total.toFixed(2)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-start">
                            <Package className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                            <div>
                                <h2 className="font-semibold text-blue-900">What happens next?</h2>
                                <p className="text-blue-800 text-sm mt-1">
                                    You&apos;ll receive an email confirmation with your order details and tracking
                                    information once your order ships.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Link href="/profile" className="block">
                            <Button variant="outline" className="w-full">
                                View Order
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/" className="block">
                            <Button className="w-full">
                                Continue Shopping
                                <ShoppingBag className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}