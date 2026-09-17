import Image from "next/image";
import Arrow from "../shared/Arrow";
import EnquiryForm from "./EnquiryForm";
import styles from "./Contact.module.css";

export default function Contact({ content, email, services, poster }) {
  return (
    <section id="contact" className={`v2-contact ${styles.contact}`} data-section="contact" aria-labelledby="v2-contact-heading">
      <div className={styles.backdrop} aria-hidden="true"><Image src={poster} alt="" fill sizes="100vw" className={styles.backdropImage} /></div>
      <div className={styles.content}>
        <div className={styles.eyebrow}><span aria-hidden="true">↳</span> Start something with us</div>
        <div className={styles.heading}><h2 id="v2-contact-heading">{content.heading[0]}<br /><span>{content.heading[1]}</span></h2><Arrow className={styles.bigArrow} /></div>
        <div className={`v2-enquiry-layout ${styles.enquiryLayout}`}>
          <div className={styles.intro}><h3>{content.formHeading}</h3><p>{content.description}</p><div className={styles.email}><span>{content.emailNote}</span><a href={`mailto:${email}`}>{email}<Arrow /></a></div></div>
          <EnquiryForm email={email} services={services} />
        </div>
      </div>
    </section>
  );
}
