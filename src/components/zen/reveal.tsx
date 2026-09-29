"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal: fade + leve translateY al entrar en viewport, con stagger opcional
 * entre hijos (via RevealGroup). El `initial` es constante ("hidden") para
 * que el HTML del servidor y la hidratación coincidan siempre; con
 * prefers-reduced-motion, MotionConfig (raíz) desactiva el translateY y
 * queda solo el fade de opacidad.
 * Uso: <Reveal delay={0.1}>…</Reveal> o <RevealGroup stagger={0.08}>…</RevealGroup>
 */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Grupo que orquesta el stagger de sus Reveal hijos. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </Comp>
  );
}

/** Ítem de un RevealGroup (usa las variants compartidas). */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = motion[as];

  return (
    <Comp className={className} variants={revealVariants}>
      {children}
    </Comp>
  );
}
