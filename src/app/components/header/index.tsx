import Link from "next/link";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <nav className={styles.navContainer}>
            <Link href="/" className={styles.aContainer}>
              Rádios
            </Link>
            <Link href="/favorites" className={styles.aContainer}>
              Favoritos
            </Link>
          </nav>
        </div>{" "}
      </header>
    </>
  );
}
