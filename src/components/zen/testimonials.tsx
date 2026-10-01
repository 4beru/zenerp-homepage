"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials, testimonialsSectionCopy } from "@/data/testimonials";
import { Reveal } from "@/components/zen/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/zen/icons";

export function Testimonials() {
  const total = testimonials.length;
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );
  const regionRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  useEffect(() => {
    const el = regionRef.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || paused || reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 8000);
    return () => window.clearInterval(id);
  }, [index, visible, paused, reduced, total]);

  useEffect(() => {
    const onVisibility = () => {
      const el = regionRef.current;
      if (document.hidden) {
        setPaused(true);
      } else if (el) {
        const stillEngaged =
          el.matches(":hover") || el.matches(":focus-within");
        setPaused(stillEngaged);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () =>
      document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - start;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const t = testimonials[index];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full overflow-hidden bg-[#0C1011] px-0 pb-24 pt-20 text-[#EEE8D5] sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1480px] px-5 sm:px-10 xl:px-16">
        <header className="border-b border-[#EEE8D5]/[0.08] pb-10 sm:pb-14">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#839496] sm:text-xs">
                {testimonialsSectionCopy.eyebrow}
              </p>
              <span
                className="hidden font-mono text-xs text-[#839496]/40 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
                {testimonialsSectionCopy.eyebrowSub}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="testimonials-heading"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#EEE8D5] text-balance"
            >
              {testimonialsSectionCopy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#839496] sm:text-lg">
              {testimonialsSectionCopy.description}
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.2}>
          <div
            ref={regionRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            tabIndex={0}
            className="relative mt-12 outline-none focus-visible:ring-2 focus-visible:ring-[#CB4B16]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C1011] sm:mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setPaused(false);
              }
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onKeyDown={onKeyDown}
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -left-1 select-none font-display text-8xl leading-none text-[#CB4B16]/15 lg:text-9xl"
                >
                  &ldquo;
                </span>

                <div
                  aria-live="polite"
                  className="relative min-h-[200px] pl-8 sm:min-h-[180px] lg:pl-12"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.blockquote
                      key={index}
                      initial={reduced ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -14 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-xl leading-relaxed text-pretty text-[#EEE8D5]/90 sm:text-2xl lg:text-[1.75rem]"
                    >
                      {t.quote}
                    </motion.blockquote>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    }}
                    className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EEE8D5]/[0.08] pt-6 pl-8 lg:pl-12"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#839496]">
                      {t.industry}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-[#839496]/40"
                    />
                    <span className="text-sm font-medium text-[#EEE8D5]">
                      {t.name}
                    </span>
                    <span className="text-sm text-[#839496]">· {t.role}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-row items-end justify-between gap-6 lg:flex-col lg:items-end lg:justify-between lg:gap-8">
                <div className="flex flex-col items-end gap-4 text-right lg:items-end">
                  <span className="font-mono text-xs tracking-[0.14em] text-[#839496]">
                    {t.index}
                    <span className="text-[#839496]/40">/{String(total).padStart(2, "0")}</span>
                  </span>
                  <span className="inline-flex items-center rounded-sm border border-[#CB4B16]/30 bg-[#CB4B16]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#CB4B16]">
                    {t.result}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => go(-1)}
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-[#EEE8D5]/[0.08] text-[#839496] transition-colors duration-200 hover:border-[#CB4B16]/40 hover:text-[#EEE8D5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
                  >
                    <ArrowLeftIcon width={18} height={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => go(1)}
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-[#EEE8D5]/[0.08] text-[#839496] transition-colors duration-200 hover:border-[#CB4B16]/40 hover:text-[#EEE8D5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CB4B16]"
                  >
                    <ArrowRightIcon width={18} height={18} />
                  </button>
                </div>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Testimonial indicators"
              className="mt-10 flex items-center gap-3"
            >
              {testimonials.map((item, i) => (
                <span
                  key={item.index}
                  className={`h-px transition-all duration-500 ${
                    i === index
                      ? "w-10 bg-[#CB4B16]"
                      : "w-6 bg-[#EEE8D5]/[0.15]"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
