import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/components/sections/FooterSection";
import styles from "./BlogArticle.module.css";

const navigation = [
  ["Home", "/#hero"],
  ["About", "/#about"],
  ["Works", "/#work"],
  ["Blog", "/#journal"],
  ["Contact", "/#contact"],
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

function ArticleParagraphs({ paragraphs, introductory = false }) {
  return paragraphs.map((paragraph, index) => (
    <p className={introductory && index === 0 ? styles.opening : undefined} key={paragraph}>
      {paragraph}
    </p>
  ));
}

export default function BlogArticle({ article, nextArticle }) {
  return (
    <div className={styles.page} id="article-top">
      <header className={styles.navbar}>
        <Link href="/" className={styles.brand}>Webaurex Studio</Link>
        <nav aria-label="Article navigation">
          {navigation.map(([label, href]) => (
            <Link href={href} key={label}>{label}</Link>
          ))}
        </nav>
      </header>

      <main>
        <article>
          <header className={styles.articleHeader}>
            <div className={styles.eyebrowRow}>
              <Link href="/#journal">Ideas &amp; insights</Link>
              <span>{article.category}</span>
            </div>
            <h1>{article.title}</h1>
            <div className={styles.headerDetails}>
              <p>{article.description}</p>
              <dl>
                <div><dt>Written by</dt><dd>{article.author}</dd></div>
                <div><dt>Reading time</dt><dd>{article.readTime}</dd></div>
              </dl>
            </div>
          </header>

          <figure className={styles.heroMedia}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 700px) 100vw, 94vw"
              className={styles.heroImage}
              priority
            />
          </figure>

          <div className={styles.readingGrid}>
            <aside className={styles.articleAside}>
              <p className={styles.asideLabel}>Written by</p>
              <p>{article.author}</p>
              <span>{article.category} / {article.readTime}</span>
            </aside>

            <div className={styles.prose}>
              <section aria-labelledby="introduction-heading">
                <p className={styles.sectionLabel} id="introduction-heading">Introduction</p>
                <ArticleParagraphs paragraphs={article.introduction} introductory />
              </section>

              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <ArticleParagraphs paragraphs={section.paragraphs} />
                </section>
              ))}

              <section>
                <h2>Conclusion</h2>
                <ArticleParagraphs paragraphs={article.conclusion} />
              </section>
            </div>
          </div>
        </article>

        <section className={styles.nextArticle} aria-label="Next article">
          <p>Continue reading</p>
          <Link href={`/blogs/${nextArticle.slug}`}>
            <span>{nextArticle.title}</span>
            <Arrow />
          </Link>
        </section>
      </main>

      <FooterSection linkPrefix="/" />
    </div>
  );
}
