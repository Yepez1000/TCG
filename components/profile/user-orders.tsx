


'use client'


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/profile/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/profile/ui/table"
import { AlertCircle } from "lucide-react"


export default function UserOrder({orders}: any) {


    return(
        <Card>
            <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>View and manage your order history</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order : any) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.createdAt}</TableCell>
                                    <TableCell>${(order.totalAmount / 100).toFixed(2)}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {orders.length === 0 && (
                    <div className="text-center py-4">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No orders found</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
    
}