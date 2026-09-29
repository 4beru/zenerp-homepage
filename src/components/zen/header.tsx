"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { useToast } from "@/hooks/use-toast";
import { CloseIcon, HammerIcon, MenuIcon } from "@/components/zen/icons";
import zenLogo from "../../../public/zen-logo.svg";

/**
 * Header sticky con blur al scrollear, menú hamburguesa en mobile y
 * resaltado de la sección activa (subrayado coral del nav-link).
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const openDialog = useLeadDialog((s) => s.openDialog);
  const { toast } = useToast();

  // Blur del header tras unos px de scroll + sección activa del nav.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      setScrolled(window.scrollY > 8);

      // Sección activa: la última cuyo top quedó por encima del 40% del
      // viewport (lecturas agrupadas, una sola escritura de estado).
      const line = window.innerHeight * 0.4;
      const ids = ["inicio", ...navLinks.map((l) => l.href.slice(1))];
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Cerrar el menú con Escape y bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const comingSoon = (label: string) =>
    toast({
      title: "Sección en construcción",
      description: `“${label}” llega en las próximas fases del sitio.`,
    });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-zen-line bg-[#050505]/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#"
          className="group flex items-center gap-2 text-lg font-semibold tracking-tight text-zen-ink transition-opacity hover:opacity-90"
          aria-label="Zen ERP — volver arriba"
        >
          <Image
            src={zenLogo}
            alt={`Logo de ${siteConfig.name}: flor de loto`}
            className="shrink-0 transition-transform duration-500 group-hover:scale-105"
            height={34}
            style={{ height: 34, width: "auto" }}
            priority
          />
          <span>
            Zen&nbsp;<span className="text-zen-accent">ERP</span>
          </span>
        </a>

        {/* Nav desktop */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-7"
        >
          {navLinks.map((l) =>
            l.ready ? (
              <a
                key={l.href}
                href={l.href}
                aria-current={
                  activeSection === l.href.slice(1) ? "true" : undefined
                }
                className={`nav-link text-sm ${
                  activeSection === l.href.slice(1)
                    ? "is-active"
                    : "text-zen-muted"
                }`}
              >
                {l.label}
              </a>
            ) : (
              <button
                key={l.href}
                type="button"
                onClick={() => comingSoon(l.label)}
                className="nav-link cursor-pointer text-sm text-zen-muted"
                title="Disponible en próximas fases"
              >
                {l.label}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => openDialog("header")}
            className="btn-primary cursor-pointer rounded-full bg-zen-accent px-5 py-2.5 text-sm font-semibold text-[#1a1210]"
          >
            Hablemos de tu proyecto
          </button>
        </nav>

        {/* Botón hamburguesa */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="rounded-lg p-2 text-zen-ink hover:bg-zen-surface-raised md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Menú mobile */}
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className="border-t border-zen-line bg-[#050505]/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto flex max-h-[calc(100svh-72px)] max-w-6xl flex-col gap-1 overflow-y-auto px-5 py-4">
            {navLinks.map((l) =>
              l.ready ? (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-base hover:bg-zen-surface-raised ${
                      activeSection === l.href.slice(1)
                        ? "text-zen-accent"
                        : "text-zen-ink"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.href}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      comingSoon(l.label);
                    }}
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-left text-base text-zen-ink hover:bg-zen-surface-raised"
                  >
                    {l.label}
                    <HammerIcon className="text-zen-muted" width={18} height={18} />
                  </button>
                </li>
              )
            )}
            <li className="mt-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openDialog("header-mobile");
                }}
                className="btn-primary block w-full cursor-pointer rounded-full bg-zen-accent px-5 py-3 text-center text-base font-semibold text-[#1a1210]"
              >
                Hablemos de tu proyecto
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
