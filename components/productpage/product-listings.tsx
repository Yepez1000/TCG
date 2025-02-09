import { Button } from "@/components/productpage/button"
import { Card } from "@/components/productpage/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/productpage/select"

interface Listing {
  id: string
  seller: string
  rating: number
  sales: number
  condition: string
  price: number
  shipping: number
  image: string
  quantity: number
  title: string
}

const listings: Listing[] = [
  {
    id: "1",
    seller: "TheCrazyCardClub",
    rating: 100,
    sales: 64,
    condition: "Unopened",
    price: 8.99,
    shipping: 2.0,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 3,
    title: "ETB Sleeves, Dice, Coins, Energy ONLY [NO PACKS, NO BOX]",
  },
  // Add more listings as needed
]

export default function ProductListings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">265 Listings</h2>
          <p className="text-sm text-muted-foreground">As low as $8.99</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort By</span>
            <Select defaultValue="price">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price + Shipping</SelectItem>
                <SelectItem value="seller">Seller Rating</SelectItem>
                <SelectItem value="condition">Condition</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Listings / Page</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow grid grid-cols-[1fr,auto] gap-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium">{listing.seller}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{listing.rating}%</span>
                      <span>({listing.sales} Sales)</span>
                    </div>
                  </div>
                  <p className="text-sm">{listing.title}</p>
                </div>
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-lg font-bold">${listing.price}</div>
                    <div className="text-sm text-muted-foreground">+ ${listing.shipping.toFixed(2)} Shipping</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="1">
                      <SelectTrigger className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(listing.quantity)].map((_, i) => (
                          <SelectItem key={i} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">of {listing.quantity}</span>
                    <Button>Add to Cart</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

