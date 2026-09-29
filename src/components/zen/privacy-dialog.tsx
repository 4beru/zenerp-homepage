"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/site-config";
import { LotusIcon, ShieldIcon } from "@/components/zen/icons";

/**
 * Privacidad, en criollo: mini política que respalda la promesa anti-spam
 * del formulario ("nada de listas, nada de spam"). Dialog controlado por
 * el footer, que es quien renderiza el trigger.
 */
export function PrivacyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const items: readonly { title: string; body: string }[] = [
    {
      title: "Lo que guardamos",
      body: "Tu nombre, email, empresa (si la contás) y tu mensaje — lo único que pide el formulario. Nada más, porque no hay nada más.",
    },
    {
      title: "Para qué lo usamos",
      body: "Para responderte y, si seguimos conversando, armar tu propuesta. Es la única razón por la que existe ese formulario.",
    },
    {
      title: "Lo que NO hacemos",
      body: "No vendemos ni compartimos tus datos, no armamos listas de correo, no enviamos newsletters automáticos. Este sitio tampoco usa cookies de tracking ni analíticas de terceros.",
    },
    {
      title: "Si querés que lo borremos",
      body: `Escribinos a ${siteConfig.email} y eliminamos tu mensaje de nuestra base. Sin trámites, sin preguntas, sin contrapreguntas.`,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto rounded-2xl border-zen-line bg-zen-surface p-0 sm:max-w-md">
        {/* Borde superior degradado con el loto (misma familia que el dialog de contacto) */}
        <div
          aria-hidden
          className="h-1 w-full rounded-t-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,171,145,0.7), transparent)",
          }}
        />

        <div className="p-6 sm:p-7">
          <DialogHeader className="items-start text-left">
            <span
              aria-hidden
              className="flex size-11 items-center justify-center rounded-full border border-zen-accent/25 bg-zen-accent-soft text-zen-accent"
            >
              <ShieldIcon width={20} height={20} />
            </span>
            <DialogTitle className="mt-4 text-xl font-semibold tracking-tight text-zen-ink">
              Privacidad, en criollo
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-sm leading-relaxed text-zen-muted">
              La versión corta y honesta: tus datos viajan solo para
              responder tu mensaje.
            </DialogDescription>
          </DialogHeader>

          <ul className="mt-6 space-y-5">
            {items.map((item) => (
              <li key={item.title} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-zen-accent/70"
                />
                <div>
                  <h3 className="text-sm font-semibold text-zen-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-pretty text-zen-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-7 flex items-start gap-3 rounded-xl border border-zen-line/70 bg-zen-surface/40 px-4 py-3.5 text-sm leading-relaxed text-zen-muted">
            <LotusIcon
              aria-hidden
              className="mt-0.5 shrink-0 text-zen-accent/70"
              width={17}
              height={17}
            />
            Promesa zen: tus datos no van a pasear.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
