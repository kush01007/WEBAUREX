import Arrow from "../shared/Arrow";
import ProjectCard from "./ProjectCard";
import WorkMotion from "./WorkMotion";
import styles from "./SelectedWork.module.css";

export default function SelectedWork({ content, projects, enquiry }) {
  return (
    <section id="work" className={`v2-selected-work ${styles.work}`} data-section="work" aria-labelledby="v2-work-heading">
      <div className={`v2-work-heading ${styles.heading}`} data-work-heading>
        <div className={styles.eyebrow} data-work-reveal><span aria-hidden="true">↳</span> A selection of what we do</div>
        <div className={styles.headingRow}>
          <h2 id="v2-work-heading">
            <span data-work-reveal>Selected</span>
            <span className={styles.headingAccent} data-work-reveal>work.</span>
            <sup>({String(projects.length).padStart(2, "0")})</sup>
          </h2>
          <span className={styles.arrowRing} data-work-reveal aria-hidden="true"><Arrow direction="down" /></span>
        </div>
        <div className={styles.subheading} data-work-reveal>
          <p>{content.description.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
          <nav className={styles.index} aria-label="Selected projects">
            {projects.map((project, index) => <a key={project.id} href={`#work-${project.id}`}><span>0{index + 1}</span><i>{project.name}</i><Arrow direction="down" /></a>)}
          </nav>
        </div>
      </div>

      <WorkMotion className={`v2-work-stack ${styles.stack}`}>
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} total={projects.length} />)}
      </WorkMotion>

      <div className={`v2-work-closing ${styles.closing}`}>
        <span className={styles.closingNote}>Good work starts with a conversation.</span>
        <a href={enquiry.href}><span>{content.closing}</span><span className={styles.closingArrow}><Arrow /></span></a>
      </div>
    </section>
  );
}
