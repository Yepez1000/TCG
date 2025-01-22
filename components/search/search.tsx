
'use client';

import Image from 'next/image'
import React, { useState } from 'react';
import { redirect} from 'next/navigation'
import { useRouter } from 'next/navigation';
import { Input } from './input'
import MagnifyingGlass from './magnifying-glass';

export function Search(){

    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

   

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        
        const encodedSeachTerm = encodeURIComponent(searchTerm);

        router.push(`/search/all/products?q=${encodedSeachTerm}`)

       
        

    }

    return (
        <div className="container mx-auto px-4">
            <form className="flex w-full max-w-sm items-center space-x-2" onSubmit={onSearch}>
                <Input
                    value={searchTerm}
                    onChange={(event)=> setSearchTerm(event.target.value)}
                    type="text"
                    id="search"
                    placeholder="Search cards ..."
                    className="bg-white text-black border-black"
                />
                <button type="submit">
                     <MagnifyingGlass color="white"/>
                </button>
            </form>
        </div>

    )
   
}


{/* <div className="flex w-full max-w-sm items-center space-x-2">
<Input type="search" placeholder="Search cards..." className="bg-white text-black border-black" />
<Button type="submit" className="bg-black text-white hover:bg-black/90">
  Search
</Button>
</div> */}