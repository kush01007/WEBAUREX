"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import FooterSection from "@/components/sections/FooterSection";
import styles from "./ProjectCaseStudy.module.css";

const ease = [0.16, 1, 0.3, 1];

function ProjectNavigation() {
  const [open, setOpen] = useState(false);
  const links = [["Work", "/#work"], ["Services", "/#services"], ["About", "/#about"], ["Contact", "/#contact"]];

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.brand}>Webaurex Studio</Link>
      <nav className={styles.desktopNav} aria-label="Project navigation">
        {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
      </nav>
      <button
        type="button"
        className={styles.menuButton}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span /><span />
      </button>
      <div className={styles.mobileMenu} data-open={open}>
        <nav aria-label="Mobile project navigation">
          {links.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              <span>{label}</span><span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Reveal({ children, className = "", delay = 0, as = "div", ...props }) {
  const reducedMotion = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reducedMotion ? 0 : 0.8, delay, ease }}
      {...props}
    >
      {children}
    </Component>
  );
}

function Visual({ visual, className = "", sizes = "100vw", priority = false }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.figure
      className={`${styles.visual} ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reducedMotion ? 0 : 0.95, ease }}
    >
      <Image src={visual.src} alt={visual.alt} fill sizes={sizes} priority={priority} />
    </motion.figure>
  );
}

function ProjectHero({ project }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.figure
      className={`${styles.visual} ${styles.heroVisual}`}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.95, ease }}
    >
      <Image className={styles.heroImageDesktop} src={project.heroDesktop} alt={project.heroAlt} fill sizes="94vw" priority />
      <Image className={styles.heroImageMobile} src={project.heroMobile} alt={project.heroAlt} fill sizes="100vw" priority />
    </motion.figure>
  );
}

function WalkthroughVideo({ project }) {
  const videoRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const resetToStart = () => { video.currentTime = 0; };
    if (video.readyState >= 1) resetToStart();
    else video.addEventListener("loadedmetadata", resetToStart, { once: true });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.08 });

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("loadedmetadata", resetToStart);
      video.pause();
    };
  }, [project.slug]);

  return (
    <motion.figure
      className={`${styles.visual} ${styles.videoVisual}`}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reducedMotion ? 0 : 0.95, ease }}
    >
      <video
        ref={videoRef}
        className={styles.walkthroughVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label={project.videoAlt}
      >
        <source src={project.heroVideoMobile} media="(max-width: 767px)" type="video/mp4" />
        <source src={project.heroVideoDesktop} media="(min-width: 768px)" type="video/mp4" />
      </video>
    </motion.figure>
  );
}

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

export default function ProjectCaseStudy({ project, nextProject }) {
  return (
    <div className={styles.page}>
      <ProjectNavigation />

      <main id="project-top">
        <header className={styles.hero}>
          <ProjectHero project={project} />
        </header>

        <section className={styles.brief} aria-labelledby="project-title">
          <Reveal className={styles.identity}>
            <p className={styles.projectNumber}>Project {project.number}</p>
            <h1 id="project-title">{project.title}</h1>
            <dl className={styles.metaList}>
              <div><dt>Industry</dt><dd>{project.industry}</dd></div>
              <div><dt>What we did</dt><dd>{project.services.join(" / ")}</dd></div>
              <div><dt>Year</dt><dd>{project.year}</dd></div>
            </dl>
            <a href={project.url} target="_blank" rel="noreferrer" className={styles.liveLink}>
              Visit live website <Arrow />
            </a>
          </Reveal>

          <div className={styles.briefCopy}>
            <Reveal as="h2">Objective</Reveal>
            <div className={styles.objectiveCopy}>
              {project.objective.map((paragraph, index) => <Reveal as="p" delay={index * .04} key={paragraph}>{paragraph}</Reveal>)}
            </div>

            <Reveal as="h2" className={styles.doneHeading}>What We&apos;ve Done</Reveal>
            <ol className={styles.doneList}>
              {project.deliverables.map(([title, description], index) => (
                <Reveal as="li" delay={index * .035} key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p><strong>{title}.</strong> {description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.walkthrough} aria-label="Website walkthrough">
          <WalkthroughVideo project={project} />
        </section>

        <section className={styles.imageSequence} aria-label="Project imagery">
          {project.visuals.map((visual, index) => (
            <Visual
              key={visual.src}
              visual={visual}
              className={`${styles.galleryVisual} ${index === project.visuals.length - 1 ? styles.galleryWide : ""}`}
              sizes={index === project.visuals.length - 1 ? "94vw" : "(max-width: 700px) 94vw, 46vw"}
            />
          ))}
        </section>

        <section className={styles.outcome} aria-labelledby="outcome-heading">
          <Reveal>
            <p className={styles.sectionLabel}>Outcome</p>
            <h2 id="outcome-heading">{project.statement}</h2>
          </Reveal>
          <Reveal className={styles.outcomeSide} delay={.05}>
            <p>{project.summary}</p>
          </Reveal>
        </section>

        <section className={styles.nextRow} aria-label="Next project">
          <span>Next project</span>
          <Link href={`/projects/${nextProject.slug}`}>
            <span>{nextProject.title}</span><Arrow />
          </Link>
        </section>
      </main>

      <FooterSection linkPrefix="/" />
    </div>
  );
}
