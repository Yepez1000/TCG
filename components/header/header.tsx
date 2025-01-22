"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import { SignInButton, SignOutButton } from "@/components/main/buttons";
import { Search } from "@/components/search/search";
import { CartContext } from "@/components/context/CartContext";
import { useContext } from "react";

export default function Header() {
    const cart = useContext(CartContext);
    let productCount = 0;

    try{ 
        if(cart.items.length === 0){
            productCount = 0
        }
        else {
            productCount = cart.items.reduce((total, item) => total + item.quantity, 0);
        }
    }
    catch (error) {
        console.log(error);
    }
    return (
        <nav className="header">
            <Link href="/">
                <Image
                    src="/logo3.png"
                    height={50}
                    width={50}
                    alt="TCGCardMasterLogo"
                />
            </Link>
            <div className ={styles.searchForm}> 
                <Search />
            </div>
           
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/cart">Cart {productCount}</Link>
                </li>
                <li>
                    <SignInButton />
                </li>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </nav>
    );
}


