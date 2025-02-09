"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/profile/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/profile/table";
import useSWR from 'swr';

const getOrders = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
};

export default function OrdersPage() {
    const { data: user_orders, error } = useSWR('/api/order', getOrders);

    if (!user_orders) return <p>Loading...</p>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>View and manage your order history</CardDescription>
            </CardHeader>
            <CardContent>
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
                        {user_orders.map((order: any) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.createdAt}</TableCell>
                                <TableCell>${(order.totalAmount / 100).toFixed(2)}</TableCell>
                                <TableCell>{order.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
