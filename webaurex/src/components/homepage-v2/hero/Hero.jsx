"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { homepage } from "@/data/homepage-v2";
import useMediaQuery from "../hooks/useMediaQuery";
import Arrow from "../shared/Arrow";
import HeroVideoReveal from "./HeroVideoReveal";
import styles from "./Hero.module.css";

export default function Hero({ content }) {
  const section = useRef(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const [userPaused, setUserPaused] = useState(null);
  const paused = userPaused ?? reducedMotion;
  const onPlaybackBlocked = useCallback(() => setUserPaused(true), []);

  useEffect(() => {
    const hero = section.current;
    let frame = 0;
    function update() {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = reducedMotion ? 0 : Math.min(1, Math.max(0, -rect.top / rect.height));
      hero.style.setProperty("--hero-scroll", progress.toFixed(3));
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [reducedMotion]);

  return (
    <section ref={section} id="v2-hero" className={`v2-hero ${styles.hero}`} data-section="hero" aria-labelledby="v2-hero-heading">
      <HeroVideoReveal src={content.video} poster={content.poster} paused={paused} onPlaybackBlocked={onPlaybackBlocked} />
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.heroBottom}>
        <div className={styles.prelude}>
          <p className={`v2-hero-description ${styles.description}`}>{content.description.split("\n").map((line, index) => <span className={styles.lineMask} key={line}><span style={{ "--line": index }}>{line}</span></span>)}</p>
          <Link href="#work" prefetch={false} className={styles.explore}><span>{content.explore}</span><span className={styles.exploreCircle}><Arrow direction="down" /></span></Link>
        </div>
        <h1 id="v2-hero-heading" className={`v2-hero-wordmark ${styles.wordmark}`} aria-label="Webaurex Studio">
          {["Webaurex", "Studio"].map((word, wordIndex) => <span className={styles.wordMask} aria-hidden="true" key={word}><span className={styles.word} style={{ "--word": wordIndex }}>{word}</span></span>)}
        </h1>
        <div className={styles.baseline}>
          <span className={styles.signature}>Independent by design.</span>
          <a className={styles.mobileEnquiry} href={homepage.enquiry.href}>{homepage.enquiry.label}<Arrow /></a>
          <button className={styles.playback} type="button" aria-label={paused ? "Play background video" : "Pause background video"} aria-pressed={paused} onClick={() => setUserPaused(!paused)}>
            <span>{paused ? "Play" : "Pause"}</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">{paused ? <path d="m5 3 8 5-8 5V3Z" fill="currentColor" /> : <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="1.5" />}</svg>
          </button>
        </div>
      </div>
    </section>
  );
}
