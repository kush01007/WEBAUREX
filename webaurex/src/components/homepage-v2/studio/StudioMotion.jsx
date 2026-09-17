"use client";

import { useEffect, useRef } from "react";

// Copy stays server-rendered; this wrapper only paints the scroll reveal.
export default function StudioMotion({ children, className }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lines = [...section.querySelectorAll("[data-studio-line]")];
    let frame = 0;
    let visible = true;
    const clamp = (value) => Math.min(1, Math.max(0, value));

    const paint = () => {
      frame = 0;
      if (preference.matches) {
        lines.forEach((line) => line.style.removeProperty("--studio-fill"));
        section.style.removeProperty("--studio-underline");
        section.style.removeProperty("--studio-turn");
        return;
      }
      const viewport = window.innerHeight;
      lines.forEach((line) => {
        const progress = clamp((viewport * .91 - line.getBoundingClientRect().top) / (viewport * .35));
        line.style.setProperty("--studio-fill", `${progress * 100}%`);
      });
      const lastLine = lines[lines.length - 1];
      const progress = clamp((viewport * .86 - lastLine.getBoundingClientRect().top) / (viewport * .32));
      section.style.setProperty("--studio-underline", String(progress));
      section.style.setProperty("--studio-turn", `${progress * 70 - 35}deg`);
    };

    const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(paint); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    }, { rootMargin: "100px" });

    observer.observe(section);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", paint);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", paint);
    };
  }, []);

  return <section ref={sectionRef} id="studio" className={className} data-section="studio" aria-labelledby="v2-studio-heading">{children}</section>;
}
