
'use client';

import Image from 'next/image'
import styles from './search.module.css'
import React, { useState } from 'react';
import { redirect} from 'next/navigation'
import { useRouter } from 'next/navigation';


export function Search(){

    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

   

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        
        const encodedSeachTerm = encodeURIComponent(searchTerm);

        router.push(`/search/all/products?q=${encodedSeachTerm}`)

       
        

    }

    return (
        <form className={styles.searchForm} onSubmit={onSearch}>
            <input
                value={searchTerm}
                onChange={(event)=> setSearchTerm(event.target.value)}
                type="text"
                id="search"
                placeholder="Search for your cards"
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
                <Image
                    src="/search.jpeg"
                    width={30}
                    height={30}
                    alt="Search"
                />
            </button>
        </form>

    )
   
}