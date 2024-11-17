import { prisma } from "@/lib/prisma"
import { FeaturedProductCard } from "@/components/featured-product-card";

const fetchPokemon = async () => {
    const products = await prisma.product.findMany({
        where: {
            category: "pokemon"
        }
    })
    return products
}


export default async function Pokemon() {

    const products = await fetchPokemon()
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Pokemon Cards</h2>
            <div className="products">
                {products.map((product:any) => (
                    <FeaturedProductCard key={product.id} product={product} />
                ))};
            </div>
        </div>
    )
}