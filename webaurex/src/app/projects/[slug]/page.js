import { notFound } from "next/navigation";
import "../../homepage.css";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import { getNextProject, getProjectCaseStudy, projectCaseStudies } from "@/data/projectCaseStudies";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return projectCaseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);

  if (!project) return { robots: { index: false, follow: false } };

  const path = `/projects/${project.slug}`;
  const projectCategory = project.category
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const pageTitle = `${project.client} ${projectCategory} Project`;
  const socialTitle = `${pageTitle} | ${SITE_NAME}`;

  return {
    title: pageTitle,
    description: project.summary,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description: project.summary,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      images: [{ url: project.heroDesktop, alt: project.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: project.summary,
      images: [{ url: project.heroDesktop, alt: project.heroAlt }],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);

  if (!project) notFound();

  return <ProjectCaseStudy project={project} nextProject={getNextProject(slug)} />;
}
