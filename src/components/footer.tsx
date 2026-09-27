import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#filosofia", label: "Por qué Zen ERP" },
  { href: "#stack", label: "Stack" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 text-base font-semibold text-ink">
              <Logo size={30} />
              Zen&nbsp;ERP
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-sm">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <p className="mb-2.5 font-medium text-ink">Contacto</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-muted transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
            {siteConfig.whatsapp ? (
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 block text-muted transition-colors hover:text-accent"
              >
                WhatsApp · {siteConfig.whatsapp.displayNumber}
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. Todos los derechos reservados.</p>
          <p>Hecho con calma, como corresponde.</p>
        </div>
      </div>
    </footer>
  );
}
