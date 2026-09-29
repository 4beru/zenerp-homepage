"use client";

import { siteConfig, navLinks } from "@/lib/site-config";
import {
  LotusIcon,
  MailIcon,
  WhatsAppIcon,
  CopyIcon,
  CheckIcon,
} from "@/components/zen/icons";
import { useCopyText } from "@/hooks/use-copy-text";

/** Divisor orgánico: línea que se desvanece + loto centrado. */
function LotusDivider() {
  return (
    <div aria-hidden className="flex items-center gap-4">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-zen-line" />
      <LotusIcon className="text-zen-accent/70" width={18} height={18} />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-zen-line" />
    </div>
  );
}

/**
 * Footer: marca + navegación rápida + contacto directo (con copiar email).
 * El ancla #contacto vive en la sección de contacto; acá solo cierre.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { copied, copy } = useCopyText();

  const copyEmail = () =>
    copy(siteConfig.email, {
      success: "Email copiado",
      fail: `No pudimos copiar — anotá ${siteConfig.email}`,
    });

  return (
    <footer className="mt-auto border-t border-zen-line/70 bg-[#080b0c]/80">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <LotusDivider />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr] md:items-start">
          {/* Marca */}
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-zen-ink">
              Zen&nbsp;<span className="text-zen-accent">ERP</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zen-muted">
              {siteConfig.tagline} Aplicaciones web, mobile y desktop +
              implementación de Odoo y ERPNext.
            </p>
          </div>

          {/* Navegación rápida */}
          <nav aria-label="Navegación del pie">
            <p className="text-xs font-semibold tracking-[0.16em] text-zen-muted/70 uppercase">
              Explorá
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {navLinks
                .filter((l) => l.ready)
                .map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="link-accent text-sm text-zen-muted hover:text-zen-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Contacto directo */}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-secondary inline-flex items-center gap-2.5 rounded-full border border-zen-line bg-zen-surface/60 px-5 py-2.5 text-sm font-medium text-zen-ink"
              >
                <MailIcon className="text-zen-accent" width={17} height={17} />
                {siteConfig.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={`Copiar ${siteConfig.email} al portapapeles`}
                title="Copiar email"
                className="btn-secondary inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zen-line bg-zen-surface/60 text-zen-muted hover:text-zen-accent"
              >
                {copied ? (
                  <CheckIcon className="text-zen-accent" width={16} height={16} />
                ) : (
                  <CopyIcon width={16} height={16} />
                )}
              </button>
            </div>
            {siteConfig.whatsapp ? (
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2.5 rounded-full border border-zen-line bg-zen-surface/60 px-5 py-2.5 text-sm font-medium text-zen-ink"
              >
                <WhatsAppIcon className="text-zen-accent" width={17} height={17} />
                {siteConfig.whatsapp.displayNumber}
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-zen-line/60 pt-6 text-xs text-zen-muted/70 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name} — hecho con calma en Argentina.
          </p>
          <p className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-zen-accent/80"
            />
            Sitio en evolución — seguimos sumando secciones.
          </p>
        </div>
      </div>
    </footer>
  );
}
