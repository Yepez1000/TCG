import Link from "next/link";
import styles from "./NavMenu.module.css";

export default function NavMenu() {
  return (
      <nav className="navmenu">
          <ul className={styles.navList}>
              <li className={styles.navItem}><Link href="/NewReleases">New Releases</Link></li>
              <li className={styles.navItem}><Link href="/Pokemon">Pokemon</Link></li>
          </ul>
      </nav>
  );
}
