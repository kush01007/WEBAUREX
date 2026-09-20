"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { services } from "@/data/homepage-v2";
import { ease, useReducedMotion } from "./SectionReveal";

function PlusIcon({ open }) {
  return (
    <motion.span
      aria-hidden="true"
      className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#3046ff] text-white sm:h-12 sm:w-12 lg:h-14 lg:w-14"
      initial={false}
      animate={{ backgroundColor: open ? "#3046ff" : "rgba(48,70,255,0)" }}
      transition={{ duration: .55, ease }}
    >
      <span className="absolute h-px w-4 bg-current" />
      <motion.span
        className="absolute h-4 w-px bg-current"
        initial={false}
        animate={{ scaleY: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration: .52, ease }}
      />
    </motion.span>
  );
}

function ServicePanel({ service, index, reduced }) {
  return (
    <motion.div
      id={`service-panel-${index}`}
      role="region"
      aria-labelledby={`service-button-${index}`}
      initial={reduced ? false : { height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        height: { duration: reduced ? 0 : .9, ease },
        opacity: { duration: reduced ? 0 : .52, delay: reduced ? 0 : .1 },
      }}
      className="overflow-hidden"
    >
      <div className="grid min-w-0 gap-8 pb-[clamp(44px,5.5vw,86px)] pt-1 md:grid-cols-[minmax(0,.95fr)_minmax(360px,1.05fr)] md:gap-[clamp(64px,7vw,130px)]">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: reduced ? 0 : 0.58, delay: reduced ? 0 : 0.14, ease }}
          className="max-w-[610px] text-[15px] leading-[1.48] tracking-[-.02em] text-white/62 sm:text-[clamp(17px,1.4vw,24px)]"
        >
          {service.description}
        </motion.p>

        <div className="min-w-0">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.012 }}
            transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : 0.16, ease }}
            className="relative aspect-[1.5] w-[86%] max-w-[380px] overflow-hidden bg-white/8 sm:w-full sm:max-w-[430px]"
          >
            <Image
              src={service.media}
              alt={`${service.title} service direction`}
              fill
              unoptimized
              loading="eager"
              sizes="(max-width: 767px) 90vw, 52vw"
              className="object-cover"
            />
          </motion.div>

          <div className="mt-6 grid max-w-[430px] grid-cols-2 gap-x-4 gap-y-3 text-[13px] font-normal leading-[1.35] text-white/88 sm:mt-7 sm:gap-x-6 sm:gap-y-3.5 sm:text-[16px] sm:font-medium">
            {service.capabilities.map((item, itemIndex) => (
              <motion.span
                key={item}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.44,
                  delay: reduced ? 0 : 0.27 + itemIndex * 0.045,
                  ease,
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    services.forEach((service) => {
      const image = new window.Image();
      image.src = service.media;
    });
  }, []);

  return (
    <section
      id="services"
      className="bg-[#050505] px-[clamp(20px,5.2vw,100px)] pb-[clamp(72px,7vw,112px)] pt-[clamp(38px,3vw,58px)] text-white"
      aria-labelledby="services-heading"
    >
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-end gap-5 overflow-visible sm:gap-8">
        <motion.h2
          id="services-heading"
          className="min-w-0 text-[clamp(58px,14vw,72px)] font-medium leading-[.94] tracking-[-.032em] sm:text-[clamp(64px,9vw,160px)]"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduced ? 0 : 0.85, ease }}
        >
          Services
        </motion.h2>

        <span
          className="shrink-0 pb-[.01em] text-[clamp(58px,14vw,72px)] font-medium leading-[.94] tracking-[-.045em] text-white sm:text-[clamp(64px,9vw,160px)]"
        >
          ({services.length})
        </span>
      </div>

      <div className="mt-[clamp(34px,6vw,104px)]">
        {services.map((service, index) => {
          const open = active === index;

          return (
            <motion.div
              key={service.id}
              className="min-w-0 border-b border-white/18"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : index * 0.07, ease }}
            >
              <h3>
                <button
                  id={`service-button-${index}`}
                  type="button"
                  aria-expanded={open}
                  aria-controls={`service-panel-${index}`}
                  onClick={() => setActive(current => (current === index ? -1 : index))}
                  className="flex w-full min-w-0 items-center gap-4 py-[clamp(24px,2.6vw,48px)] text-left sm:gap-6"
                >
                  <span className="min-w-0 flex-1 pr-2 text-[clamp(23px,5.8vw,27px)] font-medium leading-[1.06] tracking-[-.025em] sm:pr-5 sm:text-[clamp(33px,4.15vw,77px)]">
                    {service.title}
                  </span>
                  <PlusIcon open={open} />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open && <ServicePanel service={service} index={index} reduced={reduced} />}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
