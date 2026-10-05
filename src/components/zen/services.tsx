"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { services, servicesSectionCopy, type Service } from "@/data/services";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/zen/icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

/**
 * Creative Studio Services & Capabilities
 *
 * Implements:
 * - Controlled Step-by-Step Scroll Carousel via GSAP Observer:
 *   When the user enters Services, scrolling down does NOT immediately jump to Works.
 *   First, each scroll gesture navigates sequentially through internal service cards (01 -> 02 -> ... -> 06).
 *   Only after reaching the last card (06) does the subsequent scroll transition to the next section (#works).
 *   Conversely, scrolling up from 06 moves back to 01, and only then transitions back up to Hero.
 * - Architectural Cards & Hover Reveal: Minimalist numbers (01..06) + uppercase titles, revealing
 *   rich photographic imagery and high-contrast typography on hover.
 */
export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const openDialog = useLeadDialog((s) => s.openDialog);
  const reduced = usePrefersReducedMotion();

  // Internal reference for card navigation from buttons/keyboard
  const goToCardRef = useRef<(index: number) => void>(() => {});

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let currentIndex = 0;
    let isAnimating = false;

    const getMaxScroll = () => {
      const containerWidth = container.clientWidth || window.innerWidth;
      return Math.max(0, track.scrollWidth - containerWidth + 60);
    };

    const goToCard = (index: number) => {
      if (isAnimating) return;
      const targetIndex = Math.max(0, Math.min(services.length - 1, index));
      if (targetIndex === currentIndex && index === currentIndex) return;

      isAnimating = true;
      currentIndex = targetIndex;
      setActiveCardIndex(targetIndex);

      const maxScroll = getMaxScroll();
      const step = maxScroll / (services.length - 1);
      const targetX = targetIndex * step;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${
          targetIndex / (services.length - 1)
        })`;
      }

      gsap.to(track, {
        x: -targetX,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          setTimeout(() => {
            isAnimating = false;
          }, 80);
        },
      });
    };

    goToCardRef.current = goToCard;

    // GSAP Observer: Captures vertical scroll intent to drive internal carousel steps
    const observer = Observer.create({
      target: container,
      type: "wheel,touch",
      wheelSpeed: -1,
      tolerance: 15,
      preventDefault: true,
      onDown: () => {
        // Scroll Down intent: move to next internal card
        if (isAnimating) return;

        const rect = container.getBoundingClientRect();
        // If the top of services is not yet aligned to the top of screen, dock it first
        if (rect.top > 30) {
          container.scrollIntoView({ behavior: "smooth" });
          return;
        }

        if (currentIndex < services.length - 1) {
          goToCard(currentIndex + 1);
        } else {
          // At the last card: allow scroll down to the next section (Selected Works)
          observer.disable();
          const nextSection = document.getElementById("works");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
          }
          setTimeout(() => {
            observer.enable();
          }, 1000);
        }
      },
      onUp: () => {
        // Scroll Up intent: move to previous internal card
        if (isAnimating) return;

        const rect = container.getBoundingClientRect();
        if (rect.bottom < window.innerHeight - 30) {
          container.scrollIntoView({ behavior: "smooth" });
          return;
        }

        if (currentIndex > 0) {
          goToCard(currentIndex - 1);
        } else {
          // At the first card: allow scroll up to previous section (Hero)
          observer.disable();
          const heroSection = document.getElementById("inicio");
          if (heroSection) {
            heroSection.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollBy({ top: -window.innerHeight * 0.85, behavior: "smooth" });
          }
          setTimeout(() => {
            observer.enable();
          }, 1000);
        }
      },
    });

    // Reset when scrolling away so re-entering works cleanly
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        currentIndex = 0;
        setActiveCardIndex(0);
        gsap.set(track, { x: 0 });
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = "scaleX(0)";
        }
      }
      if (rect.bottom < 0) {
        currentIndex = services.length - 1;
        setActiveCardIndex(services.length - 1);
        const maxScroll = getMaxScroll();
        gsap.set(track, { x: -maxScroll });
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = "scaleX(1)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.kill();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reduced]);

  const handlePrev = useCallback(() => {
    goToCardRef.current(activeCardIndex - 1);
  }, [activeCardIndex]);

  const handleNext = useCallback(() => {
    goToCardRef.current(activeCardIndex + 1);
  }, [activeCardIndex]);

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

      {/* Main Services Container */}
      <div className="relative mx-auto flex h-[calc(100vh-45px)] min-h-[620px] flex-col justify-between px-6 pt-6 pb-6 sm:px-10 lg:px-16 lg:pt-8">
        {/* 2. Brutalist / Editorial Headline Header (Image 1) */}
        <header className="border-b border-[#201D1D]/15 pb-5 sm:pb-6">
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
              className="font-display text-[clamp(2.8rem,7.5vw,6.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[#201D1D]"
            >
              SERVICES
            </h2>

            <p className="max-w-md text-xs leading-relaxed text-[#59524C] sm:text-sm">
              {servicesSectionCopy.description}
            </p>
          </div>
        </header>

        {/* 3. Horizontal Gallery Strip (Images 2 & 3 + Controlled Step-by-Step Carousel) */}
        <div className="relative my-auto flex w-full flex-1 items-center overflow-hidden py-2">
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
                isActive={index === activeCardIndex}
                onSelect={(title) => openDialog("services", title)}
              />
            ))}
          </div>
        </div>

        {/* 4. Bottom Controls & Hairline Progress Bar */}
        <footer className="flex items-center justify-between border-t border-[#201D1D]/15 pt-4">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#59524C]">
            <span className="text-[#201D1D] font-bold">
              0{activeCardIndex + 1}
            </span>
            <span>/</span>
            <span>0{services.length}</span>
            <span className="hidden text-[#201D1D]/40 sm:inline">·</span>
            <span className="hidden font-mono text-[11px] text-[#59524C] sm:inline">
              Scroll moves through internal services before advancing section
            </span>
          </div>

          {/* Hairline Progress Indicator */}
          <div className="mx-6 hidden h-[2px] flex-1 max-w-xs overflow-hidden bg-[#201D1D]/10 md:block">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left scale-x-0 bg-[#CB4B16] transition-transform duration-300 ease-out"
            />
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeCardIndex === 0}
              aria-label="Previous service"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[#201D1D]/20 bg-transparent text-[#201D1D] transition-colors hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeftIcon width={16} height={16} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeCardIndex === services.length - 1}
              aria-label="Next service"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[#201D1D]/20 bg-transparent text-[#201D1D] transition-colors hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505] disabled:cursor-not-allowed disabled:opacity-30"
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
      className="group relative flex h-[50vh] min-h-[380px] max-h-[520px] w-[290px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden border-r border-[#201D1D]/15 bg-[#F0EBE6] p-6 transition-colors duration-500 first:border-l sm:w-[340px] sm:p-7 md:w-[380px] lg:w-[420px]"
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
          sizes="(max-width: 768px) 290px, 420px"
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
      <div className="relative z-10 my-auto py-3">
        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#201D1D] transition-colors duration-500 sm:text-2xl md:text-3xl group-hover:text-white">
          {service.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#59524C] transition-colors duration-500 group-hover:text-[#CB4B16]">
          {service.subtitle}
        </p>
      </div>

      {/* Bottom Section: Concise Editorial Summary & Action */}
      <div className="relative z-10 border-t border-[#201D1D]/15 pt-4 transition-colors duration-500 group-hover:border-white/20">
        <p className="text-xs leading-relaxed text-[#59524C] transition-colors duration-500 group-hover:text-white/90">
          {service.description}
        </p>

        {/* Unboxed Metadata Tag & Interactive Action */}
        <div className="mt-3.5 flex items-center justify-between font-mono text-[11px]">
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
