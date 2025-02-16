"use client"

import * as React from "react"
import { Upload } from "lucide-react"
import Image from "next/image"
import useSWR from 'swr'

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { SearchResults } from "./search-results"
import { Separator } from "../ui/separator"


const categories = [
  { id: 1, name: "Pokemon" },
  { id: 2, name: "One Piece" },
  { id: 3, name: "Dragon Ball" },
  { id: 4, name: "Yu-Gi-Oh!" },
  { id: 5, name: "Magic: The Gathering" },
]
 
interface Product {
  id: string;
  cardName: string;
  expansion: string;
  image: File | null;
  price: string;
  stock: string;
  category: string;
  priceId: string;
  shipping: string;
  condition: string;
  pokemonId: string;
}

interface card {
  id: string;
  name: string;
  number: number;
  expansionName: string;
  gameName: string;
  rarity: string;
  imageUrl: string;
  url: string;
  variants: string;
}





const fetcher = async (url: string) => {

  const response = await fetch(url);
  if(!response.ok){throw new Error("Failed to fetch data")};
  return response.json();
}



export function CreateListing() {
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [selectedCard, setSelectedCard] = React.useState<any>(null)
  const [formData, setFormData] = React.useState<Product>({
    id: "",
    category: "",
    cardName: "",
    expansion: "",
    stock: "",
    price: "",
    shipping: "",
    condition: "",
    priceId: "",
    image: null,
    pokemonId: "",
  })

  const { data:card, error, isLoading } = useSWR(
    formData.cardName.length >= 2 ? `/api/products/matchpokemon?name=${formData.cardName}&expansion=${formData.expansion}&category=${formData.category}` : null,
    fetcher
  );

  const cardData = card ?? []


  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
 
    if (file) {
        setFormData(prev => ({ ...prev, image: file }))
        setImagePreview(URL.createObjectURL(file))
    }

}


  const handleCardSelect = (card: card) => {
    setSelectedCard(card)
    setFormData({
      ...formData,
      cardName: card.name,
      expansion: card.expansionName,
      pokemonId: card.id
    })
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


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        // Step 1: Upload image and get the link
        if (!formData.image) {
            console.error('No image selected');
            return;
        }
    
        const link = await UploadImgur(formData.image);
        const updatedProduct = { ...formData, link, price: parseFloat(formData.price)*100 }; // Updated with link

        // Step 2: Make the API call with updated product
        const response = await fetch('/api/products/createStripe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ card: updatedProduct }),
        });

        const session = await response.json();

        console.log('this is what stripe returns', session)

      
        // Step 3: Add the priceId to the updatedProduct
        const updatedProductWithPriceId = { ...updatedProduct, priceId: session.product.default_price, id: session.product.id };

        console.log("this is the updated product with price", updatedProductWithPriceId)

        const response2 = await fetch('/api/products/createPrisma', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: updatedProductWithPriceId }),
        });

        if(!response2.ok) {
            throw new Error();
        }

        const session2 = await response2.json();
        console.log(session2)



        // Step 5: Reset form state
        setFormData({
          id: "",
          category: "",
          cardName: "",
          expansion: "",
          stock: "",
          price: "",
          shipping: "",
          condition: "",
          priceId: "",
          image: null,
          pokemonId: "",
        });
        setImagePreview('');
    } catch (error) {
        console.error("Error during submission:", error);
    }
};

 

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4">
        <div className="py-8">
          <h2 className="text-2xl font-bold">Create New Listing</h2>
          <p className="text-muted-foreground">Fill in the card details to see matching card.</p>
        </div>
        <div className="grid gap-8">
          {/* Top Section */}
          <div className="grid gap-8 lg:grid-cols-[500px,1fr]">
            {/* Search Details */}
            <div className="rounded-lg border bg-card">
              <div className="p-4 font-medium">Search Details</div>
              <Separator />
              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Card Name *</Label>
                  <Input
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expansion">Expansion/Set Name *</Label>
                  <Input
                    id="expansion"
                    value={formData.expansion}
                    onChange={(e) => setFormData({ ...formData, expansion: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Similar Listings */}
            <div className="rounded-lg border bg-card">
              <div className="p-4 font-medium">Matching Card</div>
              <Separator />
              <div className="p-4">
                <SearchResults results={cardData} onSelect={handleCardSelect} />
              </div>
            </div>
          </div>

          {/* Listing Details Section */}
          {selectedCard && (
            <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="rounded-lg border bg-card">
                  <div className="p-4 font-medium">Card Details</div>
                  <Separator />
                  <div className="space-y-4 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* <div className="space-y-2">
                        <Label htmlFor="shipping">Shipping *</Label>
                        <Input
                          id="shipping"
                          type="number"
                          min="1"
                          value={formData.shipping}
                          onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
                          required
                        />
                      </div> */}

                      <div className="space-y-2">
                        <Label htmlFor="stock">Available Stock *</Label>
                        <Input
                          id="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition *</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => setFormData({ ...formData, condition: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mint">Mint</SelectItem>
                          <SelectItem value="near-mint">Near Mint</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="light-played">Light Played</SelectItem>
                          <SelectItem value="played">Played</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="rounded-lg border bg-card">
                  <div className="p-4 font-medium">Card Image</div>
                  <Separator />
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor="image-upload"
                          className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 hover:border-muted-foreground/50"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Upload image</span>
                          <Input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required={!imagePreview}
                          />
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Supported formats: JPEG, PNG, WebP. Max size: 5MB
                        </p>
                      </div>
                      {imagePreview && (
                        <div className="relative aspect-[3/4] overflow-hidden rounded-lg border">
                          <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Create Listing
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

