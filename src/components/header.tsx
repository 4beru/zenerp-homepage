"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useNavHighlight } from "@/lib/motion/use-nav-highlight";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

/** Header sticky con menú hamburguesa en mobile. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useNavHighlight(headerRef);

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

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg-from/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="#"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink hover:opacity-90"
          aria-label="Zen ERP — volver arriba"
        >
          <Logo size={34} />
          Zen&nbsp;ERP
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-navlink
              className="nav-link is-inactive text-sm text-muted"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="btn-primary rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[#1a1210]"
          >
            Hablemos de tu proyecto
          </a>
        </nav>

        {/* Botón hamburguesa */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="rounded-lg p-2 text-ink hover:bg-surface-raised md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Menú mobile */}
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className="border-t border-line bg-bg-from/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-ink hover:bg-surface-raised"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent px-5 py-3 text-center text-base font-semibold text-[#1a1210]"
              >
                Hablemos de tu proyecto
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
