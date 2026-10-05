"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: "16:9" | "4:3" | "3:2" | "3:4" | "1:1" | "custom";
  className?: string;
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
  fallbackColor?: string;
  title?: string;
  kicker?: string;
  enableHoverScale?: boolean;
}

const aspectClasses = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "3:2": "aspect-[3/2]",
  "3:4": "aspect-[3/4]",
  "1:1": "aspect-square",
  custom: "",
};

export function ImageReveal({
  src,
  alt,
  aspectRatio = "16:9",
  className = "",
  containerClassName = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  objectPosition = "center center",
  fallbackColor = "#111719",
  title,
  kicker,
  enableHoverScale = true,
}: ImageRevealProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const reduced = usePrefersReducedMotion();

  const aspectClass = aspectClasses[aspectRatio];

  return (
    <div
      className={`group relative overflow-hidden bg-[${fallbackColor}] ${aspectClass} ${containerClassName}`}
      style={{ backgroundColor: fallbackColor }}
    >
      {/* Resilient fallback backdrop with subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-between p-6 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 80% 20%, rgba(203,75,22,0.15) 0%, transparent 70%), linear-gradient(165deg, ${fallbackColor} 0%, #050505 100%)`,
        }}
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#839496]/50">
          <span>{kicker ?? "ZEN ARCHITECTURE"}</span>
          <span className="h-1 w-1 bg-[#CB4B16]" />
        </div>
        {title ? (
          <p className="font-display text-sm font-semibold uppercase tracking-tight text-[#EEE8D5]/70">
            {title}
          </p>
        ) : null}
      </div>

      {!hasError && (
        <motion.div
          className="relative z-10 h-full w-full"
          initial={
            reduced
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 1.05 }
          }
          whileInView={
            reduced
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1 }
          }
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            referrerPolicy="no-referrer"
            style={{ objectPosition }}
            onError={() => setHasError(true)}
            onLoad={() => setIsLoaded(true)}
            className={[
              "object-cover transition-[transform,opacity] duration-700 ease-out",
              isLoaded ? "opacity-100" : "opacity-0",
              enableHoverScale && !reduced
                ? "transition-transform duration-700 group-hover:scale-[1.035]"
                : "",
              className,
            ].join(" ")}
          />
        </motion.div>
      )}

      {/* Raking shadow scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#050505]/75 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60"
      />
    </div>
  );
}
