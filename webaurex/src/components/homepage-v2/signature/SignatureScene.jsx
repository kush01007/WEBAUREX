import CrystalCanvas from "./CrystalCanvas";
import styles from "./SignatureScene.module.css";

export default function SignatureScene({ content }) {
  return (
    <section id="signature" className={`v2-signature ${styles.signature}`} data-section="signature" aria-labelledby="v2-signature-heading">
      <div className={styles.stage}>
        <div className={styles.topline}>
          <span><i aria-hidden="true">✦</i>{content.label}</span>
          <span>Interactive spatial study · 03D</span>
        </div>

        <div className={styles.wordmark} aria-hidden="true">Webaurex</div>
        <CrystalCanvas />

        <div className={styles.copy}>
          <p>One connected system</p>
          <h2 id="v2-signature-heading">{content.heading[0]}<br /><span>{content.heading[1]}</span></h2>
        </div>

        <div className={styles.disciplines} aria-label="Our approach">
          {content.disciplines.map((discipline, index) => <span key={discipline}><i>0{index + 1}</i>{discipline}</span>)}
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span data-signature-progress>00</span>
          <i><b data-signature-progress-bar /></i>
          <span>100</span>
        </div>
      </div>
    </section>
  );
}
