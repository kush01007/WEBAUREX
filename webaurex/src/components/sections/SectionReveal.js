"use client";

import { useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export const ease = [0.16, 1, 0.3, 1];
export const eyebrow = "text-[10px] font-medium uppercase leading-[1.5] tracking-[0.12em] sm:text-[11px]";

const desktopQuery = "(min-width: 1024px) and (pointer: fine)";
const subscribe = callback => { const query = window.matchMedia(desktopQuery); query.addEventListener("change", callback); return () => query.removeEventListener("change", callback); };
const getSnapshot = () => window.matchMedia(desktopQuery).matches;
const getServerSnapshot = () => false;
const subscribeReducedMotion = callback => { const query = window.matchMedia("(prefers-reduced-motion: reduce)"); query.addEventListener("change", callback); return () => query.removeEventListener("change", callback); };
const getReducedMotionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getServerSnapshot);
}

export function useDesktopMotion() {
  const desktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reduced = useReducedMotion();
  return desktop && !reduced;
}

export function Arrow({ className = "h-5 w-5", direction = "up" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className} aria-hidden="true"><path d={direction === "up" ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"} /></svg>;
}

export function Reveal({ children, className = "", delay = 0, as = "div", once = true }) {
  const reduced = useReducedMotion();
  const Component = as === "span" ? motion.span : motion.div;
  return <Component className={className} initial={reduced ? false : { opacity: 0, y: 54, filter: "blur(7px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once, amount: .14 }} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : delay, ease }}>{children}</Component>;
}

export function MaskLines({ lines, className = "", id, as = "h2", once = true }) {
  const reduced = useReducedMotion();
  const Tag = as;
  return <Tag id={id} className={className} aria-label={lines.join(" ")}>{lines.map((line, index) => <motion.span key={line} className="-mb-[.1em] block overflow-hidden pb-[.1em]" aria-hidden="true" initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once, amount: .35 }}><motion.span className="block" variants={{ hidden: { y: "115%", rotate: 2 }, visible: { y: "0%", rotate: 0 } }} transition={{ duration: reduced ? 0 : 1.15, delay: reduced ? 0 : index * .09, ease }}>{line}</motion.span></motion.span>)}</Tag>;
}

export function TextLink({ children, href, className = "", onClick }) {
  const enabled = useDesktopMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 26 });
  const springY = useSpring(y, { stiffness: 170, damping: 26 });
  return <motion.a href={href} onClick={onClick} className={`group inline-flex min-h-12 items-center justify-between gap-8 border-b border-current py-3 text-[11px] font-medium uppercase tracking-[.09em] ${className}`} style={{ x: enabled ? springX : 0, y: enabled ? springY : 0 }} onPointerMove={event => { if (!enabled) return; const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left - rect.width / 2) * .09); y.set((event.clientY - rect.top - rect.height / 2) * .15); }} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}<Arrow className="h-[17px] w-[17px] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" /></motion.a>;
}
