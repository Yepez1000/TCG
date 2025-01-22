import Link from "next/link";
import styles from "./NavMenu.module.css";

export default function NavMenu() {
  return (
      <nav className="navmenu">
          <ul className={styles.navList}>
              <li className={styles.navItem}><Link href="/search/newreleases">New Releases</Link></li>
              <li className={styles.navItem}><Link href="/search/pokemon">Pokemon</Link></li>
          </ul>
      </nav>
  );
}
