"use client"

import { useState } from "react"
import { Button } from "@/components/productpage/button"
import { Card, CardContent } from "@/components/productpage/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/productpage/select"
import { Badge } from "@/components/productpage/badge"
import { Star, Share2, Heart, ShoppingCart } from "lucide-react"
import { ChevronRightIcon } from "@radix-ui/react-icons"

type Product = {
  name: string,
  imageUrl: string,
  description: string,
  price: number,
  createdAt: string,
  stock: number,
  priceId: string,
  category: string
  pokemonId: string | null,
  isArchived: boolean,
}

export default function ProductDetail({ product }: { product: Product }) {

  console.log("this is the product",product)

  const [selectedCondition, setSelectedCondition] = useState("nm")
  const [mainImage, setMainImage] = useState(0)

  const images = [
    product.imageUrl,
    "/BlacknWhite/Darkrai.jpg",
    "https://v0.blob.com/tcg-sample-3.jpg",
  ]

  const conditions = [
    { value: "nm", label: "Near Mint", price: 49.99 },
    { value: "lp", label: "Lightly Played", price: 44.99 },
    { value: "mp", label: "Moderately Played", price: 39.99 },
    { value: "hp", label: "Heavily Played", price: 29.99 },
  ]

  const selectedPrice = conditions.find((c) => c.value === selectedCondition)?.price

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="bg-gray-100 border flex items-center justify-center rounded-lg overflow-hidden w-full"
            style={{
                width: '100%',
                maxHeight: '410px',
                aspectRatio: '3/4',
                margin: '0 auto',
            }}
          >
            <img
                src={images[mainImage]}
                alt={product.name}
                className="max-w-[300px] max-h-[400px] object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setMainImage(idx)}
                className="bg-gray-100 aspect-square rounded-md overflow-hidden border flex items-center justify-center "
              >
                <img
                  src={img || "/BlacknWhite/Darkrai.jpg"}
                  alt={`View ${idx + 1}`}
                  className=" max-h-[130px] w-auto h-auto"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">Featured</Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(1,234 ratings)</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">${selectedPrice}</span>
                <span className="text-sm text-muted-foreground">Market Price: $54.99</span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Condition</label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label} - ${condition.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-medium">In Stock</span>
                  <span className="text-muted-foreground">-</span>
                  <span className="text-muted-foreground">23 available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Free delivery</span>
                  <ChevronRightIcon className="w-4 h-4" />
                  <span className="text-muted-foreground">Tuesday, Feb 13</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="secondary" className="w-full" size="lg">
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Product Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Set</span>
                <p>Brilliant Stars</p>
              </div>
              <div>
                <span className="text-muted-foreground">Card Number</span>
                <p>154/172</p>
              </div>
              <div>
                <span className="text-muted-foreground">Rarity</span>
                <p>VSTAR Rare</p>
              </div>
              <div>
                <span className="text-muted-foreground">Release Date</span>
                <p>February 25, 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

