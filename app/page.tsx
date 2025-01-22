"use client";
import Image from 'next/image';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useSWR from "swr";
import SortFilter  from "../components/filterbar/filter";
import { useCallback, useState } from 'react';
import { FeaturedCard } from "@/components/productcard/featured-card"


type Banner = {
  id: string;
  imageUrl: string;
  title?: string;
}

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const fetcher = async (url: string) => 
    fetch(url)
      .then((res)=>{
        if(!res.ok) throw new Error('Failed to fetch data');
        return res.json()
      });

const BannerCarousel = ({ banners } : {banners: Banner[]}) => {
  return(
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
  )
}

const ProductList = ({ products } : {products: Product[]}) => {
  return(
    <div>
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

export default function Home() {
  const [sortOption, setSortOption] = useState('best-match');

  const { data:Products, error: ProductError } = useSWR(`/api/products?sort=${sortOption}`, fetcher);
  const { data:Banners, error: BannerError } = useSWR("api/banners", fetcher);

  if (ProductError || BannerError){
    return <p>Failed to load Products</p>
  }
  if(!Products || !Banners) {
    return 
  }

  const handleSortChange = (option: string) => {
    setSortOption(option);
  }
  

  return (
    <div className="pageWrapper">
      <BannerCarousel banners={Banners} />
      <h2 className="text-3xl font-bold mb-6">Featured Cards</h2>
      <div className="filter">
        <SortFilter sortOption={sortOption} onSortChange={handleSortChange} />
      </div>
      <ProductList products={Products} />
    </div>
  )

}