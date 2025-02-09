"use client";

import Link from "next/link";
import { Button } from "@/components/profile/button";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
    const { data: session } = useSession();

    if (!session) {
        return <p>Not logged in to see this</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/profile/orders">
                    <Button className="w-full">Orders</Button>
                </Link>
                <Link href="/profile/support">
                    <Button className="w-full">Support</Button>
                </Link>
                <Link href="/profile/profile">
                    <Button className="w-full">Profile</Button>
                </Link>
                <Link href="/profile/product">
                    <Button className="w-full">Add Product</Button>
                </Link>
                <Link href="/profile/delete">
                    <Button className="w-full">Delete Product</Button>
                </Link>
                <Link href="/profile/fulfill">
                    <Button className="w-full">Fulfill Orders</Button>
                </Link>
            </div>
        </div>
    );
}
