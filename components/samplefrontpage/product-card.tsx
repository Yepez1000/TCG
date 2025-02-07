import Image from "next/image"

interface ProductCardProps {
  name: string
  expansion: string
  imageUrl: string
  price: string
}

export function ProductCard({ name, expansion, imageUrl, price }: ProductCardProps) {
  return (
    <div className="flex gap-2 p-2 hover:bg-accent transition-colors">
      <Image 
        src={imageUrl || "/placeholder.svg"} 
        alt={name} 
        width={80} 
        height={110} 
        className="object-contain"
      />
      <div className="flex flex-col justify-between text-sm">
        <div>
          <h3 className="font-medium text-sm">{name}</h3>
          <p className="text-xs text-muted-foreground">{expansion}</p>
        </div>
        <p className="font-bold text-sm">{price}$ </p>
      </div>
    </div>
  );
}


