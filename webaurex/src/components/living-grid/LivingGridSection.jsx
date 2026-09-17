"use client";

import { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./living-grid.module.css";
import {
  getLivingGridProgress,
  setLivingGridPointer,
  setLivingGridProgress,
} from "./motionStore";

gsap.registerPlugin(ScrollTrigger);

const LivingGridCanvas = dynamic(() => import("./LivingGridCanvas"), {
  ssr: false,
  loading: () => <div className={styles.canvasFallback} aria-hidden="true" />,
});

export default function LivingGridSection() {
  const sectionRef = useRef(null);
  const structureRef = useRef(null);
  const respondsRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const structure = structureRef.current;
    const responds = respondsRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setLivingGridProgress(1);
      gsap.set([structure, responds], { clearProps: "all" });
      return undefined;
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const createSequence = ({ pin, start, end, scrub }) => {
        const driver = { progress: 0 };
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start,
            end,
            pin,
            pinSpacing: true,
            scrub,
            anticipatePin: pin ? 1 : 0,
            invalidateOnRefresh: true,
            onRefresh: self => setLivingGridProgress(self.progress),
          },
          onUpdate: () => setLivingGridProgress(driver.progress),
        });

        timeline
          .to(driver, { progress: 1, duration: 1 }, 0)
          .fromTo(
            structure,
            { clipPath: "inset(0 100% 0 0)", yPercent: 18 },
            { clipPath: "inset(0 0% 0 0)", yPercent: 0, duration: 0.16, ease: "power3.out" },
            0.01,
          )
          .fromTo(
            responds,
            { clipPath: "inset(0 0 100% 0)", yPercent: 22 },
            { clipPath: "inset(0 0 0% 0)", yPercent: 0, duration: 0.2, ease: "power3.out" },
            0.72,
          );

        return () => timeline.kill();
      };

      media.add("(min-width: 768px)", () => createSequence({
        pin: true,
        start: "top 85px",
        end: "+=165%",
        scrub: 1.05,
      }));

      media.add("(max-width: 767px)", () => createSequence({
        pin: false,
        start: "top 82%",
        end: "bottom 18%",
        scrub: 0.55,
      }));
    }, section);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      media.revert();
      context.revert();
      setLivingGridProgress(1);
      setLivingGridPointer({ x: 0, y: 0, active: false });
    };
  }, []);

  const handlePointerMove = event => {
    if (getLivingGridProgress() < 0.78 || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setLivingGridPointer({
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setLivingGridPointer({ x: 0, y: 0, active: false });
  };

  return (
    <section
      ref={sectionRef}
      id="living-grid"
      className={styles.section}
      aria-labelledby="living-grid-heading"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.stage}>
        <div className={styles.canvasShell}>
          <LivingGridCanvas />
        </div>

        <h2 ref={structureRef} id="living-grid-heading" className={styles.structure} aria-label="Structure that responds.">Structure</h2>
        <p ref={respondsRef} className={styles.responds} aria-hidden="true">
          <span>That</span>
          <span>responds.</span>
        </p>
      </div>
    </section>
  );
}
