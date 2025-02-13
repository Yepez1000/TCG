'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/profile/ui/card"
import { Button } from "@/components/profile/ui/button"
import { Input } from "@/components/profile/ui/input"
import { Textarea } from "@/components/profile/ui/textarea"
import { Label } from "@/components/profile/ui/label"



export default function SupportTicket() {



    const handleSupportTicket = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const subject = formData.get('subject') as string
        const message = formData.get('message') as string
        alert(`Support ticket submitted!\nSubject: ${subject}\nMessage: ${message}`)
    }


    return (
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
    )
}