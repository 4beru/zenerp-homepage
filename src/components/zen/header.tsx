"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { useLocaleStore } from "@/lib/store/locale-store";
import { CloseIcon, MenuIcon } from "@/components/zen/icons";
import zenLogo from "../../../public/zen-logo.svg";

interface NavItem {
  href: string;
  en: string;
  es: string;
}

const studioNavItems: NavItem[] = [
  { href: "#servicios", en: "Services", es: "Servicios" },
  { href: "#proceso", en: "Approach", es: "Proceso" },
  { href: "#contacto", en: "Contact", es: "Contacto" },
];

/**
 * Creative Studio Header (Section 9 & 10 of DESIGN.md)
 *
 * Implements:
 * - Clean 3-zone contract: Brand title — 5 clean nav links — Language switcher + Action
 * - Single-line controls (no rounded pill buttons, zero AI-slop)
 * - Bilingual support (EN / ES) via useLocaleStore
 * - Accessible mobile menu with Escape/focus management
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const openDialog = useLeadDialog((s) => s.openDialog);
  const { locale, setLocale, toggleLocale } = useLocaleStore();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      setScrolled(window.scrollY > 12);

      const line = window.innerHeight * 0.35;
      const ids = ["inicio", ...studioNavItems.map((l) => l.href.slice(1))];
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 print:hidden ${
        scrolled || open
          ? "border-b border-[#EEE8D5]/[0.08] bg-[#050505]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between px-6 sm:px-10 xl:px-16">
        
        {/* Zone 1: Studio Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-[#EEE8D5] transition-opacity hover:opacity-90"
          aria-label="Zen ERP — Return to top"
        >
          <Image
            src={zenLogo}
            alt={`Logo de ${siteConfig.name}`}
            className="shrink-0 transition-transform duration-500 group-hover:scale-105"
            height={28}
            style={{ height: 28, width: "auto" }}
            priority
          />
          <span className="uppercase tracking-widest text-sm">
            Zen&nbsp;<span className="text-[#CB4B16]">ERP</span>
          </span>
        </a>

        {/* Zone 2: Studio Navigation Links (Clean Typography with hairline underlines) */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-7 md:flex lg:gap-9"
        >
          {studioNavItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-xs font-mono uppercase tracking-[0.16em] transition-colors duration-200 ${
                  isActive ? "text-[#EEE8D5]" : "text-[#839496] hover:text-[#EEE8D5]"
                }`}
              >
                <span>{locale === "en" ? item.en : item.es}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-px w-full bg-[#CB4B16]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher & Studio Primary Action */}
        <div className="hidden items-center gap-6 md:flex">
          {/* Language Toggle: EN / ES */}
          <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`cursor-pointer px-1.5 py-0.5 transition-colors ${
                locale === "en"
                  ? "text-[#EEE8D5] font-semibold"
                  : "text-[#839496]/50 hover:text-[#839496]"
              }`}
            >
              EN
            </button>
            <span className="text-[#839496]/30 select-none">/</span>
            <button
              type="button"
              onClick={() => setLocale("es")}
              className={`cursor-pointer px-1.5 py-0.5 transition-colors ${
                locale === "es"
                  ? "text-[#EEE8D5] font-semibold"
                  : "text-[#839496]/50 hover:text-[#839496]"
              }`}
            >
              ES
            </button>
          </div>

          {/* Single-Line Action Button (Tactile 0-2px border, no pill) */}
          <button
            type="button"
            onClick={() => openDialog("header")}
            className="group relative inline-flex cursor-pointer items-center gap-2 border border-[#EEE8D5]/20 bg-transparent px-5 py-2.5 font-mono text-xs font-semibold tracking-wider text-[#EEE8D5] uppercase transition-all duration-300 hover:border-[#CB4B16] hover:bg-[#CB4B16] hover:text-[#050505]"
          >
            <span>{locale === "en" ? "Start a project" : "Iniciar proyecto"}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleLocale}
            className="font-mono text-xs text-[#839496] uppercase"
          >
            {locale.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded p-2 text-[#EEE8D5] hover:bg-[#1B2426]"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile Navigation"
          className="border-t border-[#EEE8D5]/[0.08] bg-[#050505]/98 px-6 py-6 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {studioNavItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block font-mono text-sm uppercase tracking-wider text-[#EEE8D5] hover:text-[#CB4B16]"
                >
                  {locale === "en" ? item.en : item.es}
                </a>
              </li>
            ))}
            <li className="mt-4 border-t border-[#EEE8D5]/10 pt-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openDialog("header-mobile");
                }}
                className="w-full border border-[#CB4B16] bg-[#CB4B16] px-5 py-3 font-mono text-xs font-semibold tracking-wider text-[#050505] uppercase"
              >
                {locale === "en" ? "Start a project ↗" : "Iniciar proyecto ↗"}
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
