"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/profile/card";
import { OrderFulfillmentComponent } from "@/components/profile/order-fulfillment";

export default function FulfillOrdersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Fulfill Orders</CardTitle>
                <CardDescription>Process and manage pending orders</CardDescription>
            </CardHeader>
            <CardContent>
                <OrderFulfillmentComponent />
            </CardContent>
        </Card>
    );
}
