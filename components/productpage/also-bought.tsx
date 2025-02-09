import { Card, CardContent } from "@/components/productpage/card"
import { ScrollArea, ScrollBar } from "@/components/productpage/scroll-area"

const relatedProducts = [
  {
    id: "1",
    title: "Charizard VMAX",
    image: "/placeholder.svg?height=200&width=200",
    price: 89.99,
  },
  {
    id: "2",
    title: "Brilliant Stars Booster Box",
    image: "/placeholder.svg?height=200&width=200",
    price: 129.99,
  },
  {
    id: "3",
    title: "Ultra Pro Sleeves",
    image: "/placeholder.svg?height=200&width=200",
    price: 9.99,
  },
  {
    id: "4",
    title: "Pokemon Center ETB",
    image: "/placeholder.svg?height=200&width=200",
    price: 49.99,
  },
  // Add more products as needed
]

export default function AlsoBought() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Customers Also Bought</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <div className="flex w-max space-x-4 p-4">
          {relatedProducts.map((product) => (
            <Card key={product.id} className="w-[200px]">
              <CardContent className="p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium truncate">{product.title}</h3>
                <p className="text-lg font-bold">${product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

