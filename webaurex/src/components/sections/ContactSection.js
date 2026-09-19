"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const complete = Object.values(fields).every(value => value.trim());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setLoadVideo(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setLoadVideo(true);
      observer.disconnect();
    }, { rootMargin: "500px 0px" });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function update(event) {
    setFields({ ...fields, [event.target.name]: event.target.value });
  }

  function prepareEnquiry(event) {
    event.preventDefault();
    if (!complete) return;
    const content = `Hi Webaurex,\n\nI'm ${fields.name.trim()}.\nEmail: ${fields.email.trim()}\n\nProject details:\n${fields.message.trim()}`;
    window.open(`https://wa.me/916396511494?text=${encodeURIComponent(content)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section ref={sectionRef} id="contact" className="contact-video-section" aria-labelledby="contact-heading">
      <video
        className="contact-background-video"
        src={loadVideo ? "/videos/contactvid.mp4" : undefined}
        poster="/reference/journal-3.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="contact-video-overlay" aria-hidden="true" />

      <div className="contact-video-card">
        <h2 id="contact-heading">Have a project in mind?</h2>
        <form autoComplete="off" onSubmit={prepareEnquiry}>
          <label htmlFor="contact-name">Full name *<input id="contact-name" name="name" autoComplete="off" placeholder="Enter your name" value={fields.name} onChange={update} required maxLength={120} /></label>
          <label htmlFor="contact-email">Email *<input id="contact-email" name="email" type="email" autoComplete="off" placeholder="Enter your email" value={fields.email} onChange={update} required maxLength={254} /></label>
          <label htmlFor="contact-message">Message *<textarea id="contact-message" name="message" placeholder="Tell us a little about the idea" value={fields.message} onChange={update} required maxLength={5000} rows={4} /></label>
          <button type="submit" disabled={!complete} data-complete={complete}>{complete ? "Submit now" : "Complete all fields"}</button>
        </form>
      </div>
    </section>
  );
}
