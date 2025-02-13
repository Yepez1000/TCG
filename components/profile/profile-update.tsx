'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/profile/ui/card"
import { Button } from "@/components/profile/ui/button"
import { Input } from "@/components/profile/ui/input"
import { useState } from "react"
import { Label } from "@/components/profile/ui/label"




export default function UpdateUserProfile({session}: any ) {

     const [user, setUser] = useState({
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "/placeholder.svg?height=100&width=100"
    })


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


    return(
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
    )
}
    
   