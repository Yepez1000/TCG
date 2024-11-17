import { prisma } from "@/lib/prisma"
import { FeaturedProductCard } from "@/components/featured-product-card";

const fetchPokemon = async () => {
    const products = await prisma.product.findMany({
        where: {
            createdAt: {
                gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        }
    })
    return products
}


export default async function Pokemon() {

    const products = await fetchPokemon()
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">New Releases</h2>
            <div className="products">
                {products.map((product: any) => (
                    <FeaturedProductCard key={product.id} product={product} />
                ))};
            </div>
        </div>
    )
}