"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { MaskLines, Reveal, ease, useReducedMotion } from "./SectionReveal";

const stats = [
  ["8+", "Websites launched"],
  ["1.5+", "Users reached"],
  ["98%", "Client satisfaction rate"],
  ["3+", "Years of expertise"],
];

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: "some" });
  const numMatch = value.match(/[\d.]+/);
  const numberPart = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = value.replace(/[\d.]+/, '');
  const isFloat = numberPart % 1 !== 0;

  const [displayValue, setDisplayValue] = useState("0" + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, numberPart, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue((isFloat ? latest.toFixed(1) : Math.floor(latest)) + suffix);
        }
      });
      return controls.stop;
    }
  }, [inView, numberPart, suffix, isFloat]);

  return <span ref={ref}>{inView ? displayValue : "0" + suffix}</span>;
}

function WrittenParagraph() {
  const paragraphRef = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(paragraphRef, { amount: .45, once: true });
  const copy = "Webaurex turns ambitious ideas into distinctive brands, websites, and digital experiences. Strategy, design, and development move as one process, giving every decision a clear purpose.";
  const words = copy.split(" ");
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, words.length, {
      duration: 1.1,
      ease: "linear",
      onUpdate: latest => setVisibleWords(Math.min(words.length, Math.ceil(latest))),
    });
    return controls.stop;
  }, [inView, reduced, words.length]);

  return (
    <p ref={paragraphRef} aria-label={copy}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="about-written-word"
          style={{ opacity: reduced || index < visibleWords ? 1 : 0 }}
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
}

function AboutImage() {
  return (
    <div className="about-visual">
      <Image
        src="/reference/studio.webp"
        alt="Prismatic glass chess pieces in a dark studio setting"
        fill
        sizes="(max-width: 700px) calc(100vw - 44px), 620px"
        className="object-cover"
      />
    </div>
  );
}

export default function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <MaskLines
        id="about-heading"
        lines={["Building websites", "That feel like", "brands"]}
        className="about-heading"
        once={false}
      />

      <div className="about-composition">
        <motion.div
          className="about-visual-shell"
          initial={reduced ? false : { opacity: 0, y: 32, scale: .985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: .25 }}
          transition={{ duration: reduced ? 0 : 1.05, delay: reduced ? 0 : .12, ease }}
        >
          <AboutImage />
        </motion.div>

        <div className="about-copy">
          <WrittenParagraph />

          <motion.a 
            href="#services" 
            className="reference-button reference-button-outline about-action"
            initial={reduced ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : .75, delay: reduced ? 0 : .22, ease }}
          >
            About Us
          </motion.a>
        </div>
      </div>

      <div className="about-stats">
        {stats.map(([value, label], index) => (
          <div key={label} className="flex flex-col">
            <Reveal delay={index * 0.1} once={false}>
              <span className="text-[clamp(48px,7.5vw,110px)] font-bold leading-none tracking-[-.04em] text-[#111]">
                <AnimatedNumber value={value} />
              </span>
            </Reveal>
            <div className="mt-6 lg:mt-12">
              <Reveal delay={index * 0.1 + 0.1} once={false}>
                <span className="mb-4 block text-[12px] font-medium text-[#555] sm:text-[14px]">
                  {label}
                </span>
              </Reveal>
              <motion.div 
                className="h-[1px] w-full bg-[#B3B3FF] origin-left" 
                initial={{ scaleX: 0 }} 
                whileInView={{ scaleX: 1 }} 
                viewport={{ once: false, amount: 0.8 }} 
                transition={{ duration: 1, delay: index * 0.1 + 0.2, ease }} 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
