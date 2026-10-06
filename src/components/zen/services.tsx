"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, servicesSectionCopy, type Service } from "@/data/services";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/zen/icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Zen ERP — Creative Studio Services & Preview Video Carousel
 *
 * Architecture & Mathematical Synchronization:
 * - Unified Document Scroll: Seamless pinning via GSAP ScrollTrigger.
 * - Center Focal Synchronization:
 *   As the user scrolls, each card's center coordinate is tracked relative to the
 *   viewport center C_target.
 *   Distance: d_k = |X_k - C_target|
 *   Normalized span: u_k = clamp(d_k / (W_card * 0.95), 0, 1)
 *   Constant-Power Hann Window: W_k = cos²(π * u_k / 2)
 *
 *   This ensures:
 *   1. W_out + W_in ≈ 1.0 during transitions between adjacent cards.
 *   2. Only the center card (W_k = max) actively streams its video.
 *   3. The outgoing video pauses smoothly while the incoming video starts playing,
 *      synchronized with opacity and scale transforms for zero stutter.
 */
export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const mounted = useIsMounted();
  const openDialog = useLeadDialog((s) => s.openDialog);
  const reduced = usePrefersReducedMotion();

  // Safe video playback controllers avoiding AbortError
  const playVideoSafe = useCallback((video: HTMLVideoElement) => {
    if (video.paused) {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Handled safely (autoplay policy or quick interruption)
        });
      }
    }
  }, []);

  const pauseVideoSafe = useCallback((video: HTMLVideoElement) => {
    if (!video.paused) {
      video.pause();
    }
  }, []);

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
        return Math.max(0, totalWidth - visibleWidth + 120);
      };

      // Mathematical video synchronization loop
      const syncVideosAndCards = () => {
        const sliderRect = slider.getBoundingClientRect();
        const targetCenterX = sliderRect.left + sliderRect.width * 0.45;

        let bestIndex = 0;
        let maxWeight = -1;

        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const cardRect = cardEl.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(cardCenterX - targetCenterX);
          const span = Math.max(cardRect.width * 0.95, 300);
          const u = Math.min(dist / span, 1.0);

          // Hann window / Cosine squared curve: continuous 1st derivative
          const weight = Math.cos((Math.PI * u) / 2) ** 2;

          if (weight > maxWeight) {
            maxWeight = weight;
            bestIndex = idx;
          }

          // Visual smooth interpolation on card element
          const videoEl = videoRefs.current[idx];
          if (videoEl) {
            // Smoothly cross-fade video opacity and subtle brightness
            videoEl.style.opacity = `${0.35 + 0.65 * weight}`;
            videoEl.style.filter = `brightness(${0.8 + 0.2 * weight}) contrast(${0.92 + 0.08 * weight})`;
          }

          // Subtle card scale & border highlight
          cardEl.style.transform = `scale(${0.96 + 0.06 * weight})`;
        });

        // Synchronize playback: play center, pause non-center
        videoRefs.current.forEach((videoEl, idx) => {
          if (!videoEl) return;
          if (idx === bestIndex && maxWeight > 0.3) {
            playVideoSafe(videoEl);
          } else {
            pauseVideoSafe(videoEl);
          }
        });

        setActiveCardIndex(bestIndex);
      };

      // Single Unified Timeline for horizontal scroll and title parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(getScrollAmount() * 1.6, 2200)}px`,
          scrub: 1.1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${progress})`;
            }
            syncVideosAndCards();
          },
        },
      });

      // Track translation along horizontal axis
      tl.to(
        track,
        {
          x: () => -getScrollAmount(),
          ease: "none",
        },
        0
      );

      // Subtle parallax on the title elements synced with the same scroll
      tl.to(
        ".service-title-part-1",
        {
          xPercent: -14,
          ease: "none",
        },
        0
      )
        .to(
          ".service-title-badge",
          {
            xPercent: -8,
            rotate: -3,
            ease: "none",
          },
          0
        )
        .to(
          ".service-title-part-2",
          {
            xPercent: -6,
            ease: "none",
          },
          0
        );

      // Initial synchronization pass after mount
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        syncVideosAndCards();
      }, 350);

      const handleResize = () => {
        ScrollTrigger.refresh();
        syncVideosAndCards();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timer);
        tl.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [reduced, playVideoSafe, pauseVideoSafe]);

  // Smooth step helper for arrow buttons
  const handleScrollStep = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const step = Math.max(450, Math.round(track.scrollWidth / services.length));
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
      <div className="w-full flex-none border-b border-[#201D1D]/15 bg-[#050505] px-6 py-3 text-[#839496] sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1520px] items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-[#CB4B16]" aria-hidden="true" />
            <span>SCENE 02 // CAPABILITIES &amp; DISCIPLINES</span>
          </div>
          <span className="hidden sm:inline">WARM EDITORIAL CANVAS // #F0EBE6</span>
        </div>
      </div>

      {/* 2. Main Pinned Stage (Covers Full Available Height) */}
      <div className="relative mx-auto flex w-full max-w-[1520px] flex-1 flex-col justify-between px-6 pt-4 pb-5 sm:px-10 lg:px-16 lg:pt-5">
        
        {/* Top Header & Metadata */}
        <div className="flex flex-none items-center justify-between border-b border-[#201D1D]/15 pb-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[#59524C]">
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
              LIVE PREVIEWS · 2026
            </span>
          </div>
        </div>

        {/* Center Arena: Split Layout (Left Editorial Title + Right Sliding Track) */}
        <div className="relative my-auto flex w-full flex-1 flex-col justify-center gap-6 overflow-hidden py-1 lg:flex-row lg:items-center lg:gap-10">
          
          {/* Left Column: Bold Display Title */}
          <div className="flex-none lg:w-[28%] xl:w-[26%]">
            <div className="service-title-part-1 overflow-hidden">
              <h2
                id="services-heading"
                className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-[#201D1D]"
              >
                WE ENGINEER
              </h2>
            </div>

            {/* Tilted Terracotta Badge */}
            <div className="service-title-badge my-2.5 inline-block rotate-[-2deg] border border-[#201D1D]/20 bg-[#CB4B16] px-3.5 py-1 shadow-sm transition-transform">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#050505]">
                06 CORE DISCIPLINES
              </span>
            </div>

            <div className="service-title-part-2 overflow-hidden">
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-[#201D1D]">
                CALM SYSTEMS
              </h2>
            </div>

            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#59524C] sm:text-sm">
              {servicesSectionCopy.description}
            </p>

            <div className="mt-4 hidden items-center gap-2.5 font-mono text-[11px] uppercase tracking-wider text-[#59524C]/80 lg:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#CB4B16]" />
              <span>Scroll down to glide &amp; sync previews</span>
            </div>
          </div>

          {/* Right Column: Sliding Horizontal Track with Center-Focus Video Synchronization */}
          <div
            ref={sliderRef}
            className="flex-1 overflow-hidden py-2"
          >
            <div
              ref={trackRef}
              className="flex w-max flex-nowrap items-stretch gap-6 will-change-transform sm:gap-8 lg:gap-10"
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  videoRef={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  service={service}
                  index={index}
                  isActive={index === activeCardIndex}
                  onSelect={(title) => openDialog("services", title)}
                />
              ))}
            </div>
          </div>

        </div>

        {/* 3. Bottom Controls & Progress Bar (Hydration-Safe) */}
        <footer className="flex flex-none items-center justify-between border-t border-[#201D1D]/15 pt-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#59524C]">
            <span className="font-bold text-[#201D1D]">
              0{activeCardIndex + 1}
            </span>
            <span>/</span>
            <span>0{services.length}</span>
            <span className="hidden text-[#201D1D]/40 sm:inline">·</span>
            <span className="hidden font-mono text-[11px] text-[#59524C] sm:inline">
              Center-focused video synchronization
            </span>
          </div>

          {/* Hairline Progress Indicator */}
          <div className="mx-6 hidden h-[2px] flex-1 max-w-xs overflow-hidden bg-[#201D1D]/10 md:block">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left scale-x-0 bg-[#CB4B16] transition-transform duration-100 ease-out"
            />
          </div>

          {/* Navigation Arrows for Accessibility (Hydration-Safe) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (activeCardIndex > 0) handleScrollStep("prev");
              }}
              aria-disabled={mounted ? activeCardIndex === 0 : false}
              aria-label="Previous service"
              className={`flex h-9 w-9 items-center justify-center rounded-sm border border-[#201D1D]/20 bg-transparent text-[#201D1D] transition-colors ${
                mounted && activeCardIndex === 0
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505]"
              }`}
            >
              <ArrowLeftIcon width={15} height={15} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (activeCardIndex < services.length - 1) handleScrollStep("next");
              }}
              aria-disabled={mounted ? activeCardIndex === services.length - 1 : false}
              aria-label="Next service"
              className={`flex h-9 w-9 items-center justify-center rounded-sm border border-[#201D1D]/20 bg-transparent text-[#201D1D] transition-colors ${
                mounted && activeCardIndex === services.length - 1
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505]"
              }`}
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
 * Individual Architectural Service Card with Prominent Video Preview
 */
function ServiceCard({
  service,
  index,
  isActive,
  onSelect,
  ref,
  videoRef,
}: {
  service: Service;
  index: number;
  isActive: boolean;
  onSelect: (title: string) => void;
  ref: (el: HTMLElement | null) => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  return (
    <article
      ref={ref}
      onClick={() => onSelect(service.title)}
      className={`group relative flex h-[54vh] min-h-[440px] max-h-[560px] w-[320px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border bg-[#E8E1D9] p-5 shadow-sm transition-all duration-300 sm:w-[380px] sm:p-6 md:w-[420px] lg:w-[450px] ${
        isActive
          ? "border-[#CB4B16]/80 shadow-md ring-1 ring-[#CB4B16]/30"
          : "border-[#201D1D]/15 opacity-90"
      }`}
    >
      {/* 1. Upper Video Preview Viewport */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-[#201D1D]/15 bg-[#141211]">
        {/* Native Poster Image Fallback (Guaranteed immediate rendering) */}
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 320px, 450px"
          className="object-cover object-center"
        />

        {/* Real HTML5 Preview Video (Autoplays only when in center focal view) */}
        <video
          ref={videoRef}
          src={service.video}
          poster={service.image}
          muted
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
        />

        {/* Video HUD Overlays */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/85 via-transparent to-black/60 p-3 text-white">
          {/* Top Bar: Play Status & Format Readout */}
          <div className="flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  isActive ? "animate-pulse bg-[#CB4B16]" : "bg-white/40"
                }`}
              />
              <span className="font-semibold text-white/90">
                {isActive ? "LIVE PREVIEW" : "STANDBY"}
              </span>
            </div>
            <span className="rounded bg-black/60 px-1.5 py-0.5 text-white/70">
              0{index + 1} &middot; 30FPS
            </span>
          </div>

          {/* Bottom Bar: Category / Tag metadata */}
          <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-white/80">
            <span>{service.categoryLabel}</span>
            <span className="text-[#CB4B16]">● MP4</span>
          </div>
        </div>
      </div>

      {/* 2. Middle Content: Title & Tag */}
      <div className="my-auto py-2">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#CB4B16]">
            DISCIPLINE 0{index + 1}
          </span>
          <span className="font-mono text-[10px] uppercase text-[#59524C]">
            {service.tag}
          </span>
        </div>

        <h3 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-[#201D1D] sm:text-2xl">
          {service.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#59524C]">
          {service.description}
        </p>
      </div>

      {/* 3. Bottom Action & Scope Trigger */}
      <div className="flex items-center justify-between border-t border-[#201D1D]/15 pt-3 font-mono text-xs">
        <span className="text-[11px] text-[#59524C]">
          {service.deliverables[0]}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-[#CB4B16] transition-transform duration-300 group-hover:translate-x-1">
          Explore scope ↗
        </span>
      </div>
    </article>
  );
}
