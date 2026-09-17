"use client";

import { useEffect, useRef, useState } from "react";
import { homepage } from "@/data/homepage-v2";
import Arrow from "../shared/Arrow";
import styles from "./Navigation.module.css";

function RollingLabel({ children }) {
  return <span className={styles.roll}><span>{children}</span><span aria-hidden="true">{children}</span></span>;
}

export default function Navigation({ navigation, enquiry }) {
  const header = useRef(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => { header.current.dataset.solid = String(window.scrollY > 48); };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function openMenu() {
    dialog.current.showModal();
    setOpen(true);
  }

  function closeMenu() { dialog.current.close(); }

  return (
    <>
      <header ref={header} className={`v2-navigation ${styles.header}`} data-section="navigation">
        <a href="#v2-hero" className={styles.brand} aria-label="Webaurex Studio home">Webaurex<span> Studio</span><i aria-hidden="true" /></a>
        <nav className={styles.desktop} aria-label="Main navigation">
          {navigation.map((item) => <a key={item.label} className={styles.link} href={item.href}><RollingLabel>{item.label}</RollingLabel></a>)}
        </nav>
        <a className={styles.enquiry} href={enquiry.href}><RollingLabel>{enquiry.label}</RollingLabel><span className={styles.arrow}><Arrow /></span></a>
        <button ref={trigger} type="button" className={styles.toggle} aria-label="Open navigation" aria-expanded={open} aria-controls="v2-mobile-menu" onClick={openMenu}>
          <span>Menu</span><span className={styles.menuIcon} aria-hidden="true"><i /><i /></span>
        </button>
      </header>

      <dialog ref={dialog} id="v2-mobile-menu" className={styles.menu} aria-label="Navigation" onClose={() => { setOpen(false); trigger.current?.focus(); }}>
        <div className={styles.menuHeader}>
          <a className={styles.brand} href="#v2-hero" onClick={closeMenu}>Webaurex Studio<i aria-hidden="true" /></a>
          <button className={styles.close} type="button" onClick={closeMenu} aria-label="Close navigation">Close <span aria-hidden="true">×</span></button>
        </div>
        <nav className={styles.mobileLinks} aria-label="Mobile navigation">
          {[...navigation, enquiry].map((item, index) => (
            <a key={item.label} href={item.href} onClick={closeMenu} style={{ "--nav-index": index }}><span className={styles.index}>0{index + 1}</span><span>{item.label}</span><Arrow /></a>
          ))}
        </nav>
        <div className={styles.menuBottom}><span>Have something in mind?</span><a href={`mailto:${homepage.email}`}>{homepage.email}<Arrow /></a></div>
      </dialog>
    </>
  );
}
