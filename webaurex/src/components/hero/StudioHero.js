"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function StudioHero() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // iOS Safari can ignore declarative autoplay after a restore, tab switch,
    // or Low Power Mode transition. Keep the media explicitly muted and retry
    // playback at the moments Safari makes it eligible again.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const play = () => {
      if (!document.hidden && video.paused) video.play().catch(() => {});
    };
    const handleVisibility = () => {
      if (!document.hidden) play();
    };

    video.addEventListener("loadedmetadata", play);
    video.addEventListener("canplay", play);
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("touchstart", play, { passive: true });
    document.addEventListener("pointerdown", play);
    play();

    return () => {
      video.removeEventListener("loadedmetadata", play);
      video.removeEventListener("canplay", play);
      window.removeEventListener("pageshow", play);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("touchstart", play);
      document.removeEventListener("pointerdown", play);
    };
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="studio-hero relative isolate h-[68svh] min-h-[400px] max-h-[560px] w-full overflow-hidden bg-[#04100a] text-[#f4f5f1] md:h-[100svh] md:min-h-0 md:max-h-none"
    >
      <a href="#hero-heading" className="skip-link">
        Skip to content
      </a>

      <video
        ref={videoRef}
        className="studio-hero-video pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        src="/videos/webhero2.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />

      <h1
        id="hero-heading"
        tabIndex={-1}
        className="studio-hero-wordmark z-10"
        aria-label="Webaurex Studio"
      >
        {["Webaurex", "Studio"].map((word) => (
          <span
            key={word}
            className="studio-hero-word-mask block lg:mb-4"
          >
            <motion.span
              className="studio-hero-word block whitespace-nowrap"
              initial={reducedMotion ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 1.35,
                delay: reducedMotion ? 0 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      <style jsx global>{`
        /*
          Surgical wordmark overrides only.
          No scale() is used, so the Webaurex / Studio spacing is not distorted.
        */
        #hero .studio-hero-wordmark {
          color: #fff !important;
          opacity: 1 !important;
          mix-blend-mode: difference !important;
          font-kerning: normal !important;
        }

        #hero .studio-hero-word-mask {
          overflow: hidden !important;
          padding: 0.13em 0.07em 0.12em !important;
          margin: -0.13em -0.07em -0.12em !important;
        }

        @media (min-width: 768px) {
          #hero .studio-hero-wordmark {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-end !important;
            justify-content: center !important;
            gap: clamp(38px, 3vw, 64px) !important;
            width: 100% !important;
            left: 0 !important;
            right: 0 !important;
            padding-left: clamp(20px, 3.6vw, 64px) !important;
            padding-right: clamp(20px, 3.6vw, 64px) !important;
            box-sizing: border-box !important;

            /* Match the stronger v2 scale while the padded masks protect every glyph. */
            font-size: clamp(72px, 12.15vw, 700px) !important;
            line-height: 0.99 !important;
            letter-spacing: -0.03em !important;

            /* Requested ~5px upward adjustment. */
            transform: translateY(-7px) !important;
          }

          #hero .studio-hero-word-mask {
            flex: 0 0 auto !important;
          }
        }

        @media (max-width: 767px) {
          #hero.studio-hero {
            height: 68svh !important;
            min-height: 400px !important;
            max-height: 560px !important;
          }

          #hero .studio-hero-wordmark {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            align-items: baseline !important;
            justify-content: center !important;
            gap: 0.28em !important;
            width: 100% !important;
            left: 0 !important;
            right: 0 !important;
            bottom: clamp(22px, 4svh, 36px) !important;
            padding-left: 5% !important;
            padding-right: 5% !important;

            font-size: clamp(40px, 12.4cqw, 58px) !important;
            line-height: 0.96 !important;
            letter-spacing: -0.045em !important;

            transform: none !important;
          }

          #hero .studio-hero-word-mask {
            width: max-content !important;
            flex: 0 0 auto !important;
            padding-inline: 0.08em !important;
            margin-inline: -0.08em !important;
          }

          #hero .studio-hero-word-mask:last-child {
            font-size: 1em !important;
            line-height: inherit !important;
          }
        }
      `}</style>
    </section>
  );
}
