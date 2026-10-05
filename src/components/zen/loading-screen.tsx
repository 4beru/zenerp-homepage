"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Lightweight, zero-blocking entrance transition.
 *
 * - Non-blocking: Driven natively by CSS GPU keyframes, completing in 0.85s.
 * - Zero-trap: pointer-events: none is enforced from frame 0 so the user can never be locked out.
 * - Under prefers-reduced-motion, it hides immediately (0ms).
 */
export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reduced) {
      container.style.display = "none";
      return;
    }

    // Failsafe auto-unmount after 900ms
    const timer = setTimeout(() => {
      if (container) {
        container.style.display = "none";
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [reduced]);

  const handleDismiss = () => {
    if (containerRef.current) {
      containerRef.current.style.display = "none";
    }
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      onClick={handleDismiss}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#050505] p-6 text-[#EEE8D5] sm:p-12"
      style={{
        pointerEvents: "none",
        animation: "zenLoaderExit 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[#839496]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[#CB4B16]" />
          <span>ZEN ERP · STUDIO</span>
        </div>
        <span>BUENOS AIRES · GLOBAL</span>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-[#EEE8D5] sm:text-6xl">
          ZEN ERP
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[#839496]">
          Calm software, built to your measure.
        </p>

        {/* Hairline progress bar driven by CSS */}
        <div className="mt-8 h-[2px] w-48 overflow-hidden bg-[#EEE8D5]/10 sm:w-64">
          <div
            className="h-full w-full origin-left bg-[#CB4B16]"
            style={{
              animation: "zenLoaderLine 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
        </div>

        <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#839496]/50">
          ENTER SITE
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#839496]/40">
        <span>ARCHITECTURAL SYSTEMS</span>
        <span>VER. 2026</span>
      </div>
    </div>
  );
}
