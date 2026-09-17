import { notFound } from "next/navigation";
import "../../homepage.css";
import BlogArticle from "@/components/blog/BlogArticle";
import { articles, getArticle, getNextArticle } from "@/data/homepageData";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  return {
    title: `${article.title} - Webaurex Studio`,
    description: article.description,
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return <BlogArticle article={article} nextArticle={getNextArticle(slug)} />;
}
