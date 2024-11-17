'use client'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/profile/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/profile/card"
import { Button } from "@/components/profile/button"
import { Input } from "@/components/profile/input"
import { Textarea } from "@/components/profile/textarea"
import { Label } from "@/components/profile/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/profile/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/profile/avatar"

export default function Profile() {

    
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

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">User Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
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
                                        {orders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell>{order.id}</TableCell>
                                                <TableCell>{order.date}</TableCell>
                                                <TableCell>${order.total.toFixed(2)}</TableCell>
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
                                        <Input id="name" name="name" defaultValue={user.name} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" defaultValue={user.email} required />
                                    </div>
                                    <Button type="submit">Update Profile</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}