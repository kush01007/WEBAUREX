"use client";

import { useRef, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import styles from "./ClientStories.module.css";

function DirectionArrow({ back = false }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: back ? "rotate(180deg)" : undefined }}><path d="M4 12h16m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

export default function ClientStories({ stories }) {
  const rail = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)", true);

  function goTo(index) {
    const next = Math.max(0, Math.min(stories.length - 1, index));
    rail.current.scrollTo({ left: rail.current.clientWidth * next, behavior: reduced ? "instant" : "smooth" });
  }

  return (
    <section id="testimonials" className={`v2-client-stories ${styles.stories}`} data-section="testimonials" aria-labelledby="v2-stories-heading" aria-roledescription="carousel">
      <div className={styles.eyebrow}><span aria-hidden="true">↳</span> In good company</div>
      <div className={styles.heading}><h2 id="v2-stories-heading">Client <span>stories.</span></h2><p>Behind every website,<br />a shared point of view.</p></div>
      <div className={styles.quoteLayout}>
        <span className={styles.quoteMark} aria-hidden="true">“</span>
        <div ref={rail} id="v2-story-slides" className={`v2-story-rail ${styles.rail}`} onScroll={(event) => setActive(Math.max(0, Math.min(stories.length - 1, Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))))}>
          {stories.map((story, index) => <figure key={story.quote} className={styles.slide} role="group" aria-roledescription="slide" aria-label={`Story ${index + 1} of ${stories.length}`}>
            <blockquote>{story.quote.split(story.emphasis).map((part, partIndex, parts) => <span key={partIndex}>{part}{partIndex < parts.length - 1 && <strong>{story.emphasis}</strong>}</span>)}</blockquote>
          </figure>)}
        </div>
      </div>
      <div className={styles.controls}>
        <span className={styles.counter} aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")}<span> / {String(stories.length).padStart(2, "0")}</span></span>
        <div className={styles.positions} aria-label="Choose a client story">{stories.map((story, index) => <button key={story.quote} type="button" onClick={() => goTo(index)} aria-label={`Read client story ${index + 1}`} aria-current={active === index ? "true" : undefined} aria-controls="v2-story-slides"><span aria-hidden="true" /></button>)}</div>
        <div className={styles.arrows}><button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous client story" aria-controls="v2-story-slides"><DirectionArrow back /></button><button type="button" onClick={() => goTo(active + 1)} disabled={active === stories.length - 1} aria-label="Next client story" aria-controls="v2-story-slides"><DirectionArrow /></button></div>
      </div>
    </section>
  );
}
