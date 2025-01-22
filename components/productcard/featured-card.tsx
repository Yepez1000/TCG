import Link from 'next/link'

export function FeaturedCard({ product}: any) {

  const { id, name, category, price, imageUrl } = product;

  return (

    <Link href={`/products/${id}`}>  
      <div className="group relative flex w-full cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-lg sm:max-w-[400px] h-[250px] p-6">
        
        {/* Image container with fixed aspect ratio */}
        <div className="relative w-[50%] h-[100%] min-w-[150px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
    
        {/* Content container */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight text-foreground">{name}</h3>
            <p className="text-md text-muted-foreground">{category}</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold text-foreground">${price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

