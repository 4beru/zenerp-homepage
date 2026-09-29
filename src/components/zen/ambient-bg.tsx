"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Fondo ambient del hero: motas de luz coral muy tenues flotando lento,
 * sobre dos blobs difuminados que "respiran" con CSS puro.
 * - Canvas a ~24fps (batería amable en gama media), solo 1x1 devicePixelRatio.
 * - Se pausa fuera de viewport y con prefers-reduced-motion (queda el glow CSS estático).
 */
const BLOB_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: "-20% -10%",
  background:
    "radial-gradient(38% 42% at 22% 30%, rgba(255,171,145,0.10), transparent 70%), radial-gradient(45% 45% at 78% 68%, rgba(255,171,145,0.06), transparent 70%)",
  filter: "blur(48px)",
  animation: "zen-breathe 14s ease-in-out infinite alternate",
};

export function AmbientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let last = 0;
    const FRAME_MS = 1000 / 24; // movimiento suave no requiere 60fps

    const count = window.innerWidth < 640 ? 18 : 34;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.00006,
      vy: -0.00004 - Math.random() * 0.00006,
      a: 0.08 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const pauseIfOffscreen = () => {
      const rect = canvas.getBoundingClientRect();
      running = rect.bottom > 0 && rect.top < window.innerHeight;
    };
    const onScroll = () => pauseIfOffscreen();
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!running || t - last < FRAME_MS) return;
      last = t;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx * w * 0.06;
        d.y += d.vy * h * 0.06;
        if (d.y < -0.05) d.y = 1.05;
        if (d.x < -0.05) d.x = 1.05;
        if (d.x > 1.05) d.x = -0.05;
        const tw = 0.6 + 0.4 * Math.sin(t / 1600 + d.phase);
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,171,145,${(d.a * tw).toFixed(3)})`;
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {!reduced && <div style={BLOB_STYLE} className="zen-breathe-el" />}
      {reduced && (
        <div
          style={{
            ...BLOB_STYLE,
            animation: "none",
            opacity: 0.5,
          }}
        />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
