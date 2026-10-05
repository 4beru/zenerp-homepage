"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, servicesSectionCopy, type Service } from "@/data/services";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/zen/icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Creative Studio Services & Capabilities
 *
 * Visual System & Architecture:
 * - Scene Shift: Warm Editorial Light Canvas (#F0EBE6) breaking from the Dark Hero.
 * - Massive Brutalist Headline: "SERVICES" with catalog tag "DSGN/06" (Image 1).
 * - Horizontal Pinned Scroll: GSAP ScrollTrigger captures vertical scroll to drive horizontal gallery movement.
 * - Architectural Cards & Hover Reveal: Minimalist numbers (01..06) + uppercase titles, revealing
 *   rich photographic imagery and high-contrast typography on hover (Images 2 & 3).
 */
export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const openDialog = useLeadDialog((s) => s.openDialog);
  const reduced = usePrefersReducedMotion();

  // GSAP Horizontal Pinned Scroll Trigger
  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Use gsap.context for complete cleanup and scoped animations
    const ctx = gsap.context(() => {
      // Dynamic computation of total horizontal travel distance
      const getScrollLength = () => {
        const containerWidth = container.clientWidth || window.innerWidth;
        const totalTrackWidth = track.scrollWidth;
        return Math.max(0, totalTrackWidth - containerWidth + 60);
      };

      const scrollDistance = getScrollLength();

      // Horizontal pinning tween
      const tween = gsap.to(track, {
        x: () => -getScrollLength(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${Math.max(getScrollLength() * 1.25, 1400)}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${progress})`;
            }
            const activeIndex = Math.min(
              services.length - 1,
              Math.floor(progress * services.length)
            );
            setActiveCardIndex(activeIndex);
          },
        },
      });

      // Recalculate dimensions on window resize and image settlement
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 350);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timer);
        tween.kill();
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, [reduced]);

  // Keyboard and button step navigation (drives window scroll smoothly)
  const scrollStep = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const cardStep = Math.max(380, Math.round(track.scrollWidth / services.length));
    const delta = direction === "next" ? cardStep : -cardStep;
    window.scrollBy({ top: delta, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="servicios"
      aria-labelledby="services-main-heading"
      className="relative w-full overflow-hidden bg-[#F0EBE6] text-[#201D1D]"
    >
      {/* 1. Architectural Transition Boundary (Dark to Warm Editorial) */}
      <div className="w-full border-b border-[#201D1D]/15 bg-[#050505] px-6 py-4 text-[#839496] sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
            <span>SCENE 02 // CAPABILITIES &amp; DISCIPLINES</span>
          </div>
          <span className="hidden sm:inline">WARM EDITORIAL CANVAS // #F0EBE6</span>
        </div>
      </div>

      {/* Main Services Pin Wrapper */}
      <div className="relative mx-auto flex h-[calc(100vh-45px)] min-h-[640px] flex-col justify-between px-6 pt-8 pb-8 sm:px-10 lg:px-16 lg:pt-10">
        {/* 2. Brutalist / Editorial Headline Header (Image 1) */}
        <header className="border-b border-[#201D1D]/15 pb-6 sm:pb-8">
          {/* Top metadata ticker */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-[#59524C]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
              <span>{servicesSectionCopy.eyebrow}</span>
              <span className="mx-2 text-[#201D1D]/30">/</span>
              <span className="hidden md:inline">{servicesSectionCopy.eyebrowSub}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold tracking-widest text-[#201D1D]">
                {servicesSectionCopy.catalogCode}
              </span>
              <span className="hidden font-mono text-[10px] text-[#59524C]/60 sm:inline">
                2026 EDITION
              </span>
            </div>
          </div>

          {/* Massive Display Title (Matching Image 1) */}
          <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h2
              id="services-main-heading"
              className="font-display text-[clamp(3.2rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[#201D1D]"
            >
              SERVICES
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-[#59524C] sm:text-base">
              {servicesSectionCopy.description}
            </p>
          </div>
        </header>

        {/* 3. Horizontal Gallery Strip (Images 2 & 3 + ScrollTrigger Horizontal) */}
        <div className="relative my-auto flex w-full flex-1 items-center overflow-hidden py-3">
          <div
            ref={trackRef}
            className="flex w-max flex-nowrap items-stretch gap-0 will-change-transform"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                total={services.length}
                onSelect={(title) => openDialog("services", title)}
              />
            ))}
          </div>
        </div>

        {/* 4. Bottom Controls & Hairline Progress Bar */}
        <footer className="flex items-center justify-between border-t border-[#201D1D]/15 pt-5">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#59524C]">
            <span className="text-[#201D1D] font-bold">
              0{activeCardIndex + 1}
            </span>
            <span>/</span>
            <span>0{services.length}</span>
            <span className="hidden text-[#201D1D]/40 sm:inline">·</span>
            <span className="hidden font-mono text-[11px] text-[#59524C] sm:inline">
              Scroll down to glide horizontally through disciplines
            </span>
          </div>

          {/* Hairline Progress Indicator */}
          <div className="mx-6 hidden h-[2px] flex-1 max-w-xs overflow-hidden bg-[#201D1D]/10 md:block">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left scale-x-0 bg-[#CB4B16] transition-transform duration-100 ease-out"
            />
          </div>

          {/* Navigation Arrows (Clicking advances vertical scroll) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollStep("prev")}
              aria-label="Previous service"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[#201D1D]/20 bg-transparent text-[#201D1D] transition-colors hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505]"
            >
              <ArrowLeftIcon width={16} height={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollStep("next")}
              aria-label="Next service"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[#201D1D]/20 bg-transparent text-[#201D1D] transition-colors hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505]"
            >
              <ArrowRightIcon width={16} height={16} />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}

/**
 * Individual Architectural Service Card
 *
 * Implements:
 * - Clean vertical grid column with border-r hairlines.
 * - Top index (01..06) in serif/display typography.
 * - Center title in bold uppercase.
 * - Bottom concise description + unboxed metadata tag.
 * - Full-bleed hover image reveal with smooth scale-105 zoom & dark gradient scrim (Image 3).
 */
function ServiceCard({
  service,
  index,
  total,
  onSelect,
}: {
  service: Service;
  index: number;
  total: number;
  onSelect: (title: string) => void;
}) {
  return (
    <article
      onClick={() => onSelect(service.title)}
      className="group relative flex h-[52vh] min-h-[420px] max-h-[580px] w-[300px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden border-r border-[#201D1D]/15 bg-[#F0EBE6] p-7 transition-colors duration-500 first:border-l sm:w-[360px] sm:p-8 md:w-[400px] lg:w-[440px]"
    >
      {/* Hover Background Image Layer (Smooth Reveal on Card Hover) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
      >
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 300px, 440px"
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        {/* Contrast Scrim / Tint to ensure foreground text is pristine and legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35" />
      </div>

      {/* Top Header: Index & Discipline Code */}
      <div className="relative z-10 flex items-start justify-between">
        <span className="font-serif text-5xl font-light tracking-tight text-[#201D1D] transition-colors duration-500 sm:text-6xl group-hover:text-white">
          {service.index}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#59524C] transition-colors duration-500 group-hover:text-[#CB4B16]">
          DISCIPLINE 0{index + 1}
        </span>
      </div>

      {/* Middle Section: Service Title & Subtitle */}
      <div className="relative z-10 my-auto py-4">
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#201D1D] transition-colors duration-500 sm:text-3xl group-hover:text-white">
          {service.title}
        </h3>
        <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-[#59524C] transition-colors duration-500 group-hover:text-[#CB4B16]">
          {service.subtitle}
        </p>
      </div>

      {/* Bottom Section: Concise Editorial Summary & Action */}
      <div className="relative z-10 border-t border-[#201D1D]/15 pt-5 transition-colors duration-500 group-hover:border-white/20">
        <p className="text-xs leading-relaxed text-[#59524C] transition-colors duration-500 sm:text-sm group-hover:text-white/90">
          {service.description}
        </p>

        {/* Unboxed Metadata Tag & Interactive Action */}
        <div className="mt-4 flex items-center justify-between font-mono text-[11px]">
          <span className="text-[#59524C] transition-colors duration-500 group-hover:text-white/70">
            {service.tag}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#CB4B16] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#CB4B16]">
            Scope ↗
          </span>
        </div>
      </div>
    </article>
  );
}
