
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/profile/ui/card"
import { Button } from "@/components/profile/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/profile/ui/table"
import { mutate } from 'swr';
import { Trash2 } from "lucide-react";




export default function Delete({products}: any) {

    const handleDeleteProduct = async (id: string) => {

        const response = await fetch('/api/products/createPrisma', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });


        if (!response.ok) {
            throw new Error();
        }   
        mutate('/api/products');
    }

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
                        {products.map((product : any) => (
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
        
    )
}