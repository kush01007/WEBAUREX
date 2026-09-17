"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Arrow from "../shared/Arrow";
import styles from "./Services.module.css";

export default function Services({ content, services, enquiry }) {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = [...section.querySelectorAll("[data-service-enter]")];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;

    if (!reduceMotion.matches) {
      section.dataset.motionReady = "true";
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      }, { threshold: .12, rootMargin: "0px 0px -6%" });
      items.forEach((item, index) => {
        item.style.setProperty("--enter-delay", `${Math.min(index, 5) * 70}ms`);
        observer.observe(item);
      });
    }

    return () => {
      observer?.disconnect();
      delete section.dataset.motionReady;
      items.forEach((item) => {
        delete item.dataset.visible;
        item.style.removeProperty("--enter-delay");
      });
    };
  }, []);

  function positionPreview(event) {
    const preview = previewRef.current;
    const section = sectionRef.current;
    if (!preview || !section || event.pointerType === "touch") return;
    const rect = section.getBoundingClientRect();
    const width = preview.offsetWidth || 280;
    const x = Math.min(section.clientWidth - width - 20, Math.max(20, event.clientX - rect.left + 28));
    const y = event.clientY - rect.top - preview.offsetHeight * .5;
    preview.style.setProperty("--preview-x", `${x}px`);
    preview.style.setProperty("--preview-y", `${y}px`);
  }

  function showPreview(event, index) {
    positionPreview(event);
    setHovered(index);
  }

  function toggleRow(index) {
    setHovered(null);
    setActive((current) => current === index ? null : index);
  }

  return (
    <section ref={sectionRef} id="services" className={`v2-services ${styles.services}`} data-section="services" aria-labelledby="v2-services-heading">
      <div className={styles.topline} data-service-enter>
        <div className={styles.eyebrow}><span aria-hidden="true">↳</span> What we do</div>
        <span>Capabilities · 01—{String(services.length).padStart(2, "0")}</span>
      </div>

      <div className={`v2-services-heading ${styles.heading}`}>
        <h2 id="v2-services-heading" data-service-enter>{content.heading[0]}<br /><span>{content.heading[1]}</span></h2>
        <p data-service-enter>{content.description}</p>
      </div>

      <div className={`v2-service-rows ${styles.rows}`}>
        {services.map((service, index) => {
          const open = active === index;
          const panelId = `service-panel-${service.id}`;
          const toggleId = `service-toggle-${service.id}`;
          const words = service.description.split(" ");

          return (
            <article key={service.id} className={`v2-service-${service.id} ${styles.row}`} data-open={open} data-service-enter>
              <h3>
                <button
                  id={toggleId}
                  type="button"
                  className={styles.toggle}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggleRow(index)}
                  onPointerEnter={(event) => showPreview(event, index)}
                  onPointerMove={positionPreview}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                >
                  <span className={styles.number}>0{index + 1}</span>
                  <span className={styles.title}>{service.title}</span>
                  <span className={styles.status}>{open ? "Close" : "View details"}</span>
                  <span className={styles.plus} aria-hidden="true"><i /><i /></span>
                </button>
              </h3>

              <div id={panelId} className={styles.panel} role="region" aria-labelledby={toggleId} aria-hidden={!open} inert={!open}>
                <div className={styles.panelClip}>
                  <div className={`v2-service-content ${styles.panelContent}`}>
                    <div className={styles.mobileMedia} aria-hidden="true">
                      <Image src={service.media} alt="" fill sizes="(max-width: 700px) 100vw, 1px" />
                      <span>0{index + 1} / 0{services.length}</span>
                    </div>

                    <div className={styles.description}>
                      <span className={styles.detailLabel}>The experience</span>
                      <p aria-label={service.description}>
                        {words.map((word, wordIndex) => <span key={`${word}-${wordIndex}`} aria-hidden="true" style={{ "--word": wordIndex }}>{word} </span>)}
                      </p>
                    </div>

                    <div className={styles.capabilities}>
                      <span className={styles.detailLabel}>What we can build</span>
                      <ul>{service.capabilities.map((capability, capabilityIndex) => <li key={capability} style={{ "--capability": capabilityIndex }}><span>0{capabilityIndex + 1}</span>{capability}</li>)}</ul>
                    </div>

                    <a className={styles.cta} href={enquiry.href}>Discuss your project<span><Arrow /></span></a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div ref={previewRef} className={styles.floatingPreview} data-active={hovered !== null} aria-hidden="true">
        {services.map((service, index) => (
          <div key={service.id} className={styles.previewImage} data-visible={hovered === index}>
            <Image src={service.media} alt="" fill sizes="320px" />
            <span>0{index + 1}</span>
          </div>
        ))}
      </div>

      <div className={styles.bottom} data-service-enter><span>One studio. From the first sketch to the final interaction.</span><a href="#process">How we work<Arrow direction="down" /></a></div>
    </section>
  );
}
