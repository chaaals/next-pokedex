import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles["nav-bar"]}>
      <h1 className={styles["nav-item"]}>BookéDEX</h1>
    </nav>
  );
};

export default Navbar;
