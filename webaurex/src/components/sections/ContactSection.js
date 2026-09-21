"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
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

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!loadVideo || !section || !video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    let inView = false;
    const play = () => {
      if (inView && !document.hidden && video.paused) {
        video.play().catch(() => {});
      }
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) play();
      else video.pause();
    }, { threshold: 0.01 });
    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else play();
    };

    visibilityObserver.observe(section);
    video.addEventListener("loadedmetadata", play);
    video.addEventListener("canplay", play);
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("touchstart", play, { passive: true });
    video.load();

    return () => {
      visibilityObserver.disconnect();
      video.removeEventListener("loadedmetadata", play);
      video.removeEventListener("canplay", play);
      window.removeEventListener("pageshow", play);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("touchstart", play);
      video.pause();
    };
  }, [loadVideo]);

  function update(event) {
    setFields({ ...fields, [event.target.name]: event.target.value });
  }

  function prepareEnquiry(event) {
    event.preventDefault();
    if (!complete) return;
    const name = fields.name.trim();
    const content = `Hello Webaurex Studio,\n\nI would like to discuss a potential project with your team.\n\n*Contact details*\nName: ${name}\nEmail: ${fields.email.trim()}\n\n*Project brief*\n${fields.message.trim()}\n\nPlease let me know the next steps and a convenient time to connect.\n\nThank you,\n${name}`;
    window.open(`https://wa.me/916396511494?text=${encodeURIComponent(content)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section ref={sectionRef} id="contact" className="contact-video-section" aria-labelledby="contact-heading">
      <video
        ref={videoRef}
        className="contact-background-video"
        poster="/reference/journal-3.webp"
        autoPlay
        muted
        loop
        playsInline
        preload={loadVideo ? "auto" : "none"}
        aria-hidden="true"
        tabIndex={-1}
      >
        {loadVideo && (
          <>
            <source src="/videos/contactvid-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
            <source src="/videos/contactvid-desktop.mp4" media="(min-width: 768px)" type="video/mp4" />
          </>
        )}
      </video>
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
