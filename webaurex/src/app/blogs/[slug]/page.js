import { notFound } from "next/navigation";
import "../../homepage.css";
import BlogArticle from "@/components/blog/BlogArticle";
import { articles, getArticle, getNextArticle } from "@/data/homepageData";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return { robots: { index: false, follow: false } };

  const path = `/blogs/${article.slug}`;
  const socialTitle = `${article.title} | ${SITE_NAME}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description: article.description,
      url: path,
      siteName: SITE_NAME,
      type: "article",
      locale: "en_IN",
      images: [{ url: article.image, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: article.description,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return <BlogArticle article={article} nextArticle={getNextArticle(slug)} />;
}
