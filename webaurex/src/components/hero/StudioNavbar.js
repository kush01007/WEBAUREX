"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blogs" },
  { label: "Contact", href: "#contact" },
  
];

export default function StudioNavbar() {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const menu = useRef(null);
  const pendingAnchor = useRef(null);

  function openMenu() {
    if (!menu.current || menu.current.open) return;
    menu.current.showModal();
    setMenuOpen(true);
  }

  function finishClose() {
    if (menu.current?.open) {
      menu.current.close();
    }

    setMenuOpen(false);
    setMenuClosing(false);

    if (pendingAnchor.current) {
      window.location.hash = pendingAnchor.current;
      pendingAnchor.current = null;
    }
  }

  function closeMenu(href = null) {
    if (menuClosing) return;

    pendingAnchor.current = href;

    if (reducedMotion) {
      finishClose();
      return;
    }

    setMenuClosing(true);
  }

  function followMenuLink(event) {
    event.preventDefault();
    closeMenu(event.currentTarget.getAttribute("href"));
  }

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    let frame = 0;
    function updateSurface() {
      frame = 0;
      setPastHero(hero.getBoundingClientRect().bottom <= 52);
    }
    function handleScroll() {
      if (!frame) frame = requestAnimationFrame(updateSurface);
    }

    updateSurface();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const desktop = window.matchMedia("(min-width: 768px)");

    function closeOnDesktop(event) {
      if (!event.matches) return;

      if (menu.current?.open) {
        menu.current.close();
      }

      setMenuOpen(false);
      setMenuClosing(false);
      pendingAnchor.current = null;
    }

    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="studio-navbar fixed z-50 flex min-h-[56px] items-center justify-between font-normal text-[#f5f5f2]"
        data-surface={pastHero ? "page" : "hero"}
      >
        <a
          href="#hero"
          className="studio-navbar-brand mb-4 block overflow-hidden text-[clamp(18px,1.2vw,20px)] leading-[1.2] tracking-[-.055em] text-[#f5f5f2]"
        >
          <motion.span
            className="block whitespace-nowrap"
            initial={reducedMotion ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 1.35,
              delay: reducedMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Webaurex Studio
          </motion.span>
        </a>

        {/* Brand tagline intentionally removed completely. */}

        <nav
          aria-label="Main navigation"
          className="studio-navbar-links mb-4 items-center gap-[2.3vw]"
        >
          {links.map(({ label, href }, index) => (
            <a key={label} href={href}>
              <span className="block overflow-hidden py-1">
                <motion.span
                  className="inline-flex items-center gap-[.4em]"
                  initial={reducedMotion ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 1.35,
                    delay: reducedMotion ? 0 : 0.2 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span>{label}</span>
                </motion.span>
              </span>
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="studio-navbar-toggle mb-4 flex items-center justify-center text-[#f5f5f2]"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="studio-mobile-navigation"
          aria-haspopup="dialog"
          onClick={openMenu}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      <dialog
        ref={menu}
        id="studio-mobile-navigation"
        aria-label="Mobile navigation"
        className="studio-navbar-menu"
        data-closing={menuClosing}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onAnimationEnd={(event) => {
          if (
            event.target === event.currentTarget &&
            event.animationName === "studio-menu-fade-out"
          ) {
            finishClose();
          }
        }}
        onClose={() => {
          setMenuOpen(false);
          setMenuClosing(false);
        }}
      >
        <div className="studio-navbar-menu-header">
          <a
            href="#hero"
            className="studio-navbar-menu-brand"
            onClick={followMenuLink}
          >
            Webaurex Studio
          </a>

          <button
            type="button"
            className="studio-navbar-menu-close flex items-center justify-center text-[#f5f5f2]"
            aria-label="Close navigation"
            onClick={() => closeMenu()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Mobile links"
          className="studio-navbar-menu-links"
        >
          {links.map(({ label, href }, index) => (
            <a
              key={label}
              href={href}
              onClick={followMenuLink}
              style={{ "--nav-index": index }}
            >
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </dialog>

      <style jsx global>{`
        .studio-navbar {
          position: fixed !important;
          inset: 0 0 auto !important;
          min-height: 52px !important;
          padding: 0 3.6% !important;
          background: transparent !important;
          transition: background-color 320ms ease, color 320ms ease, border-color 320ms ease !important;
        }

        .studio-navbar[data-surface="page"] {
          background: #fff !important;
          color: #090b0a !important;
          border-bottom: 1px solid rgb(9 11 10 / 8%) !important;
        }

        .studio-navbar[data-surface="page"] .studio-navbar-brand,
        .studio-navbar[data-surface="page"] .studio-navbar-links a,
        .studio-navbar[data-surface="page"] .studio-navbar-toggle {
          color: #090b0a !important;
          mix-blend-mode: normal !important;
        }

        /*
          Desktop navbar:
          - tagline removed
          - right links stay in right position
          - right links clearly visible with normal blend
          - links moved ~4px upward
        */
        @media (min-width: 768px) {
          .studio-navbar {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            min-height: 52px !important;
          }

          .studio-navbar-links {
            display: flex !important;
            align-items: center !important;
            gap: 1.3vw !important;
            transform: translateY(-4px) !important;
            margin: 0 !important;
          }

          .studio-navbar-links a {
            color: #fff !important;
            opacity: 1 !important;
            mix-blend-mode: difference !important;
          }

          .studio-navbar-links a:hover,
          .studio-navbar-links a:hover *,
          .studio-navbar-links a:focus-visible,
          .studio-navbar-links a:focus-visible * {
            transform: none !important;
          }

          .studio-navbar-brand {
            color: #f5f5f2 !important;
            mix-blend-mode: normal !important;
            opacity: 1 !important;
            margin: 0 !important;
          }

          .studio-navbar-toggle {
            display: none !important;
          }
        }

        /*
          Mobile top bar.
          A classic three-line hamburger replaces the previous icon.
        */
        @media (max-width: 767px) {
          .studio-navbar {
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            min-height: 50px !important;
            padding: 0 22px !important;
            grid-template-columns: 1fr auto !important;
            align-items: center !important;
          }

          .studio-navbar-brand {
            grid-column: 1 !important;
            margin: 0 !important;
            color: #f5f5f2 !important;
            mix-blend-mode: normal !important;
            opacity: 1 !important;
            font-size: 15px !important;
            line-height: 1.2 !important;
          }

          .studio-navbar-links {
            display: none !important;
          }

          .studio-navbar-toggle {
            grid-column: 2 !important;
            justify-self: end !important;
            display: flex !important;
            width: 32px !important;
            height: 32px !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            color: #f5f5f2 !important;
            appearance: none !important;
            -webkit-appearance: none !important;
            -webkit-tap-highlight-color: transparent !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .studio-navbar-toggle:focus,
          .studio-navbar-toggle:focus-visible,
          .studio-navbar-toggle:active {
            outline: none !important;
            box-shadow: none !important;
            background: transparent !important;
          }

          /* Compact editorial sheet for the mobile menu. */
          .studio-navbar-menu {
            position: fixed !important;
            inset: 0 0 auto !important;
            width: 100vw !important;
            max-width: none !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            border-radius: 0 !important;
            background: #fff !important;
            color: #0a0d0c !important;
            box-shadow: none !important;
          }

          .studio-navbar-menu::backdrop {
            background: rgb(3 12 10 / 42%) !important;
            backdrop-filter: blur(2px) !important;
          }

          .studio-navbar-menu-header {
            position: absolute !important;
            top: 12px !important;
            left: 22px !important;
            right: 22px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
          }

          .studio-navbar-menu-brand {
            display: none !important;
          }

          .studio-navbar-menu-close {
            position: relative !important;
            width: 32px !important;
            height: 32px !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            color: #0a0d0c !important;
            appearance: none !important;
            -webkit-appearance: none !important;
            -webkit-tap-highlight-color: transparent !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .studio-navbar-menu-close:focus,
          .studio-navbar-menu-close:focus-visible,
          .studio-navbar-menu-close:active {
            outline: none !important;
            box-shadow: none !important;
            background: transparent !important;
          }

          .studio-navbar-menu-close > span::before,
          .studio-navbar-menu-close > span::after {
            content: "" !important;
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            width: 24px !important;
            height: 1px !important;
            background: currentColor !important;
            transform-origin: center !important;
          }

          .studio-navbar-menu-close > span::before {
            transform: translate(-50%, -50%) rotate(45deg) !important;
          }

          .studio-navbar-menu-close > span::after {
            transform: translate(-50%, -50%) rotate(-45deg) !important;
          }

          .studio-navbar-menu-links {
            display: flex !important;
            height: auto !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: center !important;
            gap: clamp(12px, 2.2svh, 17px) !important;
            padding: 54px 22px 14px !important;
          }

          .studio-navbar-menu-links > a {
            display: flex !important;
            width: fit-content !important;
            min-height: 30px !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 10px !important;
            border: 0 !important;
            color: #0a0d0c !important;
            font-size: clamp(24px, 6.7vw, 27px) !important;
            line-height: 1.15 !important;
            letter-spacing: -0.04em !important;
            text-decoration: none !important;
            mix-blend-mode: normal !important;
          }

          .studio-navbar-menu-links > a:last-child {
            border: 0 !important;
          }

          .studio-navbar-menu-links > a small {
            font-size: 0.65em !important;
            font-weight: inherit !important;
          }

          @keyframes studio-menu-fade {
            from { opacity: 0; transform: translateY(-100%); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes studio-menu-fade-out {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-100%); }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .studio-navbar-menu,
          .studio-navbar-menu-links > a {
            animation-duration: 0s !important;
            transition-duration: 0s !important;
          }
        }
      `}</style>
    </>
  );
}
