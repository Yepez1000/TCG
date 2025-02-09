"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/profile/card";
import { Button } from "@/components/profile/button";
import { Input } from "@/components/profile/input";
import { Label } from "@/components/profile/label";

export default function ProfilePage() {
    const { data: session } = useSession();

    const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Profile updated successfully!");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={session?.user?.name || ''} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={session?.user?.email || ''} required />
                    </div>
                    <Button type="submit">Update Profile</Button>
                </form>
            </CardContent>
        </Card>
    );
}
