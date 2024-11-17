"use client";
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import styles from './products.module.css';
import dynamic from "next/dynamic";
import { Carousel } from "react-responsive-carousel";
import { Products } from "../components/products";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useSWR from "swr";
import SortFilter  from "../components/filter";
import { useState } from 'react';
import { FeaturedProductCard } from '@/components/featured-product-card';





const getProducts = async (url: string) =>{
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const getBanners = async(url:string) =>{
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  
  return res.json();
}


export default function Home() {


  const [sortOption, setSortOption] = useState('best-match');

  const { data:products } = useSWR(`/api/products?sort=${sortOption}`, getProducts);
  const { data:banners } = useSWR("api/banners", getBanners);


  if(!products || !banners) {
    return <p>Loading...</p>
  }


  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  

  return (
    
    <div className="pageWrapper">
      <div className="carousel">  
        <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true}>

            {banners.map((banner: any) => (
            <div key={banner.id}>
                <Image src={banner.imageUrl} 
                  alt={banner.title || 'Banner image'}
                  layout="responsive"
                  width={1500}
                  height={300}
                  objectFit="cover" >
                </Image>
            </div>
          ))}
        </Carousel>
      </div>

      <h2 className="text-3xl font-bold mb-6">Featured Cards</h2>
      <div className="filter">
        <SortFilter sortOption={sortOption} onSortChange={handleSortChange} />
      </div>

      

    
     
      <div className="products">
        
        {products.map((products: any) => (
          <FeaturedProductCard key={products.id} product={products} />
        ))}


      </div>
    </div>


  )

}