interface FeaturedCardProps {
  imageUrl: string
  title: string
  subheading: string
  price: number
}

export function FeaturedCard({ imageUrl, title, subheading, price }: FeaturedCardProps) {
  return (
    <div className="group relative flex w-full cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md sm:max-w-[280px]">
      {/* Image container with fixed aspect ratio */}
      <div className="relative w-1/3 min-w-[100px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content container */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-1">
          <h3 className="font-semibold leading-tight text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subheading}</p>
        </div>
        <div className="mt-2">
          <p className="text-lg font-medium text-foreground">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

