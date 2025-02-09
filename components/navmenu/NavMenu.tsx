'use client'

import Link from "next/link";
import { useState } from "react";
import styles from "./NavMenu.module.css";

export default function NavMenu() {
    const [hovering, setHovering] = useState<number|null>(null);
    const [popoverLeft, setpopoverLeft] = useState<number|null>(null);
    const [popoverRigth, setpopoverRigth] = useState<number|null>(null);


    return (
        <nav
            onMouseLeave={()=>
                setHovering(null)
            } 
            className="navmenu"
        >
            {/* <ul className={styles.navList}>

             
                <li className={styles.navItem}><Link href="/search/newreleases">New Releases</Link></li>
                <li className={styles.navItem}><Link href="/search/pokemon">Pokemon</Link></li>
            </ul> */}

            <a
                onMouseEnter={(event) => {
                    setHovering(0)
                    setpopoverLeft(event.currentTarget.offsetLeft)
                }}
                href="/search/newreleases"
            >
                New Relases
            </a>
            <a
                onMouseEnter={(event) => {
                    setHovering(0)
                    setpopoverLeft(event.currentTarget.offsetLeft)
                }}
                href="/search/newreleases"
            >
                New Relases
            </a>
            
            {hovering && (
                <div>
                    <p>Hello</p>
                </div>
            )}

        </nav>
    );
}
