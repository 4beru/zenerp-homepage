"use client";

import { useRef, type ReactNode } from "react";
import { useReveal } from "@/lib/motion/use-reveal";

/**
 * Reveal con GSAP ScrollTrigger: fade + leve translateY al entrar en viewport.
 * - Sin `group`: el propio elemento se anima al entrar.
 * - Con `group`: se marca como hijo del stagger del contenedor padre
 *   (el padre usa useReveal({ staggerSelector: "[data-reveal]" })).
 * Con prefers-reduced-motion el contenido renderiza visible directo (sin JS).
 */
export function Reveal({
  children,
  className = "",
  group = false,
}: {
  children: ReactNode;
  className?: string;
  /** true → forma parte del escalonado del contenedor padre. */
  group?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  if (!group) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useReveal(ref);
  }

  return (
    <div ref={ref} {...(group ? { "data-reveal": "" } : {})} className={className}>
      {children}
    </div>
  );
}
