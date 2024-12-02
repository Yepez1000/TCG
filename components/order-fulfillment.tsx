'use client'

import { useState } from 'react'
import { Button } from "@/components/fulfillment/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/fulfillment/card"
import { Input } from "@/components/fulfillment/input"
import { Label } from "@/components/fulfillment/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/fulfillment/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/fulfillment/table"
import { Badge } from "@/components/fulfillment/badge"
import { Checkbox } from "@/components/fulfillment/checkbox"
import { Package, Search, Truck, AlertCircle } from 'lucide-react'
import useSWR, { mutate } from 'swr'

type Order = {
  id: string
  createdAt: string
  userId: string
  totalAmount: number
  status: 'pending' | 'processing' | 'ready to ship' | 'shipped'
}

const fetchOrder = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export function OrderFulfillmentComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const { data: orders, isLoading, error } = useSWR<Order[]>('/api/order', fetchOrder)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Failed to load orders</p>

  // Filter orders based on search term and status filter
  if (!orders) {
    return <p>No orders found</p>
  }
  const filteredOrders = orders.filter(order =>
    (statusFilter === 'all' || order.status === statusFilter) &&
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {

    console.log("this is orderId", orderId, "this is newStatus", newStatus)

    await fetch('api/order', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId,
        status: newStatus
      })
    })

    mutate('/api/order')
  }


  const getStatusBadge = (status: Order['status']) => {

    console.log("this is status", status)
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'processing':
        return <Badge variant="default">Processing</Badge>;
      case 'ready to ship':
        return <Badge variant="outline">Ready to Ship</Badge>;
      case 'shipped':
        return <Badge variant="destructive">Shipped</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Fulfillment</CardTitle>
          <CardDescription>Manage and process customer orders efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Orders</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Order ID or Customer Name"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full sm:w-[180px]">
              <Label htmlFor="status">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="ready to ship">Ready to Ship</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Change   Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>${(order.totalAmount/100).toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell> 
                    <TableCell>
                      <Select
                        value={order.status || "Pending"} // Default to "Pending" if order.status is undefined
                        onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="ready to ship">Ready to Ship</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-4">
              <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">No orders found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}