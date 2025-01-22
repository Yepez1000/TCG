'use client';

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/featured/card"
import { Button } from "@/components/featured/button"
import { ShoppingCart } from "lucide-react"
import Link from 'next/link'
import { CartContext } from '@/components/context/CartContext'
import { useContext } from 'react'
import { CheckoutButton } from './checkout';



export function FeaturedProductCard({ product }: any) {
  const { id, name, price, imageUrl } = product;
  const cart = useContext(CartContext);
  // console.log("this is cart",cart.items)


  return (
   
    <Card className="w-full max-w-sm mx-auto">
      <Link href={`/products/${id}`}>  
        <CardHeader>
          <CardTitle className="text-xl font-bold truncate">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <img src={imageUrl} alt={name} className="w-full h-64 object-contain mb-4" />
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex w-full space-x-2">
            <div className={`flex-1 transition-all duration-300 ease-in-out`}>
              <Button 
                className="w-full" 
                onClick={(e) => {e.preventDefault(); cart.addOneToCart(product)}} 
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
            <div className={`flex-1 transition-all duration-300 ease-in-out`}>
              
              <CheckoutButton className="w-full" product={product} />
              
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
    
  )
}