"use client";

import { createContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

type Product = {
    id: any; // or specify a specific type for `id` if possible
    quantity: number;
    price: number;
    name: string;
    imageUrl: string;
    stock : number
};

type CartContextType = {
    items: Product[];
    getProductQuantity: (id: any) => number;
    addOneToCart: (product: Product) => void;
    RemoveOnefromCart: (id: any) => void;
    deletefromCart: (id: any) => void;
    TotalCost: (product: Product) => number;
};

export const CartContext = createContext<CartContextType>({
    items: [],
    getProductQuantity: () => 0,
    addOneToCart: () => { },
    RemoveOnefromCart: () => { },
    deletefromCart: () => { },
    TotalCost: () => 0,
});

type Props = {
    children: ReactNode;
};

export function CartProvider({ children }: Props) {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    function getProductQuantity(id: any) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        return quantity || 0;
    }

    function addOneToCart(product: Product) {
        const quantity = getProductQuantity(product.id);


        if (quantity === 0) {
            setCartProducts([
                ...cartProducts,
                { ...product, quantity: 1 },
            ]);
        
        } 
        else if (quantity >= product.stock){
            toast.error("This card is out of stock")
        }
        else {
            setCartProducts(
                cartProducts.map(card => product.id === card.id? { ...card, quantity: card.quantity + 1 }: card
                )
            );
        }
    }

    function RemoveOnefromCart(id: any) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deletefromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(product =>
                    product.id === id
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                )
            );
        }
    }

    function deletefromCart(id: any) {
        setCartProducts(cartProducts.filter(product => product.id !== id));
    }

    function TotalCost() {

        return cartProducts.reduce((total, product) => total + product.quantity * product.price, 0);
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        RemoveOnefromCart,
        deletefromCart,
        TotalCost
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}   

export default CartProvider;