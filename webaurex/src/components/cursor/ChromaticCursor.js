"use client";

import { useEffect, useRef } from "react";
import styles from "./ChromaticCursor.module.css";

const ACTION_SELECTOR = [
  "a[href]",
  "button:not(:disabled)",
  "summary",
  "[role='button']",
  "[data-cursor-action]",
].join(",");

const NATIVE_SELECTOR = "input, textarea, select, [contenteditable='true']";

function surfaceTheme(element) {
  let node = element instanceof Element ? element : null;

  while (node && node !== document.documentElement) {
    const color = window.getComputedStyle(node).backgroundColor;
    const channels = color.match(/[\d.]+/g)?.map(Number);

    if (channels && channels.length >= 3 && (channels[3] ?? 1) > 0.08) {
      const [red, green, blue] = channels;
      const luminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
      return luminance > 0.58 ? "light" : "dark";
    }

    node = node.parentElement;
  }

  return "dark";
}

export default function ChromaticCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cursor || !finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let targetX = -40;
    let targetY = -40;
    let currentX = targetX;
    let currentY = targetY;

    root.dataset.webaurexCursor = "true";

    function setTargetState(target) {
      const element = target instanceof Element ? target : null;
      const native = Boolean(element?.closest(NATIVE_SELECTOR));
      cursor.dataset.action = String(!native && Boolean(element?.closest(ACTION_SELECTOR)));
      cursor.dataset.theme = surfaceTheme(element);
      cursor.dataset.visible = String(!native);
    }

    function handleMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.dataset.visible = "true";
      setTargetState(event.target);
    }

    function handleOver(event) { setTargetState(event.target); }
    function handleLeave() { cursor.dataset.visible = "false"; }
    function handleEnter() { cursor.dataset.visible = "true"; }
    function handleDown() { cursor.dataset.pressed = "true"; }
    function handleUp() { cursor.dataset.pressed = "false"; }

    function animate() {
      currentX += (targetX - currentX) * 0.78;
      currentY += (targetY - currentY) * 0.78;
      cursor.style.transform = `translate3d(${(currentX - 26).toFixed(2)}px, ${(currentY - 14).toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(animate);
    }

    document.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver, { passive: true });
    document.addEventListener("pointerdown", handleDown, { passive: true });
    document.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    frame = requestAnimationFrame(animate);

    return () => {
      delete root.dataset.webaurexCursor;
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.root} data-action="false" data-pressed="false" data-theme="dark" data-visible="false" aria-hidden="true">
      <svg className={styles.shape} viewBox="0 0 27 28" fill="none" aria-hidden="true">
        <path
          d="M3.6 1.8C2.35 1.08 1.55 1.55 1.58 3v21.9c.03 1.55 1.02 2.02 2.34 1.31l20.62-10.93c1.57-.83 1.58-1.98.02-2.85L3.6 1.8Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
