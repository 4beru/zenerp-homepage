import type { ReactNode } from "react";

/**
 * Encabezado de sección con la etiqueta numerada estilo "02 · Servicios".
 * Server component: sin estado, sin animación propia (la envuelve Reveal afuera).
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p
        className={`flex items-center gap-3 text-sm text-zen-accent ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span aria-hidden className="font-mono text-xs tracking-[0.18em]">
          {index}
        </span>
        <span aria-hidden className="h-px w-8 bg-zen-accent/40" />
        <span className="text-base">{eyebrow}</span>
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-balance text-zen-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-pretty text-zen-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
