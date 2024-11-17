"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import { SignInButton, SignOutButton } from "../components/main/buttons";
import { Search } from "../components/search/search";
import "./globals.css";
import { CartContext } from "./CartContext";
import { useContext } from "react";

export default function Header() {

    const cart = useContext(CartContext);

    const productCount = cart.items.reduce((accumulator, product) => accumulator + product.quantity, 0);

    return (
        <nav className="header">
            <Link href="/">
                <Image
                    src="/logo.png"
                    width={200}
                    height={72}
                    alt="TCGCardMasterLogo"
                />
            </Link>
            <div className ={styles.searchForm}> 
                <Search />
            </div>
           
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/import">Import Cards</Link>
                </li>
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