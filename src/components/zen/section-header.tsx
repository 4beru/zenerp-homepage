import type { ReactNode } from "react";

export function SectionHeader({
  index,
  eyebrow,
  eyebrowSub,
  title,
  description,
  titleId,
  bordered = true,
}: {
  index: string;
  eyebrow: string;
  eyebrowSub?: string;
  title: ReactNode;
  description?: ReactNode;
  titleId?: string;
  bordered?: boolean;
}) {
  return (
    <header className={bordered ? "border-b border-zen-line pb-10 sm:pb-14" : ""}>
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <span className="h-1.5 w-1.5 bg-zen-accent" aria-hidden="true" />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zen-muted sm:text-xs">
          {index} · {eyebrow}
        </p>
        {eyebrowSub ? (
          <>
            <span className="hidden font-mono text-xs text-zen-muted/40 sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="hidden font-mono text-xs tracking-wider text-zen-muted/70 sm:inline">
              {eyebrowSub}
            </span>
          </>
        ) : null}
      </div>

      <h2
        id={titleId}
        className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.8vw,4.75rem)] font-bold uppercase leading-[0.93] tracking-[-0.035em] text-zen-ink text-balance"
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zen-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
