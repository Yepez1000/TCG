'use client'
import { prisma } from "@/lib/prisma"
import { FeaturedProductCard } from "@/components/featured-product-card";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";
import  SortFilter from "@/components/filter";

// const fetchPokemon = async () => {
//     const products = await prisma.product.findMany({
//         where: {
//             createdAt: {
//                 gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//             }
//         }
//     })
//     return products
// }


const fetcher = async (url:string) => 
    fetch(url)
        .then((res)=>{
            if (!res.ok) throw new Error("Failed to fetch Product");
            return res.json();
        });



export default function SearchQuery({ params : {query} }: {params: {query:string}}) 
{
    const SearchParams = useSearchParams();
    const SearchQuery = SearchParams ? SearchParams.get("q") : null;
    const encodedSearchQuery = encodeURIComponent(SearchQuery || "");
    const category = query[0];
    const [sortOption, setSortOption] = useState('best-match');



    const { data, error, isLoading } = useSWR(
        `/api/search?category=${category}&query=${encodedSearchQuery}&sort=${sortOption}`,
        fetcher,
        { revalidateOnFocus: false }
    );

    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    if(error){
        return(
            <p>Failed to load products</p>
        )
    }
    if(isLoading){
        return
    }

    return (
        <div >

            <div className="filter">
                <SortFilter sortOption={sortOption} onSortChange={handleSortChange} />
            </div>

            <div className="products">  
                {data.map((products: any) => (
                    <FeaturedProductCard key={products.id} product={products} />
                ))}
            </div>

      
        </div>
    )
}
