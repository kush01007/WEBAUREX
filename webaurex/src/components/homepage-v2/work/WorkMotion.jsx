"use client";

import { useEffect, useRef } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

// Server-rendered cards remain readable without JavaScript. This wrapper only
// adds motion; project data and markup stay in their own components.
export default function WorkMotion({ children, className }) {
  const root = useRef(null);

  useEffect(() => {
    const stack = root.current;
    const section = stack.closest("section");
    const cards = [...stack.querySelectorAll("[data-project]")];
    const visuals = [...stack.querySelectorAll("[data-work-visual]")];
    const headingItems = [...section.querySelectorAll("[data-work-reveal]")];
    const stackMotion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let frame = 0;
    let visible = false;
    let activeVisual = null;
    let pointerFrame = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let stickyTop = 80;

    function drawScroll() {
      frame = 0;
      if (!visible || !stackMotion.matches) return;
      // Read all geometry before writing transforms. No per-frame React renders.
      const bounds = cards.map((card) => card.getBoundingClientRect());
      const top = stickyTop;
      bounds.forEach((rect, index) => {
        const next = bounds[index + 1];
        const enter = clamp((rect.top - top) / (window.innerHeight * 0.85));
        const exit = next ? 1 - clamp((next.top - top) / (rect.height * 0.95)) : 0;
        cards[index].style.setProperty("--work-enter", enter.toFixed(4));
        cards[index].style.setProperty("--work-exit", exit.toFixed(4));
        cards[index].style.setProperty("--work-progress", (1 - enter).toFixed(4));
      });
    }

    function scheduleScroll() {
      if (!frame && visible && stackMotion.matches) frame = requestAnimationFrame(drawScroll);
    }

    function handleWindowScroll() {
      scheduleScroll();
    }

    function resetPointer() {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      if (!activeVisual) return;
      activeVisual.removeAttribute("data-hover");
      activeVisual.style.setProperty("--pointer-dx", "0px");
      activeVisual.style.setProperty("--pointer-dy", "0px");
      activeVisual = null;
    }

    function drawPointer() {
      pointerFrame = 0;
      if (!activeVisual) return;
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      activeVisual.style.setProperty("--pointer-x", `${current.x.toFixed(1)}px`);
      activeVisual.style.setProperty("--pointer-y", `${current.y.toFixed(1)}px`);
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.2) pointerFrame = requestAnimationFrame(drawPointer);
    }

    function onPointerMove(event) {
      if (!pointer.matches || event.pointerType === "touch") return;
      const visual = event.currentTarget;
      const rect = visual.getBoundingClientRect();
      // Account for the scroll-driven scale on the parent surface.
      target.x = (event.clientX - rect.left) * visual.offsetWidth / rect.width;
      target.y = (event.clientY - rect.top) * visual.offsetHeight / rect.height;
      if (activeVisual !== visual) {
        resetPointer();
        activeVisual = visual;
        current.x = target.x;
        current.y = target.y;
      }
      visual.dataset.hover = "true";
      visual.style.setProperty("--pointer-dx", `${((target.x / visual.offsetWidth - 0.5) * 14).toFixed(2)}px`);
      visual.style.setProperty("--pointer-dy", `${((target.y / visual.offsetHeight - 0.5) * 10).toFixed(2)}px`);
      if (!pointerFrame) pointerFrame = requestAnimationFrame(drawPointer);
    }

    function configure() {
      stickyTop = Number.parseFloat(window.getComputedStyle(stack).getPropertyValue("--work-sticky-top")) || 80;
      stack.dataset.workMotion = String(stackMotion.matches);
      stack.dataset.workPointer = String(pointer.matches);
      stack.dataset.mobileMotion = String(motion.matches);
      resetPointer();
      cards.forEach((card) => {
        card.style.removeProperty("--work-enter");
        card.style.removeProperty("--work-exit");
        card.style.removeProperty("--work-progress");
      });
      scheduleScroll();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) scheduleScroll();
      else resetPointer();
    }, { rootMargin: "150px" });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.visible = "true";
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: "0px 0px -7%" });

    configure();
    if (motion.matches) section.dataset.workReady = "true";
    observer.observe(stack);
    headingItems.forEach((item, index) => {
      item.style.setProperty("--work-delay", `${index * 85}ms`);
      revealObserver.observe(item);
    });
    cards.forEach((card) => revealObserver.observe(card));
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll, { passive: true });
    stackMotion.addEventListener("change", configure);
    pointer.addEventListener("change", configure);
    visuals.forEach((visual) => {
      visual.addEventListener("pointermove", onPointerMove, { passive: true });
      visual.addEventListener("pointerleave", resetPointer);
      visual.addEventListener("blur", resetPointer);
    });

    return () => {
      cancelAnimationFrame(frame);
      resetPointer();
      observer.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", scheduleScroll);
      stackMotion.removeEventListener("change", configure);
      pointer.removeEventListener("change", configure);
      visuals.forEach((visual) => {
        visual.removeEventListener("pointermove", onPointerMove);
        visual.removeEventListener("pointerleave", resetPointer);
        visual.removeEventListener("blur", resetPointer);
      });
      [...headingItems, ...cards].forEach((item) => {
        delete item.dataset.visible;
        item.style.removeProperty("--work-delay");
      });
      delete stack.dataset.workMotion;
      delete stack.dataset.workPointer;
      delete stack.dataset.mobileMotion;
      delete section.dataset.workReady;
    };
  }, []);

  return <div ref={root} className={className}>{children}</div>;
}
