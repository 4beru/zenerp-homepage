import { siteConfig } from "@/lib/site-config";
import { LotusIcon, MailIcon, WhatsAppIcon } from "@/components/zen/icons";

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
 * Footer — Fase 01: bloque de contacto directo (email + WhatsApp)
 * y cierre de marca. Queda pegado al fondo del documento.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="mt-auto border-t border-zen-line/70 bg-[#080b0c]/80">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <LotusDivider />

        <div className="mt-10 flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
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

          {/* Contacto directo */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-secondary inline-flex items-center gap-2.5 rounded-full border border-zen-line bg-zen-surface/60 px-5 py-2.5 text-sm font-medium text-zen-ink"
            >
              <MailIcon className="text-zen-accent" width={17} height={17} />
              {siteConfig.email}
            </a>
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
            Fase 01 del sitio — nuevas secciones en construcción.
          </p>
        </div>
      </div>
    </footer>
  );
}
