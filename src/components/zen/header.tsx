"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { useToast } from "@/hooks/use-toast";
import { CloseIcon, HammerIcon, MenuIcon } from "@/components/zen/icons";
import zenLogo from "../../../public/zen-logo.svg";

/** Header sticky con blur al scrollear y menú hamburguesa en mobile. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openDialog = useLeadDialog((s) => s.openDialog);
  const { toast } = useToast();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      description: `“${label}” llega en las próximas fases del sitio. Fase 01: hero.`,
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
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((l) =>
            l.ready ? (
              <a
                key={l.href}
                href={l.href}
                className="nav-link text-sm text-zen-muted"
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
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {navLinks.map((l) =>
              l.ready ? (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-zen-ink hover:bg-zen-surface-raised"
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
