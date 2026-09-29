"use client";

import React from "react";
import { UnicornLogoScene } from "@/components/effects/UnicornLogoScene";

interface ParticleBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  projectId?: string;
  scale?: number;
  dpi?: number;
  fps?: number;
  lazyLoad?: boolean;
  production?: boolean;
}

/**
 * ParticleBackground — Dedicated 4:3 Spatial Container for Unicorn Studio Particle Logo
 *
 * Responsibilities:
 * - Maintains 4:3 aspect ratio (based on original 1024x768 design)
 * - Absolute inset positioning ensures WebGL canvas receives deterministic width & height
 * - Sits behind the main headline (z-0) with pointer-events-auto for full interactivity
 * - Responsive width scaling across mobile, tablet, and desktop
 */
export function ParticleBackground({
  className = "",
  style,
  projectId = "QDQaQFzBZdNVzpTTpmQU",
  scale = 1,
  dpi = 1.5,
  fps = 60,
  lazyLoad = false,
  production = true,
}: ParticleBackgroundProps) {
  return (
    <div
      data-particle-layer="true"
      style={style}
      className={`particle-background pointer-events-auto relative aspect-[4/3] w-[min(96vw,500px)] sm:w-[min(85vw,660px)] md:w-[min(72vw,780px)] lg:w-[min(60vw,960px)] xl:w-[min(55vw,1040px)] 2xl:w-[1080px] max-w-[1120px] select-none ${className}`}
    >
      {/* Absolute inset wrapper guarantees WebGL receives explicit dimensions */}
      <div className="absolute inset-0 h-full w-full">
        <UnicornLogoScene
          projectId={projectId}
          scale={scale}
          dpi={dpi}
          fps={fps}
          lazyLoad={lazyLoad}
          production={production}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default ParticleBackground;
