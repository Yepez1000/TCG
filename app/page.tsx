"use client";
import Image from 'next/image';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useSWR from "swr";
import SortFilter  from "../components/filterbar/filter";
import { useCallback, useState } from 'react';
import { FeaturedCard } from "@/components/productcard/featured-card"
import { ProductSection } from '@/components/frontpage/product-section';
import { HeroBanner } from '@/components/frontpage/hero-banner';
import { PromotionalBanner } from '@/components/frontpage/promotional-banner';
import { LatestSetsCarousel } from '@/components/frontpage/latestcarousel';



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
    <div>  
      <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={10000}>
          {banners.map((banner: any) => (
           <div key={banner.id} className="relative w-full h-[300px]"> 
              <Image
                src={banner.imageUrl}
                alt={banner.title || "Banner image"}
                fill
                className="object-cover rounded-lg" 
              >
              </Image>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

// const ProductList = ({ products } : {products: Product[]}) => {
//   return(
//     <div>
//       <div className="p-6">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
//           {products.map((product: any) => (
//             <FeaturedCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

export default function Home() {

  const [sortOption,setSortOption ] = useState('createdAt-desc');

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
      <HeroBanner/>

      <ProductSection title="Best Sellers" products={Products} />
      <ProductSection title="Featured Pokémon Cards" products={Products} />
      <LatestSetsCarousel/>


    </div>
  )

}