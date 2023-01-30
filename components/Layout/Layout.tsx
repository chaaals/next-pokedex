import { FC } from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface LayoutProps {
  children: React.ReactNode;
  pokeView?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, pokeView }) => {
  return (
    <div className={styles.app}>
      <header>
        <Navbar />
      </header>

      <main
        className={pokeView ? styles["poke-view-container"] : styles.container}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
