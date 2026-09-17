import Image from "next/image";
import Arrow from "../shared/Arrow";
import styles from "./SelectedWork.module.css";

export default function ProjectCard({ project, index, total }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <>
    <div id={`work-${project.id}`} className={styles.anchor} data-work-anchor aria-hidden="true" />
    <article className={`v2-project v2-project-${project.id} ${styles.project}`} style={{ "--project-order": index + 1 }} data-project={project.id} data-art={project.artDirection} aria-labelledby={`title-${project.id}`}>
      <div className={`v2-project-surface ${styles.surface}`} data-work-surface>
        <a className={`v2-project-visual ${styles.visual}`} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} website (opens in a new tab)`} data-work-visual>
          <div className={styles.media} data-work-media>
            <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 899px) 100vw, 75vw" className={styles.image} />
          </div>
          <div className={styles.shade} aria-hidden="true" />
          <div className={styles.spotlight} aria-hidden="true" />
          <div className={styles.visualTop}>
            <span className={styles.projectLabel}><i aria-hidden="true" />{project.label}</span>
            <span className={styles.projectNumber}>{number}<span> / {String(total).padStart(2, "0")}</span></span>
          </div>
          <div className={styles.projectTitle}>
            <span className={styles.projectType}>{project.type}</span>
            <h3 id={`title-${project.id}`}>{project.name}</h3>
            <span className={styles.statement}>{project.statement}</span>
          </div>
          <div className={styles.visualCorner} aria-hidden="true"><Arrow /></div>
          <span className={styles.cursor} data-work-cursor aria-hidden="true">Visit site<Arrow /></span>
          <div className={styles.progress} aria-hidden="true"><span /></div>
        </a>

        <div className={`v2-project-details ${styles.details}`}>
          <div className={styles.description}><span className={styles.detailLabel}>The experience</span><p>{project.description}</p></div>
          <div className={styles.scope}><span className={styles.detailLabel}>Our scope</span><ul>{project.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <a className={styles.siteLink} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} website (opens in a new tab)`}>Visit website<Arrow /></a>
        </div>
      </div>
    </article>
    </>
  );
}
