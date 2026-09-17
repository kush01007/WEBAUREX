import { notFound } from "next/navigation";
import "../../homepage.css";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import { getNextProject, getProjectCaseStudy, projectCaseStudies } from "@/data/projectCaseStudies";

export function generateStaticParams() {
  return projectCaseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);

  if (!project) return {};

  return {
    title: `${project.title} — Webaurex Studio`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);

  if (!project) notFound();

  return <ProjectCaseStudy project={project} nextProject={getNextProject(slug)} />;
}
