import Arrow from "../shared/Arrow";
import styles from "./Footer.module.css";

export default function Footer({ email }) {
  return (
    <footer className={`v2-footer ${styles.footer}`} data-section="footer">
      <div className={styles.top}><p>Design with character.<br />Development with care.</p><nav aria-label="Footer navigation"><a href="#work">Work</a><a href="#services">Services</a><a href="#studio">Studio</a><a href="#process">Process</a><a href="#faq">FAQ</a></nav><a href="#v2-hero" className={styles.back}>Back to top<span><Arrow direction="down" /></span></a></div>
      <a className={styles.wordmark} href="#v2-hero" aria-label="Webaurex Studio home"><span>Webaurex</span>{" "}<span>Studio<i aria-hidden="true">.</i></span></a>
      <div className={styles.bottom}><span>© {new Date().getFullYear()} Webaurex Studio</span><a href={`mailto:${email}`}>{email}<Arrow /></a><span>Thoughtfully designed. Carefully built.</span></div>
    </footer>
  );
}
