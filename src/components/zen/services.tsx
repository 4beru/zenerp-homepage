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
 * Zen ERP — Creative Studio Services & Capabilities
 *
 * Implements the Splyt Awwwards GSAP Scroll Architecture:
 * - Unified Document Scroll Flow: Single timeline with pinSpacing: true.
 * - Full-Viewport Pinning: Section guarantees 100vh coverage, preventing subsequent
 *   sections from peeking or overlapping prematurely.
 * - Accurate Width Measurement: Travel distance is computed from track width minus
 *   visible slider width (track.scrollWidth - slider.clientWidth + padding), ensuring
 *   all 6 disciplines (01..06) fully traverse into view before unpinning.
 * - Single Unified Timeline: Both track movement and title parallax run in one timeline,
 *   preventing dual-trigger rendering glitches.
 */
export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const openDialog = useLeadDialog((s) => s.openDialog);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const slider = sliderRef.current;
    const track = trackRef.current;
    if (!section || !slider || !track) return;

    // Use gsap.context for complete cleanup and scoped timelines
    const ctx = gsap.context(() => {
      // Dynamic computation of scroll width based on slider viewport
      const getScrollAmount = () => {
        const visibleWidth = slider.clientWidth || window.innerWidth * 0.65;
        const totalWidth = track.scrollWidth;
        return Math.max(0, totalWidth - visibleWidth + 80);
      };

      // Single Unified Timeline for both horizontal track and title parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(getScrollAmount() * 1.5, 2000)}px`,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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

      // Track translation along horizontal axis
      tl.to(
        track,
        {
          x: () => -getScrollAmount(),
          ease: "power1.inOut",
        },
        0
      );

      // Subtle parallax on the title elements synced with the same scroll
      tl.to(
        ".service-title-part-1",
        {
          xPercent: -12,
          ease: "power1.inOut",
        },
        0
      )
        .to(
          ".service-title-badge",
          {
            xPercent: -8,
            rotate: -3,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".service-title-part-2",
          {
            xPercent: -5,
            ease: "power1.inOut",
          },
          0
        );

      // Refresh on resize and layout settlement
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
        tl.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [reduced]);

  // Smooth scroll step helper for arrow buttons
  const handleScrollStep = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const step = Math.max(400, Math.round(track.scrollWidth / services.length));
    window.scrollBy({
      top: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="servicios"
      aria-labelledby="services-heading"
      className="services-section relative flex h-screen min-h-screen w-full flex-col justify-between overflow-hidden bg-[#F0EBE6] text-[#201D1D]"
    >
      {/* 1. Architectural Transition Boundary (Dark Hero to Warm Light Scene) */}
      <div className="w-full flex-none border-b border-[#201D1D]/15 bg-[#050505] px-6 py-3.5 text-[#839496] sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
            <span>SCENE 02 // CAPABILITIES &amp; DISCIPLINES</span>
          </div>
          <span className="hidden sm:inline">WARM EDITORIAL CANVAS // #F0EBE6</span>
        </div>
      </div>

      {/* 2. Main Pinned Stage (Covers Full Available Height) */}
      <div className="relative mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-between px-6 pt-5 pb-6 sm:px-10 lg:px-16 lg:pt-6">
        
        {/* Top Header & Metadata */}
        <div className="flex flex-none items-center justify-between border-b border-[#201D1D]/15 pb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#59524C]">
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

        {/* Center Arena: Split Layout (Left Editorial Title + Right Sliding Track) */}
        <div className="relative my-auto flex w-full flex-1 flex-col justify-center gap-6 overflow-hidden py-2 lg:flex-row lg:items-center lg:gap-12">
          
          {/* Left Column: Bold Display Title (Splyt Awwwards Style) */}
          <div className="flex-none lg:w-[32%] xl:w-[30%]">
            <div className="service-title-part-1 overflow-hidden">
              <h2
                id="services-heading"
                className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-[#201D1D]"
              >
                WE ENGINEER
              </h2>
            </div>

            {/* Tilted Terracotta Badge (Image Reference) */}
            <div className="service-title-badge my-2.5 inline-block rotate-[-2deg] border border-[#201D1D]/20 bg-[#CB4B16] px-4 py-1.5 shadow-sm transition-transform">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#050505] sm:text-sm">
                06 CORE DISCIPLINES
              </span>
            </div>

            <div className="service-title-part-2 overflow-hidden">
              <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-[#201D1D]">
                CALM SYSTEMS
              </h2>
            </div>

            <p className="mt-3.5 max-w-sm text-xs leading-relaxed text-[#59524C] sm:text-sm">
              {servicesSectionCopy.description}
            </p>

            <div className="mt-4 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-[#59524C]/70 lg:flex">
              <span className="h-1 w-1 rounded-full bg-[#CB4B16]" />
              <span>Scroll down to glide horizontally</span>
            </div>
          </div>

          {/* Right Column: Sliding Horizontal Track */}
          <div
            ref={sliderRef}
            className="flex-1 overflow-hidden"
          >
            <div
              ref={trackRef}
              className="flex w-max flex-nowrap items-stretch gap-6 will-change-transform sm:gap-8 lg:gap-10"
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  total={services.length}
                  isActive={index === activeCardIndex}
                  onSelect={(title) => openDialog("services", title)}
                />
              ))}
            </div>
          </div>

        </div>

        {/* 3. Bottom Controls & Progress Bar */}
        <footer className="flex flex-none items-center justify-between border-t border-[#201D1D]/15 pt-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#59524C]">
            <span className="text-[#201D1D] font-bold">
              0{activeCardIndex + 1}
            </span>
            <span>/</span>
            <span>0{services.length}</span>
            <span className="hidden text-[#201D1D]/40 sm:inline">·</span>
            <span className="hidden font-mono text-[11px] text-[#59524C] sm:inline">
              Integrated document scroll navigation
            </span>
          </div>

          {/* Hairline Progress Indicator */}
          <div className="mx-6 hidden h-[2px] flex-1 max-w-xs overflow-hidden bg-[#201D1D]/10 md:block">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left scale-x-0 bg-[#CB4B16] transition-transform duration-100 ease-out"
            />
          </div>

          {/* Navigation Arrows for Accessibility */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScrollStep("prev")}
              disabled={activeCardIndex === 0}
              aria-label="Previous service"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-[#201D1D]/20 bg-transparent text-[#201D1D] transition-colors hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeftIcon width={15} height={15} />
            </button>
            <button
              type="button"
              onClick={() => handleScrollStep("next")}
              disabled={activeCardIndex === services.length - 1}
              aria-label="Next service"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-[#201D1D]/20 bg-transparent text-[#201D1D] transition-colors hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRightIcon width={15} height={15} />
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
 * - Rounded-2xl architectural card frame with warm off-white canvas.
 * - Top index (01..06) in high-contrast serif/display font.
 * - Bold uppercase capability title.
 * - Full-bleed hover photographic image reveal with smooth scale-105 zoom & dark gradient scrim.
 * - Bottom concise editorial copy + unboxed metadata tag.
 */
function ServiceCard({
  service,
  index,
  total,
  isActive,
  onSelect,
}: {
  service: Service;
  index: number;
  total: number;
  isActive: boolean;
  onSelect: (title: string) => void;
}) {
  return (
    <article
      onClick={() => onSelect(service.title)}
      className="group relative flex h-[48vh] min-h-[360px] max-h-[480px] w-[280px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-[#201D1D]/15 bg-[#E8E1D9] p-6 shadow-sm transition-all duration-500 sm:w-[320px] sm:p-7 md:w-[350px] lg:w-[380px]"
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
          sizes="(max-width: 768px) 280px, 380px"
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        {/* Contrast Scrim / Tint to ensure foreground text is pristine and legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35" />
      </div>

      {/* Top Header: Index & Discipline Code */}
      <div className="relative z-10 flex items-start justify-between">
        <span className="font-serif text-4xl font-light tracking-tight text-[#201D1D] transition-colors duration-500 sm:text-5xl group-hover:text-white">
          {service.index}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#59524C] transition-colors duration-500 group-hover:text-[#CB4B16]">
          DISCIPLINE 0{index + 1}
        </span>
      </div>

      {/* Middle Section: Service Title & Subtitle */}
      <div className="relative z-10 my-auto py-2">
        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#201D1D] transition-colors duration-500 sm:text-2xl group-hover:text-white">
          {service.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#59524C] transition-colors duration-500 group-hover:text-[#CB4B16]">
          {service.subtitle}
        </p>
      </div>

      {/* Bottom Section: Concise Editorial Summary & Action */}
      <div className="relative z-10 border-t border-[#201D1D]/15 pt-3.5 transition-colors duration-500 group-hover:border-white/20">
        <p className="text-xs leading-relaxed text-[#59524C] transition-colors duration-500 group-hover:text-white/90">
          {service.description}
        </p>

        {/* Unboxed Metadata Tag & Interactive Action */}
        <div className="mt-3 flex items-center justify-between font-mono text-[11px]">
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
