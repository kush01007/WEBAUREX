import Link from "next/link";
import Arrow from "../shared/Arrow";
import StudioMotion from "./StudioMotion";
import styles from "./StudioIntro.module.css";

export default function StudioIntro({ content }) {
  return (
    <StudioMotion className={`v2-studio-intro ${styles.intro}`}>
      <div className={`v2-studio-header ${styles.header}`}>
        <div className={styles.label}><span aria-hidden="true">↳</span> {content.label}</div>
        <span className={styles.note}>Independent spirit. Shared ambition.</span>
      </div>
      <div className={`v2-studio-statement ${styles.statement}`}>
        <svg className={styles.emblem} viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <path d="M40 0 46 26 68 12 54 34 80 40 54 46 68 68 46 54 40 80 34 54 12 68 26 46 0 40 26 34 12 12 34 26Z" fill="currentColor" />
          <circle cx="40" cy="40" r="8" fill="#101012" />
        </svg>
        <h2 id="v2-studio-heading" className={styles.heading}>
          {content.heading.map((line, index) => (
            <span key={line} data-studio-line className={`${styles.line} ${styles.reveal} ${index === content.heading.length - 1 ? styles.signature : ""}`}>{line}{index < content.heading.length - 1 ? " " : ""}</span>
          ))}
        </h2>
      </div>
      <div className={`v2-studio-details ${styles.details}`}>
        <p className={styles.description}>{content.description}</p>
        <Link prefetch={false} className={styles.workLink} href="#work">
          Explore selected work<span className={styles.arrow}><Arrow /></span>
        </Link>
      </div>
    </StudioMotion>
  );
}
