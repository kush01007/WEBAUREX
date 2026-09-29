import { articles } from "@/data/homepageData";
import { projectCaseStudies } from "@/data/projectCaseStudies";
import { absoluteUrl } from "@/lib/site";

export default function sitemap() {
  const homepage = {
    url: absoluteUrl("/"),
    changeFrequency: "monthly",
    priority: 1,
  };

  const projects = projectCaseStudies.map(({ slug }) => ({
    url: absoluteUrl(`/projects/${slug}`),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const blogArticles = articles.map(({ slug }) => ({
    url: absoluteUrl(`/blogs/${slug}`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [homepage, ...projects, ...blogArticles];
}
