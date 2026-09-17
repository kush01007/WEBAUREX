"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { eyebrow, TextLink } from "./SectionReveal";

export default function DetailDialog({ item, onClose, onSelect }) {
  const dialog = useRef(null);
  const hasItem = Boolean(item);
  useEffect(() => {
    const element = dialog.current;
    if (!hasItem) return;
    const previouslyFocused = document.activeElement;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [hasItem]);

  useEffect(() => {
    if (!item || !dialog.current.open) return;
    dialog.current.scrollTop = 0;
    dialog.current.querySelector("[data-detail-close]")?.focus({ preventScroll: true });
  }, [item]);

  return <dialog ref={dialog} className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-32px)] max-w-[1050px] overscroll-contain border-0 bg-[#faf9f6] p-0 font-[family-name:var(--font-geist)] text-[#181916] backdrop:bg-black/75 sm:w-[92vw]" aria-labelledby="detail-heading" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    {item && <div className="p-[24px] sm:p-[45px] lg:p-[65px]">
      <div className="mb-[35px] flex items-center justify-between gap-[20px]">
        <p className={`${eyebrow} max-w-[70%] text-[#73756c]`}>{item.type === "archive" ? "Visual concepts · Studio archive" : item.type === "project" ? item.category : item.category}</p>
        <button data-detail-close type="button" className="flex min-h-[44px] items-center gap-[16px] text-[11px] uppercase tracking-[0.1em]" onClick={onClose} aria-label="Close detail">Close<span className="text-[26px] font-light" aria-hidden="true">×</span></button>
      </div>
      <div className="mb-[35px] flex items-end justify-between gap-[24px]">
        <h2 id="detail-heading" className="text-[clamp(36px,6vw,82px)] font-medium leading-[0.98] tracking-[-0.065em]">{item.title}</h2>
        {item.type === "project" && item.projectNumber ? <span className="shrink-0 text-[clamp(58px,8vw,112px)] font-semibold leading-[.72] tracking-[-.08em]" aria-hidden="true">({item.projectNumber})</span> : null}
      </div>
      {item.type === "archive" ? <>
        <p className="mb-[30px] max-w-[600px] text-[16px] leading-[1.6] text-[#686962]">The original collection of visual explorations. Reference imagery shown as creative direction studies.</p>
        <div className="grid gap-[35px] sm:grid-cols-2">{item.items.map((study) => <button key={study.title} type="button" className="group text-left" onClick={() => onSelect({ ...study, type: "concept" })}>
          <span className="relative block aspect-[3/2] overflow-hidden"><Image src={study.image} alt={study.title + " visual study"} fill sizes="(max-width: 640px) 85vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></span>
          <span className="mt-[15px] block text-[22px] leading-[1.2] tracking-[-0.04em]">{study.title} ↗</span>
          <span className="mt-[6px] block text-[11px] text-[#73756c]">{study.category}</span>
        </button>)}</div>
      </> : <>
        <Image src={item.image} alt={item.imageAlt || item.title} width={1536} height={1024} sizes="(max-width: 900px) 85vw, 920px" className="max-h-[560px] w-full object-cover" />
        {item.type === "article" ? <div className="mx-auto mt-[40px] max-w-[680px]">{item.body.map((paragraph) => <p className="mt-[25px] text-[18px] leading-[1.75] tracking-[-0.015em]" key={paragraph}>{paragraph}</p>)}</div> : <>
          <p className="mt-[35px] max-w-[720px] text-[22px] leading-[1.55] tracking-[-0.025em]">{item.description}</p>
          {item.imageNote ? <p className="mt-[25px] max-w-[640px] text-[12px] leading-[1.65] text-[#73756c]">{item.imageNote}</p> : null}
          {item.url ? <TextLink href={item.url} className="mt-[30px]">Visit website</TextLink> : <TextLink href="#contact" onClick={onClose} className="mt-[30px]">Discuss your project</TextLink>}
        </>}
      </>}
    </div>}
  </dialog>;
}
