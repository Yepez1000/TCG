'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/profile/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/profile/card"
import { Button } from "@/components/profile/button"
import { Input } from "@/components/profile/input"
import { Textarea } from "@/components/profile/textarea"
import { Label } from "@/components/profile/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/profile/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/profile/avatar"
import { useSession } from 'next-auth/react'
import { Upload, DollarSign, Package, Tag, Trash2 } from 'lucide-react'
import { OrderFulfillmentComponent } from '@/components/profile/order-fulfillment'
import useSWR, { mutate } from 'swr';

const fetcher = async (url: string, email: string) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    })
    if (!response.ok) { throw new Error("Failed to fetch data") }
    return response.json()
}

const getOrders = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const getProducts = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok){
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
    


export default function BlockPage() {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/placeholder.svg?height=100&width=100"
    })

    const [orders, setOrders] = useState([
        { id: 1, date: "2023-05-01", total: 99.99, status: "Delivered" },
        { id: 2, date: "2023-06-15", total: 149.99, status: "Shipped" },
        { id: 3, date: "2023-07-20", total: 79.99, status: "Processing" },
    ])

   
    const { data: session } = useSession()


    interface Product {
        id: string;
        name: string;
        description: string;
        image: File | null;
        price: string;
        stock: string;
        category: string;
        link: string;
        priceId: string;
    }

    const [product, setProduct] = useState<Product>({
        id: '',
        name: '',
        description: '',
        image: null,
        price: '',
        stock: '',
        category: '',
        link: '',
        priceId: '',
    });
    const [previewImage, setPreviewImage] = useState('')

    const { data: status } = useSession()
    const email = status?.user?.email

    const { data, error, isLoading } = useSWR(
        email ? ["/api/auth/verify", email] : null,
        ([url, email]) => fetcher(url, email)
    )

    const { data: user_orders } = useSWR(
        '/api/order', getOrders
    )

    const { data: all_products } = useSWR(
        '/api/products', 
        getProducts,
        {
            revalidateOnMount: true, // Forces revalidation every runtime
        }
    )
 

    if(!data || !user_orders || !all_products)
        {return <p>Loading...</p>}

    if (!session) {
        return <p>Not logged in to see this</p>
    }


    const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const updatedUser = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            avatar: user.avatar
        }
        setUser(updatedUser)
        alert("Profile updated successfully!")
    }

    const handleSupportTicket = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const subject = formData.get('subject') as string
        const message = formData.get('message') as string
        alert(`Support ticket submitted!\nSubject: ${subject}\nMessage: ${message}`)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProduct(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            setProduct(prev => ({ ...prev, image: file }))
            setPreviewImage(URL.createObjectURL(file))
        }

    }
    const UploadImgur = async (file: File) => {
        if (!file) {
            console.error("No file provided");
            return null;
        }


        const toBase64 = (file: File) =>
            new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });

        let base64Img = await toBase64(file)



        if (typeof base64Img == 'string') {
            base64Img = base64Img.replace(/^data:.+base64,/, '')
        }




        const result = await fetch('/api/imgur', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Img }),
        })
        const response = await result.json()

        return response
    }
    const updateLink = (newLink: string) => {
        setProduct((prev) => ({ ...prev, link: newLink }));
    };



    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Step 1: Upload image and get the link
            if (!product.image) {
                console.error('No image selected');
                return;
            }

            const link = await UploadImgur(product.image);
            const updatedProduct = { ...product, link, price: parseFloat(product.price) * 100 }; // Updated with link

            // Step 2: Make the API call with updated product
            const response = await fetch('/api/products/createStripe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ card: updatedProduct }),
            });

            const session = await response.json();

            console.log("this is the session", session)
            console.log("this is the updated product price", session.product?.default_price)


            // Step 3: Add the priceId to the updatedProduct
            const updatedProductWithPriceId = { ...updatedProduct, priceId: session.product?.default_price, id: session.product?.id };

            console.log("this is the updated product with price", updatedProductWithPriceId)

            // Optionally: Update state with the fully updated product
            console.log("this is the updated product", updatedProductWithPriceId)

            const response2 = await fetch('/api/products/createPrisma', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: updatedProductWithPriceId.id, name: product.name, description: product.description, image: product.link, price: product.price, stock: product.stock, category: product.category, link: updatedProductWithPriceId.link, priceId: updatedProductWithPriceId.priceId }),
            });

            if(!response2.ok) {
                throw new Error();
            }

            const session2 = await response2.json();
            console.log(session2)

            // Step 5: Reset form state
            setProduct({
                id:  '',
                name: '',
                description: '',
                image: null,
                price: '',
                stock: '',
                category: '',
                link: '',
                priceId: '',
            });
            setPreviewImage('');
            mutate('/api/products');
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };

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
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">User Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{session?.user?.name}</p>
                            <p className="text-sm text-gray-500">{session?.user?.email}</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Tabs defaultValue="orders" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="support">Support</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        {data?.isSuperUser && (<TabsTrigger value="product">Add Product</TabsTrigger>)}
                        {data?.isSuperUser && (<TabsTrigger value="delete">Delete Product</TabsTrigger>)}
                        {data?.isSuperUser && (<TabsTrigger value="fulfill">Fulfill Orders</TabsTrigger>)}
                    </TabsList>

                    <TabsContent value="orders">
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
                                        {user_orders.map((order : any) => (
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
                    </TabsContent>

                    <TabsContent value="support">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Support</CardTitle>
                                <CardDescription>Submit a support ticket</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSupportTicket} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" name="subject" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" name="message" required />
                                    </div>
                                    <Button type="submit">Submit Ticket</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Profile</CardTitle>
                                <CardDescription>Update your account information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleProfileUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="name" defaultValue={session.user?.name || ''} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" defaultValue={session.user?.email|| ''} required />
                                    </div>
                                    <Button type="submit">Update Profile</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    {data?.isSuperUser && (
                    <TabsContent value="product">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Product</CardTitle>
                                <CardDescription>Enter product details to add a new item</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <form onSubmit={handleProductSubmit} className="flex-1 space-y-6">
                                        <div>
                                            <Label htmlFor="name" className="text-lg">Product Name</Label>
                                            <Input id="name" name="name" value={product.name} onChange={handleInputChange} required className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="description" className="text-lg">Description</Label>
                                            <Textarea id="description" name="description" value={product.description} onChange={handleInputChange} required className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="image" className="text-lg">Product Image</Label>
                                            <div className="mt-1 flex items-center space-x-2">
                                                <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} required className="hidden" />
                                                <Button type="button" onClick={() => document.getElementById('image')?.click()} variant="outline">
                                                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                                                </Button>
                                                {product.image && <span className="text-sm text-gray-500">{product.image?.name}</span>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="price" className="text-lg">Price</Label>
                                                <div className="mt-1 relative">
                                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <Input id="price" name="price" type="number" min="0" step="0.01" value={product.price} onChange={handleInputChange} required className="pl-10" />
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="stock" className="text-lg">Stock</Label>
                                                <div className="mt-1 relative">
                                                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <Input id="stock" name="stock" type="number" min="0" value={product.stock} onChange={handleInputChange} required className="pl-10" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="category" className="text-lg">Category</Label>
                                            <div className="mt-1 relative">
                                                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <Input id="category" name="category" value={product.category} onChange={handleInputChange} required className="pl-10" />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full">Add Product</Button>
                                    </form>

                                    <Card className="flex-1">
                                        <CardContent className="p-6">
                                            <h2 className="text-2xl font-semibold mb-4">Product Preview</h2>
                                            <div className="space-y-4">
                                                {previewImage ? (
                                                    <img src={previewImage} alt="Product preview" className="w-full h-64 object-cover rounded-lg" />
                                                ) : (
                                                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-gray-400">No image uploaded</span>
                                                    </div>
                                                )}
                                                <h3 className="text-xl font-semibold">{product.name || 'Product Name'}</h3>
                                                <p className="text-gray-600">{product.description || 'Product description will appear here'}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-2xl font-bold">${product.price || '0.00'}</span>
                                                    <span className="text-gray-500">Stock: {product.stock || '0'}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                   
                    )}


                    {data?.isSuperUser && (
                        <TabsContent value="delete">
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
                                            {all_products.map((product : any) => (
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
                        </TabsContent>
                    )}

                    {data?.isSuperUser && (
                        <TabsContent value="fulfill">
                          <OrderFulfillmentComponent />
                        </TabsContent>
                    )} 
                </Tabs>
            </main>
        </div>
    )
}