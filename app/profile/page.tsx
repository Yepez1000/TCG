'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/profile/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/profile/ui/avatar"
import { useSession } from 'next-auth/react'
import useSWR from 'swr';

import { OrderFulfillmentComponent } from '@/components/profile/order-fulfillment'
import ImportPage from '@/components/profile/import'
import UpdateUserProfile from '@/components/profile/profile-update'
import SupportTicket from '@/components/profile/support-ticket'
import Delete from '@/components/profile/delete'
import UserOrder from '@/components/profile/user-orders'


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
   
    const { data: session } = useSession()

    const email = session?.user?.email

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
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">User Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
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
                        <UserOrder orders = {user_orders}/>
                    </TabsContent>

                    <TabsContent value="support">
                         {/* TODO: Make this work */}
                        <SupportTicket/>
                    </TabsContent>

                    <TabsContent value="profile">
                        {/* TODO: Make this work */}
                        <UpdateUserProfile session={session}/>
                    </TabsContent>
                    
                    {data?.isSuperUser && (
                    <TabsContent value="product">
                        <ImportPage/>
                    </TabsContent>
                   
                    )}

                    {data?.isSuperUser && (
                        <TabsContent value="delete">
                            <Delete products={all_products}/>
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