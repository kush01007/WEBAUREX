"use client";

import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/homepageData";
import { Arrow, Reveal } from "./SectionReveal";

export default function JournalSection() {
  return (
    <section id="journal" style={{ scrollMarginTop: 0 }} className="relative bg-white px-[clamp(20px,3.2vw,48px)] py-[clamp(64px,6.5vw,96px)] text-[#111]" aria-labelledby="journal-heading">
      <span id="blogs" className="absolute top-0 scroll-mt-0" aria-hidden="true" />
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
        <h2 id="journal-heading" className="min-w-0 overflow-visible pl-[.04em] pr-[.08em] text-[clamp(46px,6.8vw,108px)] font-medium leading-none tracking-[-.06em] min-[560px]:text-[60px] md:text-[clamp(46px,6.8vw,108px)]">Blog and Insights</h2>
        <a href="#journal-grid" className="inline-flex min-h-10 shrink-0 items-center gap-5 self-end border border-[#2134f5] px-4 text-[10px] uppercase tracking-[.08em] text-[#2134f5] transition-colors hover:bg-[#2134f5] hover:text-white md:mb-2 md:min-h-12 md:gap-7 md:px-5 md:text-[12px]">Explore all <Arrow className="h-4 w-4" /></a>
      </div>

      <div id="journal-grid" className="mx-auto mt-[clamp(38px,4.5vw,68px)] grid w-[90%] max-w-[360px] gap-y-10 min-[560px]:mx-0 min-[560px]:w-full min-[560px]:max-w-none min-[560px]:grid-cols-2 min-[560px]:gap-x-5 md:grid-cols-3 md:gap-x-[clamp(44px,3.2vw,64px)] md:gap-y-14">
        {articles.map((article, index) => (
          <Reveal key={article.slug} delay={index * .08} className={index === 2 ? "min-[560px]:col-span-2 min-[560px]:w-[calc(50%-10px)] min-[560px]:justify-self-center md:col-span-1 md:w-full" : ""}>
            <Link href={`/blogs/${article.slug}`} className="group block w-full text-left" aria-label={`Read ${article.title}`}>
              <span className="relative block aspect-[1.22] overflow-hidden bg-[#deded9] md:aspect-[1.08]"><Image src={article.image} alt={article.imageAlt} fill loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} placeholder="blur" blurDataURL={article.blurDataURL} sizes="(max-width: 559px) 72vw, (max-width: 767px) 44vw, 31vw" className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" /><span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center bg-white text-black opacity-0 transition-all duration-400 group-hover:rotate-45 group-hover:opacity-100"><Arrow className="h-5 w-5" /></span></span>
              <span className="mt-4 flex justify-between gap-4 text-[11px] text-[#777] md:mt-[18px] md:text-[12px]"><span>{article.category}</span><span>{article.readTime}</span></span>
              <h3 className="mt-3 text-[18px] font-medium leading-[1.12] tracking-[-.035em] md:text-[clamp(23px,1.6vw,30px)]">{article.title}</h3>
              <p className="mt-2 max-w-[390px] text-[12px] leading-[1.4] text-[#666] md:mt-2.5 md:text-[14px] md:leading-[1.45]">{article.description}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
