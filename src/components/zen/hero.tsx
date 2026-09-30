"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { useLocaleStore } from "@/lib/store/locale-store";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { heroContent } from "@/data/hero-content";
import { HeroVisual } from "@/components/effects/HeroVisual";
import { ArrowRightIcon } from "@/components/zen/icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Zen ERP — Creative Software Studio Opening Scene
 * Canvas 2D Morph Reveal Visual Integration
 *
 * Implements:
 * - 3-Line editorial headline spanning across the viewport as the dominant focal point
 * - Dedicated Canvas 2D dual-layer organic morph visual behind the headline
 * - Layered spatial depth: Text in front (z-10), visual behind (z-0), CTAs in front (z-20)
 * - Hero section captures pointer movement and dispatches coordinates to Canvas 2D logic
 * - GSAP-choreographed line-mask entrance sequence & desktop ScrollTrigger parallax
 * - Full prefers-reduced-motion & bilingual EN / ES support
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const visualMountRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const openDialog = useLeadDialog((s) => s.openDialog);
  const locale = useLocaleStore((s) => s.locale);
  const content = heroContent[locale] || heroContent.en;
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Reduced motion: bypass animations, lock final layout immediately
    if (reduced) {
      gsap.set(
        [
          ".hero-eyebrow",
          ".hero-line-inner",
          ".hero-desc",
          ".hero-actions",
          ".hero-signature",
          ".hero-visual-mount",
          ".hero-scroll-cue",
          ".hero-context-label",
        ],
        { opacity: 1, y: 0, scale: 1, clearProps: "all" }
      );
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // Initial clean states
      gsap.set(".hero-eyebrow", { opacity: 0, y: -10 });
      gsap.set(".hero-line-inner", { yPercent: 105, opacity: 0 });
      gsap.set(".hero-desc", { opacity: 0, y: 16 });
      gsap.set(".hero-actions", { opacity: 0, y: 14 });
      gsap.set(".hero-signature", { opacity: 0, y: 10 });
      gsap.set(".hero-visual-mount", { opacity: 0, scale: 0.96 });
      gsap.set([".hero-scroll-cue", ".hero-context-label"], { opacity: 0, y: 8 });

      // Orchestrated sequence with editorial rhythm
      tl.to(".hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.1,
      })
        .to(
          ".hero-line-inner",
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.11,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .to(
          ".hero-visual-mount",
          {
            opacity: 1,
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".hero-desc",
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
          },
          "-=0.65"
        )
        .to(
          ".hero-actions",
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
          },
          "-=0.55"
        )
        .to(
          [".hero-signature", ".hero-scroll-cue", ".hero-context-label"],
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
          },
          "-=0.45"
        );

      // 2. Responsive ScrollTrigger Parallax (desktop-focused to preserve touch scrolling)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (mainContentRef.current && visualMountRef.current) {
          gsap.to(mainContentRef.current, {
            yPercent: -8,
            opacity: 0.88,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });

          gsap.to(visualMountRef.current, {
            yPercent: 10,
            scale: 0.96,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced, locale]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Zen ERP Opening Scene"
      className="relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#050505] isolate pt-24 pb-6 sm:pt-28 md:pt-32"
    >
      {/* Restrained architectural background grid lines */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 select-none">
        <div className="absolute top-0 right-[35%] bottom-0 hidden w-px bg-gradient-to-b from-transparent via-[#EEE8D5]/[0.04] to-transparent lg:block" />
        <div className="absolute top-[28%] right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#EEE8D5]/[0.035] to-transparent" />
        <div className="absolute right-0 bottom-[14%] left-0 h-px bg-gradient-to-r from-transparent via-[#EEE8D5]/[0.035] to-transparent" />
      </div>

      {/* Decorative Visual Mount — Orbit-inspired Canvas 2D Morph Reveal Behind Headline */}
      <div
        ref={visualMountRef}
        className="hero-visual-mount pointer-events-none absolute right-[-8%] top-[40%] z-0 -translate-y-1/2 opacity-100 transition-opacity duration-700 select-none sm:right-[-2%] sm:top-[42%] md:right-[2%] lg:right-[5%] lg:top-[40%] xl:right-[8%]"
      >
        <HeroVisual containerRef={sectionRef} />
      </div>

      {/* Main Foreground Content: Title spans across the full width with visual visible underneath */}
      <div
        ref={mainContentRef}
        className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-center px-5 sm:px-10 xl:px-16"
      >
        {/* Studio Eyebrow / Role */}
        <div className="hero-eyebrow flex items-center gap-2.5 sm:gap-3">
          <span className="h-1.5 w-1.5 rounded-none bg-[#CB4B16]" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#839496] uppercase sm:text-xs">
            {content.studioLabel}
          </span>
          <span className="hidden font-mono text-xs text-[#839496]/50 sm:inline" aria-hidden="true">
            ·
          </span>
          <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
            {content.studioRole}
          </span>
        </div>

        {/* 3-Line Oversized Headline: Dominant visual element in front of the decorative visual */}
        <h1
          ref={headlineRef}
          className="mt-5 flex flex-col font-display font-bold tracking-[-0.035em] text-[#EEE8D5] uppercase select-none pointer-events-none text-[clamp(1.95rem,7.5vw,3.25rem)] leading-[0.9] sm:mt-6 sm:text-[clamp(3.2rem,7.8vw,5.5rem)] sm:leading-[0.88] lg:text-[clamp(5rem,8.2vw,9.25rem)]"
        >
          {content.headline.map((line, idx) => (
            <span
              key={`${locale}-${idx}`}
              className="block overflow-hidden py-0.5 sm:py-1 whitespace-nowrap"
              aria-hidden="true"
            >
              <span className="hero-line-inner block whitespace-nowrap will-change-transform">
                {line}
              </span>
            </span>
          ))}
          <span className="sr-only">
            {content.headline.join(" ")}
          </span>
        </h1>

        {/* Supporting Row: Description & CTAs (Left) + Studio Signature (Right) */}
        <div className="mt-7 flex flex-col justify-between gap-7 sm:mt-9 lg:mt-11 lg:flex-row lg:items-end">
          
          {/* Left: Description + Interactive CTAs */}
          <div className="max-w-2xl">
            <p className="hero-desc text-sm leading-relaxed text-[#839496] sm:text-base sm:leading-relaxed lg:text-lg">
              {content.description}
            </p>

            {/* Editorial CTAs (Explicitly z-20 pointer-events-auto for interactive protection) */}
            <div className="hero-actions relative z-20 mt-6 flex flex-wrap items-center gap-5 sm:mt-8 sm:gap-7 pointer-events-auto">
              <button
                type="button"
                onClick={() => openDialog("hero-primary")}
                className="group relative inline-flex cursor-pointer items-center gap-2.5 border border-[#EEE8D5]/20 bg-[#EEE8D5] px-6 py-3 text-xs font-semibold tracking-wider text-[#050505] uppercase transition-all duration-300 hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505] sm:px-7 sm:py-3.5 sm:text-sm"
              >
                <span>{content.primaryCta.label}</span>
                <ArrowRightIcon
                  width={15}
                  height={15}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </button>

              <a
                href={content.secondaryCta.href}
                className="group relative inline-flex items-center gap-2 py-2 text-xs font-medium tracking-wider text-[#EEE8D5]/80 uppercase transition-colors duration-200 hover:text-[#EEE8D5] sm:text-sm"
              >
                <span>{content.secondaryCta.label}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#CB4B16] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </div>

          {/* Right: Studio Identity Signature Lockup */}
          <div className="hero-signature border-t border-[#EEE8D5]/[0.08] pt-5 lg:border-t-0 lg:pt-0 lg:text-right">
            <span className="block font-display text-xs font-bold tracking-widest text-[#EEE8D5] uppercase sm:text-sm">
              {content.signature.brand}
            </span>
            <span className="block font-mono text-[11px] tracking-wider text-[#839496] sm:text-xs">
              {content.signature.tagline}
            </span>
            <span className="mt-0.5 block font-mono text-[10px] tracking-wider text-[#839496]/60 sm:text-[11px]">
              {content.signature.coordinates}
            </span>
          </div>
        </div>
      </div>

      {/* Atmospheric Bottom Scene Bar (Contextual labels & scroll cue) */}
      <div
        ref={footerRef}
        className="relative z-10 mx-auto mt-4 flex w-full max-w-[1480px] items-center justify-between border-t border-[#EEE8D5]/[0.06] px-5 pt-4 text-xs text-[#839496] select-none sm:px-10 sm:pt-5 xl:px-16"
      >
        {/* Contextual Label 01 */}
        <span className="hero-context-label font-mono text-[10px] tracking-widest text-[#839496]/70 uppercase sm:text-[11px]">
          {content.contextualLabels.arch}
        </span>

        {/* Contextual Label 02 (Center) */}
        <span className="hero-context-label hidden font-mono text-[11px] tracking-widest text-[#839496]/50 uppercase md:inline">
          {content.contextualLabels.eng}
        </span>

        {/* Contextual Label 03 / Scroll Cue */}
        <div className="flex items-center gap-5 sm:gap-6">
          <span className="hero-context-label hidden font-mono text-[11px] tracking-widest text-[#839496]/50 uppercase lg:inline">
            {content.contextualLabels.systems}
          </span>
          <a
            href="#servicios"
            aria-label="Scroll to explore"
            className="hero-scroll-cue relative z-20 group flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#EEE8D5]/80 uppercase transition-colors hover:text-[#CB4B16] sm:text-[11px] pointer-events-auto"
          >
            <span>{content.scrollCue}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
