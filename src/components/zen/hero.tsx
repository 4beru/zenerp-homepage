"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { useLocaleStore } from "@/lib/store/locale-store";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { heroContent } from "@/data/hero-content";
import { HeroVisualField } from "@/components/zen/hero-visual-field";
import { ArrowRightIcon } from "@/components/zen/icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Zen ERP — Creative Software Studio Opening Scene
 * Section 1–40 of ZEN-ERP-HERO/DESIGN.md
 *
 * Implements:
 * - Asymmetric editorial composition with oversized typography
 * - Data-driven bilingual architecture (EN / ES)
 * - GSAP-choreographed line-mask entrance sequence
 * - GSAP ScrollTrigger subtle exit choreography
 * - Reserved spatial visual field for future particle logo system
 * - Clean tactile editorial CTA interactions
 * - Zero generic AI-slop (no pill containers, no purple blobs, no fake stats)
 * - Full prefers-reduced-motion compliance
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const visualFieldRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const openDialog = useLeadDialog((s) => s.openDialog);
  const locale = useLocaleStore((s) => s.locale);
  const content = heroContent[locale] || heroContent.en;
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Reduced motion: skip animation, keep elements at full opacity
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
        { opacity: 1, y: 0, clearProps: "all" }
      );
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance timeline (T+0.00 to T+1.20)
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // Initial states
      gsap.set(".hero-eyebrow", { opacity: 0, y: -12 });
      gsap.set(".hero-line-inner", { yPercent: 110, opacity: 0 });
      gsap.set(".hero-desc", { opacity: 0, y: 18 });
      gsap.set(".hero-actions", { opacity: 0, y: 16 });
      gsap.set(".hero-signature", { opacity: 0, x: -16 });
      gsap.set(".hero-visual-mount", { opacity: 0, scale: 0.94 });
      gsap.set([".hero-scroll-cue", ".hero-context-label"], { opacity: 0, y: 10 });

      // Orchestrated sequence
      tl.to(".hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.15,
      })
        .to(
          ".hero-line-inner",
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.55"
        )
        .to(
          ".hero-desc",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          "-=0.65"
        )
        .to(
          ".hero-actions",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .to(
          ".hero-visual-mount",
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.75"
        )
        .to(
          [".hero-signature", ".hero-scroll-cue", ".hero-context-label"],
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            stagger: 0.08,
          },
          "-=0.5"
        );

      // 2. Scroll-linked exit parallax (ScrollTrigger)
      if (leftColRef.current && visualFieldRef.current) {
        gsap.to(leftColRef.current, {
          yPercent: -12,
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        gsap.to(visualFieldRef.current, {
          yPercent: 10,
          scale: 0.96,
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced, locale]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Zen ERP Opening Scene"
      className="relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-8 sm:pt-28 md:pt-32"
    >
      {/* Restrained architectural background grid lines */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 select-none">
        <div className="absolute top-0 right-[46%] bottom-0 hidden w-px bg-gradient-to-b from-transparent via-[#EEE8D5]/[0.05] to-transparent lg:block" />
        <div className="absolute top-[28%] right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#EEE8D5]/[0.04] to-transparent" />
        <div className="absolute right-0 bottom-[14%] left-0 h-px bg-gradient-to-r from-transparent via-[#EEE8D5]/[0.04] to-transparent" />
      </div>

      {/* Main Asymmetric Grid Body */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1480px] flex-1 items-center gap-8 px-6 sm:px-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14 xl:px-16">
        
        {/* Left Editorial Mass: Eyebrow, Oversized Headline, Description, CTAs, Signature */}
        <div ref={leftColRef} className="flex flex-col justify-center py-6 sm:py-10">
          
          {/* Eyebrow / Studio Role */}
          <div className="hero-eyebrow flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-[#CB4B16]" />
            <span className="font-mono text-xs tracking-[0.22em] text-[#839496] uppercase">
              {content.studioLabel}
            </span>
            <span className="hidden font-mono text-xs text-[#839496]/50 sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="hidden font-mono text-xs tracking-wider text-[#839496]/70 sm:inline">
              {content.studioRole}
            </span>
          </div>

          {/* Oversized Editorial Headline (Masked Line Reveal) */}
          <h1
            ref={headlineRef}
            className="mt-6 flex flex-col font-display font-bold tracking-[-0.04em] text-[#EEE8D5] uppercase select-none text-[clamp(2.75rem,7.2vw,8.5rem)] leading-[0.88]"
          >
            {content.headline.map((line, idx) => (
              <span
                key={`${locale}-${idx}`}
                className="block overflow-hidden py-1"
                aria-hidden="true"
              >
                <span className="hero-line-inner block will-change-transform">
                  {line}
                </span>
              </span>
            ))}
            <span className="sr-only">
              {content.headline.join(" ")}
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="hero-desc mt-8 max-w-xl text-base leading-relaxed text-[#839496] sm:text-lg sm:leading-relaxed">
            {content.description}
          </p>

          {/* Editorial CTAs (Single-Line, Tactile Directional Hover) */}
          <div className="hero-actions mt-9 flex flex-wrap items-center gap-6 sm:gap-8">
            <button
              type="button"
              onClick={() => openDialog("hero-primary")}
              className="group relative inline-flex cursor-pointer items-center gap-3 border border-[#EEE8D5]/20 bg-[#EEE8D5] px-7 py-3.5 text-sm font-semibold tracking-wider text-[#050505] uppercase transition-all duration-300 hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505]"
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
              className="group relative inline-flex items-center gap-2 py-2 text-sm font-medium tracking-wider text-[#EEE8D5]/80 uppercase transition-colors duration-200 hover:text-[#EEE8D5]"
            >
              <span>{content.secondaryCta.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#CB4B16] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Brand Signature / Studio Identity (Section 1 & 14) */}
          <div className="hero-signature mt-14 flex items-center gap-4 border-t border-[#EEE8D5]/[0.08] pt-6 sm:mt-16">
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-widest text-[#EEE8D5] uppercase">
                {content.signature.brand}
              </span>
              <span className="font-mono text-xs tracking-wider text-[#839496]">
                {content.signature.tagline}
              </span>
            </div>
            <div className="hidden h-6 w-px bg-[#EEE8D5]/10 sm:block" />
            <span className="hidden font-mono text-[11px] tracking-wider text-[#839496]/60 sm:inline">
              {content.signature.coordinates}
            </span>
          </div>
        </div>

        {/* Right Visual Field: Reserved 40–50% Width For Future Particle Logo */}
        <div
          ref={visualFieldRef}
          className="hero-visual-mount relative flex items-center justify-center py-6 lg:justify-end"
        >
          <HeroVisualField fieldNotice={content.fieldNotice} />
        </div>
      </div>

      {/* Atmospheric Bottom Scene Bar (Lugano-inspired contextual labels & scroll cue) */}
      <div
        ref={footerRef}
        className="relative z-10 mx-auto mt-4 flex w-full max-w-[1480px] items-center justify-between border-t border-[#EEE8D5]/[0.06] px-6 pt-5 text-xs text-[#839496] select-none sm:px-10 xl:px-16"
      >
        {/* Contextual Label 01 */}
        <span className="hero-context-label font-mono text-[11px] tracking-widest text-[#839496]/70 uppercase">
          {content.contextualLabels.arch}
        </span>

        {/* Contextual Label 02 (Center) */}
        <span className="hero-context-label hidden font-mono text-[11px] tracking-widest text-[#839496]/50 uppercase md:inline">
          {content.contextualLabels.eng}
        </span>

        {/* Contextual Label 03 / Scroll Cue */}
        <div className="flex items-center gap-6">
          <span className="hero-context-label hidden font-mono text-[11px] tracking-widest text-[#839496]/50 uppercase lg:inline">
            {content.contextualLabels.systems}
          </span>
          <a
            href="#servicios"
            aria-label="Scroll to explore"
            className="hero-scroll-cue group flex items-center gap-2 font-mono text-[11px] tracking-widest text-[#EEE8D5]/80 uppercase transition-colors hover:text-[#CB4B16]"
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
