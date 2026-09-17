import styles from "./Faq.module.css";

export default function Faq({ questions, email }) {
  return (
    <section id="faq" className={`v2-faq ${styles.faq}`} data-section="faq" aria-labelledby="v2-faq-heading">
      <div className={styles.intro}><div className={styles.eyebrow}><span aria-hidden="true">↳</span> A little clarity</div><h2 id="v2-faq-heading">Before<br /> we begin.</h2><p>Something else on your mind?</p><a href={`mailto:${email}`}>Let’s talk <span aria-hidden="true">↗</span></a></div>
      <div className={`v2-faq-rows ${styles.questions}`}>
        {questions.map((item, index) => <details key={item.question} name="v2-faq" className={styles.item}>
          <summary><span className={styles.number}>0{index + 1}</span><span>{item.question}</span><span className={styles.plus} aria-hidden="true" /></summary>
          <p>{item.answer}</p>
        </details>)}
      </div>
    </section>
  );
}
