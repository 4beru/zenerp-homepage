"use client";

import { useEffect, useRef, memo } from "react";

export const HERO_VIDEO_SRC = "/video/15465338_1920_1080_30fps.mp4";

export interface HeroVideoBackgroundProps {
  className?: string;
}

export const HeroVideoBackground = memo(function HeroVideoBackground({
  className = "",
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio is muted for guaranteed browser autoplay
    video.muted = true;
    video.defaultMuted = true;

    // Direct playback attempt on mount
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: unlock playback on first user touch or interaction
        const unlock = () => {
          if (video.paused) {
            video.play().catch(() => {});
          }
          window.removeEventListener("pointerdown", unlock);
          window.removeEventListener("touchstart", unlock);
          window.removeEventListener("scroll", unlock);
        };
        window.addEventListener("pointerdown", unlock, { passive: true, once: true });
        window.addEventListener("touchstart", unlock, { passive: true, once: true });
        window.addEventListener("scroll", unlock, { passive: true, once: true });
      });
    }
  }, []);

  return (
    <div
      className={`absolute inset-0 h-full w-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Direct High-Performance Video Background */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-85 transition-opacity duration-1000"
      />

      {/* 2. Soft Architectural Gradient Overlays for Guaranteed Text Legibility */}
      {/* Left-to-right fade for editorial headline and description */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/50 to-transparent lg:via-[#050505]/35" />

      {/* Top and Bottom soft transitions into the page background */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505] to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

      {/* Subtle fine film grain / vignette finish */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,5,0.6)_100%)] pointer-events-none" />
    </div>
  );
});

export default HeroVideoBackground;
