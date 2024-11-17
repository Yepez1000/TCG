"use client";

import { prisma } from "@/lib/prisma";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Products }from "../../components/products";
import  SortFilter from "../../components/filter";
import { useState } from "react";
import { FeaturedProductCard } from '@/components/featured-product-card';


const fetchCards = async (url: string) => {
    const res = await fetch(url);

    
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }


    return res.json();
    
}


const SearchPage = () => {
    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
    const router = useRouter();
    const encodedSearchQuery = encodeURIComponent(searchQuery || "");
    const [sortOption, setSortOption] = useState('best-match');


    const { data, isLoading } = useSWR(
        `/api/search?q=${encodedSearchQuery}&sort=${sortOption}`,
        fetchCards,
        { revalidateOnFocus: false }
    );

    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

 


    if (!encodedSearchQuery) {
        router.push("/");
    }

    if(data === undefined || isLoading) {
        return <p>Loading...</p>
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

export default SearchPage;


