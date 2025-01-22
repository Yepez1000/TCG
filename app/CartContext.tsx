"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { Products } from "@/components/products";



type Item = {
    id: string;
    product: Product;
    quantity: number;
}
type Product = {
    id: string;
    quantity: number;
    price: number;
    name: string;
    imageUrl: string;
    stock: number;
};

type CartContextType = {
    items: Item[];
    getProductQuantity: (id: string) => number;
    addOneToCart: (product: Product) => Promise<void>;
    removeOneFromCart: (id: string) => Promise<void>;
    deleteFromCart: (id: string) => Promise<void>;
    totalCost: () => number;
};

export const CartContext = createContext<CartContextType>({
    items: [],
    getProductQuantity: () => 0,
    addOneToCart: async () => { },
    removeOneFromCart: async () => { },
    deleteFromCart: async () => { },
    totalCost: () => 0,
});

type Props = {
    children: ReactNode;
};

export function CartProvider({ children }: Props) {
    const [cartProducts, setCartProducts] = useState<Item[]>([]); 
    const { data: session } = useSession();

    // Fetch the cart when the session loads
    useEffect(() => {
        if (session) {
            fetchCartFromDatabase();
        }
    }, [session]);

    // Fetch cart items from the database
    async function fetchCartFromDatabase() {
       
        try {
            const response = await fetch("/api/cart"); // Replace with your API route
            const cart = await response.json();
          

            setCartProducts(cart.items.map((item: any) => ({
                id: item.productId,
                product: item.product,
                quantity: item.quantity,
            })));

            
  


        } catch (error) {
            console.error("Failed to fetch cart:", error);
        }
    }
    useEffect(() => {
        
    }, [cartProducts]);

    // Get quantity of a product in the cart
    function getProductQuantity(id: string) {
       
        const quantity = cartProducts?.find((product) => product.id === id)?.quantity || 0;

      

        return quantity;
    }

    // Add one to cart (optimistic update)
    async function addOneToCart(product: Product) {

       
        const quantity = getProductQuantity(product.id);

        

        // Optimistic local update

        if (quantity === 0) {
            setCartProducts([...cartProducts, {id: product.id, product: product, quantity: 1 }]);
        }
        else if (quantity >= product.stock) {
            return toast.error("Out of stock");
        }
        else {
            setCartProducts(
                cartProducts.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        }

        try {
            // Sync with database
            await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id, action: "add" }),
            });
        } catch (error) {
            toast.error("Failed to add to cart");
            // Revert local update
            fetchCartFromDatabase();
        }
    }

    // Remove one from cart (optimistic update)
    async function removeOneFromCart(id: string) {
        const quantity = getProductQuantity(id);

        // Optimistic local update
        if (quantity === 1) {
            setCartProducts(cartProducts.filter((product) => product.id !== id));
        } else {
            setCartProducts(
                cartProducts.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
            );
        }

        try {
            // Sync with database
            await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: id, action: "remove" }),
            });
        } catch (error) {
            toast.error("Failed to update cart");
            // Revert local update
            fetchCartFromDatabase();
        }
    }

    // Delete a product from the cart
    async function deleteFromCart(id: string) {
        const updatedCart = cartProducts.filter((product) => product.id !== id);

        // Optimistic local update
        setCartProducts(updatedCart);

        try {
            // Sync with database
            await fetch("/api/cart", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: id }),
            });
        } catch (error) {
            toast.error("Failed to delete from cart");
            // Revert local update
            fetchCartFromDatabase();
        }
    }

    // Calculate total cost
    function totalCost() {
        return cartProducts.reduce((total, product) => total + product.quantity * product.product.price, 0);
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        totalCost,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export default CartProvider;