"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/profile/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/profile/table";
import { Button } from "@/components/profile/button";
import { Trash2 } from "lucide-react";

const getProducts = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export default function DeleteProductsPage() {
    const { data: all_products, error } = useSWR("/api/products", getProducts);

    const handleDeleteProduct = async (id: string) => {
        try {
            const response = await fetch("/api/products/createPrisma", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) throw new Error();

            mutate("/api/products");
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    if (!all_products) return <p>Loading...</p>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delete Products</CardTitle>
                <CardDescription>Remove products from the inventory</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {all_products.map((product: any) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
