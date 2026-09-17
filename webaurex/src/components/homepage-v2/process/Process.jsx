import Arrow from "../shared/Arrow";
import styles from "./Process.module.css";

export default function Process({ content, steps }) {
  return (
    <section id="process" className={`v2-process ${styles.process}`} data-section="process" aria-labelledby="v2-process-heading">
      <div className={styles.eyebrow}><span aria-hidden="true">↳</span> How we work</div>
      <div className={styles.heading}><h2 id="v2-process-heading">{content.heading[0]}<br /><span>{content.heading[1]}</span></h2><p>{content.description}</p></div>
      <ol className={`v2-process-steps ${styles.steps}`}>
        {steps.map((step, index) => <li key={step.label} className={styles.step}>
          <div className={styles.stepTop}><span>0{index + 1}</span><span>{step.label}</span><Arrow /></div>
          <h3>{step.title}</h3><p>{step.description}</p>
          <div className={styles.outcome}><span aria-hidden="true">↳</span>{step.outcome}</div>
        </li>)}
      </ol>
      <div className={styles.bottom}><span>Creative thinking. Practical decisions.</span><span>A clear conversation throughout.</span></div>
    </section>
  );
}
