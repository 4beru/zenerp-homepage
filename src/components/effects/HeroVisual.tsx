"use client";

import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * EXACT visual assets specified in user requirements:
 * - FRONT / BASE ASSET: Pink and violet lily (default visible layer)
 * - REVEAL / TOP ASSET: Alternate lily state (exposed via organic morphing trail)
 * - Automatic local fallback to /hero/*.webp in case CDN/proxy is unreachable.
 */
const BASE_ASSET_URL =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_192942_e1086505-d7da-433b-a59b-8220f4e6c808.png&w=1280&q=85";

const REVEAL_ASSET_URL =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_151324_bf318a5f-5525-4fc7-aab5-e9a341018828.png&w=1280&q=85";

const LOCAL_BASE_URL = "/hero/base-lily.webp";
const LOCAL_REVEAL_URL = "/hero/reveal-lily.webp";

/**
 * Exact Morph Trail Reference Parameters (Orbit-derived)
 */
const TRAIL_MAX_POINTS = 60;
const TRAIL_HEAD_R = 140;
const TRAIL_NOISE_AMP = 44;
const TRAIL_BLOB_PTS = 24;
const TRAIL_FADE_SPEED = 0.92;
const TRAIL_SAMPLE_DIST = 8;

type TrailPoint = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  seed: number;
};

interface HeroVisualProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * HeroVisual — Lightweight Canvas 2D Interactive Visual
 *
 * Implements a pure Canvas 2D dual-layer organic compositing engine.
 * - Base image visible normally
 * - Pointer movement creates organic morphing trail that punches through base layer
 * - Reveal image is unveiled inside the organic openings
 * - Old trail segments fade gracefully
 * - Zero React state per frame
 * - Strict pointer-events: none (parent container dispatches events)
 */
export function HeroVisual({
  containerRef,
  className = "",
  style,
}: HeroVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isDisposed = false;
    let animFrameId: number | null = null;
    let lastTime = 0;

    // Load base and reveal images
    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.alt = "Pixel-art pink and violet lily";

    const revealImg = new Image();
    revealImg.crossOrigin = "anonymous";
    revealImg.alt = "";

    let baseLoaded = false;
    let revealLoaded = false;

    const checkReadyAndDraw = () => {
      if (baseLoaded) {
        drawFrame(performance.now());
      }
    };

    baseImg.onload = () => {
      baseLoaded = true;
      checkReadyAndDraw();
    };
    baseImg.onerror = () => {
      if (baseImg.src !== LOCAL_BASE_URL) {
        baseImg.src = LOCAL_BASE_URL;
      }
    };

    revealImg.onload = () => {
      revealLoaded = true;
      checkReadyAndDraw();
    };
    revealImg.onerror = () => {
      if (revealImg.src !== LOCAL_REVEAL_URL) {
        revealImg.src = LOCAL_REVEAL_URL;
      }
    };

    baseImg.src = BASE_ASSET_URL;
    revealImg.src = REVEAL_ASSET_URL;

    // Mutable interactive state (zero React state updates per frame)
    const trailPoints: TrailPoint[] = [];
    let headRadius = 0;
    let hovering = false;
    let pointerX = -1000;
    let pointerY = -1000;
    let lastSampleX = -1000;
    let lastSampleY = -1000;
    let seedCounter = 0;
    let isLoopRunning = false;

    // Canvas sizing with DPR cap at 2 for optimal performance
    let displayW = 0;
    let displayH = 0;

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      displayW = rect.width;
      displayH = rect.height;

      const newW = Math.round(rect.width * dpr);
      const newH = Math.round(rect.height * dpr);

      if (canvas.width !== newW || canvas.height !== newH) {
        canvas.width = newW;
        canvas.height = newH;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      drawFrame(performance.now());
    };

    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);

    // Compute identical destination rectangle for both images to ensure exact alignment
    const getDrawRect = (img: HTMLImageElement) => {
      const nw = img.naturalWidth || 1280;
      const nh = img.naturalHeight || 1451;
      const imgAspect = nw / nh;
      const containerAspect = displayW / (displayH || 1);

      let dw = displayW;
      let dh = displayH;
      let dx = 0;
      let dy = 0;

      if (containerAspect > imgAspect) {
        // Container wider than image: fit height
        dh = displayH;
        dw = displayH * imgAspect;
        dx = (displayW - dw) / 2;
        dy = 0;
      } else {
        // Container taller than image: fit width
        dw = displayW;
        dh = displayW / imgAspect;
        dx = 0;
        dy = (displayH - dh) / 2;
      }

      return { dx, dy, dw, dh };
    };

    // Organic blob geometry with time-varying trigonometric distortion
    const drawOrganicBlob = (
      targetCtx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      seed: number,
      time: number
    ) => {
      if (r <= 1) return;
      const vertices: { x: number; y: number }[] = [];

      for (let i = 0; i < TRAIL_BLOB_PTS; i++) {
        const angle = (i / TRAIL_BLOB_PTS) * Math.PI * 2;
        const n1 = Math.sin(angle * 3 + time * 1.4 + seed) * 0.45;
        const n2 = Math.sin(angle * 5 - time * 0.9 + seed * 2.3) * 0.3;
        const n3 = Math.cos(angle * 2 + time * 1.8 + seed * 0.7) * 0.25;
        const noise = (n1 + n2 + n3) * TRAIL_NOISE_AMP * (r / TRAIL_HEAD_R);
        const rad = Math.max(1, r + noise);

        vertices.push({
          x: cx + Math.cos(angle) * rad,
          y: cy + Math.sin(angle) * rad,
        });
      }

      const len = vertices.length;
      if (len < 3) return;

      const midX0 = (vertices[len - 1].x + vertices[0].x) / 2;
      const midY0 = (vertices[len - 1].y + vertices[0].y) / 2;

      targetCtx.beginPath();
      targetCtx.moveTo(midX0, midY0);
      for (let i = 0; i < len; i++) {
        const nextIdx = (i + 1) % len;
        const midX = (vertices[i].x + vertices[nextIdx].x) / 2;
        const midY = (vertices[i].y + vertices[nextIdx].y) / 2;
        targetCtx.quadraticCurveTo(vertices[i].x, vertices[i].y, midX, midY);
      }
      targetCtx.closePath();
    };

    // Core 2D compositing render pass
    const drawFrame = (timeMs: number) => {
      if (!ctx || !baseLoaded || displayW === 0 || displayH === 0) return;

      const timeSec = timeMs * 0.001;
      const { dx, dy, dw, dh } = getDrawRect(baseImg);

      ctx.clearRect(0, 0, displayW, displayH);

      // Collect all active blobs
      const blobsToDraw: TrailPoint[] = [];

      // Include active cursor head if hovering and sufficiently expanded
      if (hovering && headRadius > 2) {
        blobsToDraw.push({
          x: pointerX,
          y: pointerY,
          r: headRadius,
          alpha: Math.min(1, headRadius / 35),
          seed: 42,
        });
      }

      // Include fading trail points
      for (let i = 0; i < trailPoints.length; i++) {
        blobsToDraw.push(trailPoints[i]);
      }

      // Step 1: Draw base image (front lily)
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(baseImg, dx, dy, dw, dh);

      // Step 2 & 3: If reveal trail active and reveal image loaded, composite organically
      if (blobsToDraw.length > 0 && revealLoaded) {
        // Punch transparent organic holes into base image
        ctx.globalCompositeOperation = "destination-out";
        for (let i = 0; i < blobsToDraw.length; i++) {
          const pt = blobsToDraw[i];
          ctx.fillStyle = `rgba(0, 0, 0, ${pt.alpha})`;
          drawOrganicBlob(ctx, pt.x, pt.y, pt.r, pt.seed, timeSec);
          ctx.fill();
        }

        // Draw reveal image under the punched holes
        ctx.globalCompositeOperation = "destination-over";
        ctx.drawImage(revealImg, dx, dy, dw, dh);
      }

      // Reset compositing mode for standard operations
      ctx.globalCompositeOperation = "source-over";
    };

    // Main animation loop
    const tick = (now: number) => {
      if (isDisposed) return;

      // Update head radius smoothly toward target
      const targetR = hovering ? TRAIL_HEAD_R : 0;
      headRadius += (targetR - headRadius) * (hovering ? 0.14 : 0.04);

      // Sample trail point when movement exceeds threshold
      if (hovering && headRadius > 5) {
        const dist = Math.hypot(pointerX - lastSampleX, pointerY - lastSampleY);
        if (dist >= TRAIL_SAMPLE_DIST) {
          trailPoints.unshift({
            x: pointerX,
            y: pointerY,
            r: headRadius,
            alpha: 1.0,
            seed: seedCounter++,
          });
          lastSampleX = pointerX;
          lastSampleY = pointerY;

          if (trailPoints.length > TRAIL_MAX_POINTS) {
            trailPoints.length = TRAIL_MAX_POINTS;
          }
        }
      }

      // Decay trail points
      for (let i = trailPoints.length - 1; i >= 0; i--) {
        trailPoints[i].alpha *= TRAIL_FADE_SPEED;
        trailPoints[i].r *= 0.995;
        if (trailPoints[i].alpha < 0.01) {
          trailPoints.splice(i, 1);
        }
      }

      drawFrame(now);

      // Stop loop when visual is completely settled to save CPU/GPU cycles
      const hasActiveBlobs = trailPoints.length > 0 || (hovering && headRadius > 1.5) || headRadius > 1.5;
      if (hasActiveBlobs) {
        animFrameId = requestAnimationFrame(tick);
      } else {
        isLoopRunning = false;
      }
    };

    const startLoopIfNeeded = () => {
      if (!isLoopRunning && !reduced) {
        isLoopRunning = true;
        animFrameId = requestAnimationFrame(tick);
      }
    };

    // Reduced motion check: static base image only, zero animation loop
    if (reduced) {
      drawFrame(performance.now());
      return () => {
        ro.disconnect();
      };
    }

    // Pointer events dispatched from containerRef (Hero section) or fallback to window
    const targetElement = containerRef?.current || canvas;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      hovering = true;
      startLoopIfNeeded();
    };

    const handlePointerEnter = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      lastSampleX = pointerX;
      lastSampleY = pointerY;
      hovering = true;
      startLoopIfNeeded();
    };

    const handlePointerLeave = () => {
      hovering = false;
      startLoopIfNeeded();
    };

    targetElement.addEventListener("pointermove", handlePointerMove, { passive: true });
    targetElement.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    targetElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      isDisposed = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      ro.disconnect();
      targetElement.removeEventListener("pointermove", handlePointerMove);
      targetElement.removeEventListener("pointerenter", handlePointerEnter);
      targetElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [containerRef, reduced]);

  return (
    <div
      data-hero-visual="canvas-2d"
      className={`relative select-none pointer-events-none overflow-hidden aspect-[1280/1451] w-[min(94vw,440px)] sm:w-[min(82vw,560px)] md:w-[min(70vw,660px)] lg:w-[min(54vw,800px)] xl:w-[860px] max-w-[920px] ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full block will-change-transform"
      />
    </div>
  );
}

export default HeroVisual;
