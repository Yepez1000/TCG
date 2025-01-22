'use client'

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";
import  SortFilter from "@/components/filterbar/filter";
import { FeaturedCard } from '@/components/productcard/featured-card'
import { FiltersBar } from "@/components/filterbar/filters-bar"

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



    const { data : products, error, isLoading } = useSWR(
        `/api/products/search?category=${category}&query=${encodedSearchQuery}&sort=${sortOption}`,
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

            <div className="p-6">
                <FiltersBar/>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {products.map((product: any) => (
                    <FeaturedCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

      
        </div>
    )
}
