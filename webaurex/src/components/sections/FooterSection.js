"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "./SectionReveal";

const navigation = [["Home", "#hero"], ["About", "#about"], ["Work", "#work"], ["Services", "#services"]];
const explore = [["Testimonials", "#testimonials"], ["Journal", "#journal"], ["Contact", "#contact"]];

function FooterWordmark({ href }) {
  const wordmarkRef = useRef(null);
  const reduced = useReducedMotion();
  const isInView = useInView(wordmarkRef, { amount: .82 });
  const active = reduced || isInView;

  return (
    <div className="footer-wordmark-stage">
      <motion.a
        ref={wordmarkRef}
        href={href}
        aria-label="Webaurex Studio — back to top"
        className="footer-wordmark-track"
        animate={{ y: active ? "0%" : "18%" }}
        transition={reduced ? { duration: 0 } : { duration: .68, ease: [.22, 1, .36, 1] }}
      >
        <span className="footer-wordmark-text">Webaurex Studio</span>
        <span className="footer-wordmark-echoes" aria-hidden="true">
          {[1, 2, 3].map(index => (
            <motion.span
              key={index}
              className="footer-wordmark-echo"
              animate={{
                y: active ? `${index * .093}em` : "0em",
                opacity: active ? 1 - index * .1 : 0,
              }}
              transition={reduced ? { duration: 0 } : {
                duration: .72,
                delay: .58 + index * .045,
                ease: [.22, 1, .36, 1],
              }}
            >
              Webaurex Studio
            </motion.span>
          ))}
        </span>
      </motion.a>
    </div>
  );
}

function FooterLinks({ label, links, resolveHref }) {
  return (
    <div className="footer-column">
      <p className="footer-label">{label}</p>
      <nav aria-label={`${label} links`}>
        {links.map(([name, href]) => <a key={name} href={resolveHref(href)}>{name}</a>)}
      </nav>
    </div>
  );
}

export default function FooterSection({ linkPrefix = "" }) {
  const resolveHref = href => href.startsWith("#") ? `${linkPrefix}${href}` : href;

  return (
    <footer className="reference-footer">
      <div className="footer-columns">
        <div className="footer-intro">
          <p className="footer-label">Independent. Working worldwide.</p>
          <p>Distinctive websites and digital experiences for brands with something to say.</p>
        </div>

        <FooterLinks label="Navigation" links={navigation} resolveHref={resolveHref} />
        <FooterLinks label="Explore" links={explore} resolveHref={resolveHref} />

        <div className="footer-column">
          <p className="footer-label">Start a project</p>
          <nav aria-label="Contact links">
            <a href={resolveHref("#contact")}>Project enquiry</a>
            <a
              href="https://wa.me/916396511494"
              target="_blank"
              rel="noreferrer"
              className="footer-whatsapp"
              aria-label="WhatsApp Webaurex Studio on +91 63965 11494"
            >
              <span>WhatsApp us</span>
              <span className="footer-contact-number">+91 63965 11494</span>
            </a>
          </nav>
        </div>
      </div>

      <FooterWordmark href={resolveHref("#hero")} />

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Webaurex Studio</span>
        <span>Made with intention</span>
        <a href={resolveHref("#hero")}>Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
