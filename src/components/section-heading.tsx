import type { ReactNode } from "react";

/**
 * Encabezado de sección con la etiqueta numerada estilo "01 / Servicios".
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
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-accent">
        <span aria-hidden className="font-mono">{index}</span>
        <span aria-hidden className="h-px w-8 bg-accent/40" />
        <span className="normal-case tracking-normal text-base text-accent">
          {eyebrow}
        </span>
      </p>
      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-balance leading-tight text-ink">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-pretty leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
