'use client';

import { Button } from "@/components/featured/button";

const fetchProducts = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default function ImportProducts() {
  const handler = async () => {

      const products = await fetchProducts('/api/products');

      // Loop through products and send each product's name to the backend
      products.map(async (product: any) => { 
          const response = await fetch('/api/createStripe', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ card: product}),
          });
          const session = await response.json();
          console.log("this is session", session)

       
      });
   
  };

  return (
    <Button onClick={handler}>Import Products</Button>
  );
}
