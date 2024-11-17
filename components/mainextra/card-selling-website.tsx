'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/mainextra/card"
import { Button } from "@/components/mainextra/button"
import { ShoppingCart } from "lucide-react"

export function CardSellingWebsite() {
  const cards = [
    { id: 1, name: "Mystical Elf", type: "Monster", price: 10.99, image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Dark Magician", type: "Monster", price: 15.99, image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Blue-Eyes White Dragon", type: "Monster", price: 25.99, image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Monster Reborn", type: "Spell", price: 8.99, image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Mirror Force", type: "Trap", price: 12.99, image: "/placeholder.svg?height=100&width=100" },
    { id: 6, name: "Pot of Greed", type: "Spell", price: 9.99, image: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Card Emporium</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Shop</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Featured Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{card.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <img src={card.image} alt={card.name} className="w-full h-40 object-contain mb-4" />
                <p className="text-muted-foreground">{card.type}</p>
                <p className="font-bold mt-2">${card.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-muted mt-8">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2023 Card Emporium. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}