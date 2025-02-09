import { ProductCard } from "@/components/frontpage/product-card"

interface ProductSectionProps {
  title: string
  products: Array<{
    name: string
    expansion: string
    imageUrl: string
    price: string
  }>
}

export function ProductSection({ title, products }: ProductSectionProps) {
  return (
    <section className="py-2">
      <div className="container mx-auto px-20">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}


