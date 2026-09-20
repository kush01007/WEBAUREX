"use client";

import Link from "next/link";
import { projects } from "@/data/homepageData";
import WorkMotion from "@/components/homepage-v2/work/WorkMotion";
import { Arrow, MaskLines, Reveal } from "./SectionReveal";
import styles from "./ShowcaseSection.module.css";

function ProjectImage({ project, priority = false }) {
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={project.image} type="image/webp" />
      <source media="(max-width: 767px)" srcSet={project.mobileImage} type="image/webp" />
      <img
        src={project.mobileImage}
        alt={project.imageAlt}
        width={project.mobileImageWidth}
        height={project.mobileImageHeight}
        loading="eager"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={styles.image}
        style={{ backgroundImage: `url(${project.blurDataURL})`, backgroundSize: "cover" }}
      />
    </picture>
  );
}

function Project({ project, index }) {
  const number = index + 1;

  return (
    <article
      className={styles.project}
      style={{ "--project-order": index + 1 }}
      data-project={project.title.toLowerCase().replaceAll(" ", "-")}
    >
      <div className={styles.surface} data-work-surface>
        <Link
          href={`/projects/${project.slug}`}
          className={styles.visual}
          aria-label={`Explore ${project.title}`}
        >
            <span className={styles.media} data-work-media>
              <ProjectImage project={project} priority={index === 0} />
            </span>
            <span className={styles.imageShade} aria-hidden="true" />
            <span className={styles.imageNumber} aria-hidden="true">{number}</span>
            <span className={styles.marquee} aria-hidden="true">
              <span className={styles.marqueeWindow}>
                <span className={styles.marqueeTrack}>
                  {[0, 1].map((group) => (
                    <span className={styles.marqueeGroup} key={group}>
                      {[0, 1, 2].map((copy) => (
                        <span className={styles.marqueePhrase} key={copy}>
                          {project.description}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              </span>
            </span>
            <span className={styles.projectInfo} aria-hidden="true">
              <span className={styles.nameBlock}>
                <span className={styles.name}>{project.title}</span>
                <span className={styles.category}>{project.category}</span>
              </span>
              <span className={styles.arrow}>
                <Arrow />
              </span>
            </span>
        </Link>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className={styles.liveSite}
          aria-label={`Visit the live ${project.title} website`}
        >
          Live website <Arrow className={styles.liveSiteArrow} />
        </a>
      </div>
    </article>
  );
}

export default function ShowcaseSection() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-heading">
      <div className={styles.header}>
        <div className={styles.headingRow}>
          <div className={styles.titleGroup}>
            <MaskLines
              id="work-heading"
              lines={["Showcase"]}
              className={styles.heading}
              once={false}
            />
            <Reveal className={styles.projectCount} once={false}>(3)</Reveal>
          </div>
        </div>
      </div>

      <WorkMotion className={styles.stack}>
        {projects.map((project, index) => (
          <Project
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </WorkMotion>
    </section>
  );
}
