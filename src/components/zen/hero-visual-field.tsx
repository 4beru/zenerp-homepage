"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface HeroVisualFieldProps {
  children?: React.ReactNode;
  fieldNotice?: {
    title: string;
    status: string;
  };
}

/**
 * HeroVisualField — Section 15 & Section 38 of DESIGN.md
 *
 * Reserves 40-50% desktop width as an intentional spatial visual field
 * for the future Zen ERP particle logo system.
 *
 * Implements:
 * - Isolated stacking context & clean DOM mount point (`data-particle-mount`)
 * - Architectural hairline framing (crosshairs, dimensional boundary ticks)
 * - Restrained pointer parallax interaction with physics inertia
 * - Zero AI-slop (no gradient blobs, no fake particles, no stock cards)
 */
export function HeroVisualField({ children, fieldNotice }: HeroVisualFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized offset from center: -1 to 1
      targetX = (e.clientX / innerWidth - 0.5) * 18;
      targetY = (e.clientY / innerHeight - 0.5) * 18;
    };

    const animate = () => {
      // Smooth linear interpolation (lerp) for subtle physical inertia
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setMousePos({
        x: Math.round(currentX * 100) / 100,
        y: Math.round(currentY * 100) / 100,
      });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[380px] w-full items-center justify-center sm:min-h-[460px] lg:min-h-[580px]"
      aria-hidden="true"
    >
      {/* Outer spatial field bounds with subtle hairline architectural framing */}
      <div
        style={{
          transform: reduced
            ? "none"
            : `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          transition: reduced ? "none" : "transform 0.05s linear",
        }}
        className="relative flex h-[340px] w-[340px] items-center justify-center sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px]"
      >
        {/* Corner architectural crosshair marks (+) */}
        <span className="pointer-events-none absolute -top-3 -left-3 font-mono text-xs text-[#839496]/40 select-none">
          +
        </span>
        <span className="pointer-events-none absolute -top-3 -right-3 font-mono text-xs text-[#839496]/40 select-none">
          +
        </span>
        <span className="pointer-events-none absolute -bottom-3 -left-3 font-mono text-xs text-[#839496]/40 select-none">
          +
        </span>
        <span className="pointer-events-none absolute -bottom-3 -right-3 font-mono text-xs text-[#839496]/40 select-none">
          +
        </span>

        {/* Subtle hairline framing lines (restrained spatial guide) */}
        <div className="pointer-events-none absolute inset-0 border border-[#EEE8D5]/[0.06]" />

        {/* Precision coordinate ticks along boundary */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-1 w-px -translate-x-1/2 bg-[#EEE8D5]/20" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-1 w-px -translate-x-1/2 bg-[#EEE8D5]/20" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-px w-1 -translate-y-1/2 bg-[#EEE8D5]/20" />
        <div className="pointer-events-none absolute top-1/2 right-0 h-px w-1 -translate-y-1/2 bg-[#EEE8D5]/20" />

        {/* Ambient concentric spatial orbits (hairline thin, deep dark contrast) */}
        <div className="pointer-events-none absolute h-[78%] w-[78%] rounded-full border border-[#EEE8D5]/[0.035]" />
        <div className="pointer-events-none absolute h-[52%] w-[52%] rounded-full border border-[#CB4B16]/[0.08]" />

        {/* Clean DOM Mount Point for Future Particle System */}
        <div
          id="particle-logo-mount"
          data-particle-mount="true"
          className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden"
        >
          {children ? (
            children
          ) : (
            /* Quiet, intentional negative space state */
            <div className="flex flex-col items-center justify-center p-6 text-center select-none">
              {/* Central understated geometric marker */}
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
                <div className="absolute inset-0 rotate-45 border border-[#CB4B16]/30 transition-transform duration-700 hover:rotate-90" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#CB4B16]" />
              </div>

              {/* Architectural metadata label */}
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#EEE8D5]/40 uppercase">
                {fieldNotice?.title ?? "PARTICLE LOGO FIELD"}
              </p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-[#839496]/50">
                {fieldNotice?.status ?? "RESERVED SPATIAL FIELD"}
              </p>
            </div>
          )}
        </div>

        {/* Ambient bottom technical telemetry (clean unboxed metadata) */}
        <div className="pointer-events-none absolute -bottom-7 flex w-full items-center justify-between px-1 font-mono text-[9px] tracking-wider text-[#839496]/40 select-none">
          <span>POS: [58.38°W · 34.60°S]</span>
          <span>FIELD_ID: VF-01</span>
        </div>
      </div>
    </div>
  );
}
