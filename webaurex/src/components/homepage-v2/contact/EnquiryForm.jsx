"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "../shared/Arrow";
import styles from "./Contact.module.css";

export default function EnquiryForm({ email, services }) {
  const form = useRef(null);
  const reviewHeading = useRef(null);
  const [review, setReview] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => { if (review) reviewHeading.current?.focus(); }, [review]);

  function prepare(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name) => String(data.get(name) || "").trim();
    for (const name of ["name", "message"]) {
      if (!value(name)) {
        const field = event.currentTarget.elements.namedItem(name);
        field.setCustomValidity(name === "name" ? "Please enter your name." : "Please tell us a little about your project.");
        field.reportValidity();
        return;
      }
    }
    const selected = services.filter((service) => data.getAll("service").includes(service.id)).map((service) => service.title);
    const details = [
      ["Name", value("name")], ["Email", value("email")],
      ["Interested in", selected.join(", ")], ["Timeline", value("timeline")], ["Budget", value("budget")],
    ].filter(([, text]) => text);
    const message = value("message");
    const body = `${details.map(([label, text]) => `${label}: ${text}`).join("\n")}\n\nProject brief\n${message}`;
    const subject = `Project enquiry — ${value("name")}`;
    setCopyStatus("");
    setReview({ details, message, body, href: `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` });
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(review.body);
      setCopyStatus("Project brief copied. You can paste it into an email.");
    } catch {
      setCopyStatus("Select the brief below to copy it, then email us directly.");
    }
  }

  function edit() {
    setReview(null);
    setCopyStatus("");
    requestAnimationFrame(() => form.current.elements.namedItem("name").focus());
  }

  return (
    <div className={`v2-enquiry-form ${styles.formArea}`}>
      <form ref={form} className={styles.form} onSubmit={prepare} hidden={Boolean(review)} aria-label="Project enquiry" aria-describedby="v2-form-note" onInput={(event) => event.target.setCustomValidity?.("")}>
        <div className={styles.fieldGrid}>
          <label className={styles.field} htmlFor="v2-enquiry-name"><span>Your name <span aria-hidden="true">*</span></span><input id="v2-enquiry-name" name="name" autoComplete="name" required maxLength={100} placeholder="Name" /></label>
          <label className={styles.field} htmlFor="v2-enquiry-email"><span>Email address <span aria-hidden="true">*</span></span><input id="v2-enquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
        </div>
        <fieldset className={styles.interests}><legend>What can we help with?</legend><div>{services.map((service) => <label key={service.id} className={styles.choice}><input type="checkbox" name="service" value={service.id} /><span>{service.shortTitle}</span></label>)}</div></fieldset>
        <label className={styles.field} htmlFor="v2-enquiry-message"><span>A little about the project <span aria-hidden="true">*</span></span><textarea id="v2-enquiry-message" name="message" required maxLength={2000} rows={4} placeholder="The idea, the goal, or what you'd like to change…" /></label>
        <div className={styles.fieldGrid}>
          <label className={styles.field} htmlFor="v2-enquiry-timeline"><span>Ideal timeline <small>(optional)</small></span><select id="v2-enquiry-timeline" name="timeline" defaultValue=""><option value="">Let’s work it out</option><option>Within a month</option><option>1–3 months</option><option>Flexible</option></select></label>
          <label className={styles.field} htmlFor="v2-enquiry-budget"><span>Budget range <small>(optional)</small></span><input id="v2-enquiry-budget" name="budget" maxLength={100} placeholder="Range & currency, if known" /></label>
        </div>
        <div className={styles.formBottom}><p id="v2-form-note">Review your brief, then send it through your email app.</p><button className={styles.submit} type="submit"><span>Review enquiry</span><span className={styles.submitArrow}><Arrow /></span></button></div>
      </form>

      {review && <div className={styles.review}>
        <div className={styles.reviewTop}><h3 ref={reviewHeading} tabIndex={-1}>Your project brief.</h3><button type="button" onClick={edit}>Edit details <span aria-hidden="true">↗</span></button></div>
        <dl className={styles.reviewDetails}>{review.details.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
        <p className={styles.reviewMessage}>{review.message}</p>
        <p className={styles.reviewNote}>Ready when you are. Open the draft in your email app, review it and send it to <strong>{email}</strong>.</p>
        <div className={styles.reviewActions}><a className={styles.submit} href={review.href}><span>Open email draft</span><span className={styles.submitArrow}><Arrow /></span></a><button type="button" className={styles.copy} onClick={copyBrief}>Copy project brief</button></div>
        <p className={styles.copyStatus} role="status">{copyStatus}</p>
        <details className={styles.copyFallback}><summary>Use the brief in another email app</summary><textarea aria-label="Project brief to copy" readOnly value={review.body} rows={8} /><a href={`mailto:${email}`}>Email {email}<Arrow /></a></details>
      </div>}
    </div>
  );
}
