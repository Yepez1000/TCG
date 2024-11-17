

import Link from 'next/link';
import Image from 'next/image';
import styles from './Products.module.css';
import { redirect } from 'next/navigation';
import { AddToCart } from './addtocart';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/products/card"

export function Products({ product }: any) {
    const { id, name, price, imageUrl } = product;

    return (

      //      <main className="flex-grow container mx-auto px-4 py-8">
      //   <h2 className="text-3xl font-bold mb-6">Featured Cards</h2>
      //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      //     {cards.map((card:any) => (
      //       <Card key={card.id} className="flex flex-col">
      //         <CardHeader>
      //           <CardTitle>{card.name}</CardTitle>
      //         </CardHeader>
      //         <CardContent className="flex-grow">
      //           <img src={card.image} alt={card.name} className="w-full h-40 object-contain mb-4" />
      //           <p className="text-muted-foreground">{card.type}</p>
      //           <p className="font-bold mt-2">${card.price.toFixed(2)}</p>
      //         </CardContent>
      //         <CardFooter>
      //           <Button className="w-full">
      //             <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      //           </Button>
      //         </CardFooter>
      //       </Card>
      //     ))}
      //   </div>
      // </main>
        <Link href={`/products/${id}`} className={styles.productCard}>
            <div className={styles.imageWrapper}>
                <Image src={imageUrl} alt={name} width={200} height={200} className={styles.productImage} />
            </div>
            <div className={styles.infoWrapper}>
                <span className={styles.productName}>{name}</span>
                <span className={styles.productPrice}>${price}</span>
                <button className={styles.addToCart} onClick={() => AddToCart(product)}>Add to Cart</button>
                <button onClick={() => redirect(`/products/${id}`)}>Buy Now</button>
            </div>
        </Link>
    );
}
