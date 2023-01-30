import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles["footer-item"]}>Made by Charles Ching</p>
      <p className={styles["footer-item"]}>Powered by PokeAPI</p>
    </footer>
  );
};

export default Footer;
