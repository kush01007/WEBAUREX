"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { testimonials } from "@/data/homepageData";
import { MaskLines, ease, useReducedMotion } from "./SectionReveal";

const visibleTestimonials = testimonials.slice(0, 4);

export default function TestimonialsSection() {
  const reduced = useReducedMotion();
  const railRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const pauseUntilRef = useRef(0);
  const lastAdvanceRef = useRef(0);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(0);

  const pauseAutoplay = useCallback(() => {
    pauseUntilRef.current = Date.now() + 4000;
  }, []);

  const measureRail = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const firstCard = rail.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect().width || rail.clientWidth;
    const visibleWidth = rail.clientWidth;
    const maxScroll = Math.max(0, rail.scrollWidth - visibleWidth);
    const endPadding = Number.parseFloat(window.getComputedStyle(rail).paddingRight) || 0;
    const contentScroll = Math.max(0, maxScroll - endPadding);
    const pages = Math.max(1, Math.ceil(contentScroll / cardWidth) + 1);
    const nextPage = maxScroll === 0 ? 0 : Math.round((rail.scrollLeft / maxScroll) * (pages - 1));

    setPageCount(pages);
    setActivePage(Math.min(nextPage, pages - 1));
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const frame = requestAnimationFrame(measureRail);
    const resizeObserver = new ResizeObserver(measureRail);
    resizeObserver.observe(rail);
    window.addEventListener("resize", measureRail);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureRail);
    };
  }, [measureRail]);

  useEffect(() => {
    if (pageCount <= 1) return;

    lastAdvanceRef.current = Date.now();

    const timer = window.setInterval(() => {
      const rail = railRef.current;
      const now = Date.now();
      if (!rail || dragRef.current.active || now < pauseUntilRef.current || now - lastAdvanceRef.current < 2500) return;

      const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
      if (maxScroll <= 0) return;
      const cardWidth = rail.firstElementChild?.getBoundingClientRect().width || rail.clientWidth;
      const nextLeft = rail.scrollLeft + cardWidth >= maxScroll - 2
        ? 0
        : Math.min(maxScroll, rail.scrollLeft + cardWidth);

      lastAdvanceRef.current = now;
      rail.scrollTo({ left: nextLeft, behavior: reduced ? "auto" : "smooth" });
    }, 250);

    return () => window.clearInterval(timer);
  }, [pageCount, reduced]);

  const goToPage = (index) => {
    const rail = railRef.current;
    if (!rail) return;

    pauseAutoplay();
    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const left = pageCount <= 1 ? 0 : maxScroll * (index / (pageCount - 1));
    rail.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  };

  const handlePointerDown = (event) => {
    pauseAutoplay();
    if (event.pointerType !== "mouse") return;
    const rail = railRef.current;
    if (!rail) return;

    dragRef.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
    rail.dataset.dragging = "true";
  };

  const handlePointerMove = (event) => {
    const rail = railRef.current;
    if (!rail || !dragRef.current.active) return;
    rail.scrollLeft = dragRef.current.startScroll - (event.clientX - dragRef.current.startX);
  };

  const stopDragging = (event) => {
    const rail = railRef.current;
    if (!rail || !dragRef.current.active) return;
    dragRef.current.active = false;
    pauseAutoplay();
    delete rail.dataset.dragging;
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
  };

  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="testimonials-heading-wrap">
        <MaskLines
          id="testimonials-heading"
          lines={["Testimonials"]}
          className="testimonials-heading"
        />
      </div>

      <motion.div
        ref={railRef}
        className="testimonials-rail"
        onScroll={measureRail}
        onWheel={pauseAutoplay}
        onTouchStart={pauseAutoplay}
        onTouchEnd={pauseAutoplay}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        initial={reduced ? false : { x: 72, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: reduced ? 0 : 0.9, ease }}
      >
        <article className="rating-card">
          <p className="quote-company">Client rating</p>
          <div className="rating-card-centre">
            <p className="rating-value">4.9</p>
            <div className="rating-stars" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="rating-note">Average project rating</p>
            <p className="rating-wordmark">Webaurex Studio</p>
          </div>
          <p className="rating-caption">Trusted by ambitious brands and founders.</p>
        </article>

        {visibleTestimonials.map((testimonial) => (
          <article className="quote-card" key={testimonial.quote}>
            <p className="quote-company">{testimonial.company}</p>
            <blockquote>
              <span aria-hidden="true">“</span>
              {testimonial.quote.split(testimonial.emphasis).map((part, partIndex, parts) => (
                <span key={`${testimonial.emphasis}-${partIndex}`}>
                  {part}
                  {partIndex < parts.length - 1 && <strong>{testimonial.emphasis}</strong>}
                </span>
              ))}
              <span aria-hidden="true">”</span>
            </blockquote>
            <p className="quote-person">
              <span>{testimonial.name}</span>
              <span>{testimonial.role}</span>
            </p>
          </article>
        ))}
      </motion.div>

      <div className="carousel-bottom">
        <div className="carousel-dots" aria-label="Testimonial pages">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to testimonial page ${index + 1}`}
              aria-current={activePage === index ? "true" : undefined}
              onClick={() => goToPage(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
