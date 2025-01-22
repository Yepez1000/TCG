import { FeaturedCard } from "./featured-card"

export default function FeaturedCardsGrid() {
  const items = [
    {
      imageUrl: "/placeholder.svg?height=300&width=200",
      title: "SV07: Stellar Crown",
      subheading: "Limited Edition",
      price: 299.99,
    },
    {
      imageUrl: "/placeholder.svg?height=300&width=200",
      title: "NK02: Nebula Knight",
      subheading: "Collector's Series",
      price: 249.99,
    },
    {
      imageUrl: "/placeholder.svg?height=300&width=200",
      title: "CS05: Cosmic Sentinel",
      subheading: "Special Release",
      price: 199.99,
    },
    {
      imageUrl: "/placeholder.svg?height=300&width=200",
      title: "VS09: Void Stalker",
      subheading: "Premium Edition",
      price: 349.99,
    },
    {
      imageUrl: "/placeholder.svg?height=300&width=200",
      title: "GR03: Galaxy Runner",
      subheading: "Standard Edition",
      price: 179.99,
    },
  ]

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item, index) => (
          <FeaturedCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

