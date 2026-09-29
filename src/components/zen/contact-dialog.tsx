"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLeadDialog } from "@/lib/store/lead-dialog";
import { siteConfig } from "@/lib/site-config";
import { ArrowRightIcon, CheckIcon, LotusIcon } from "@/components/zen/icons";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Dialog de contacto: formulario mínimo (nombre, email, empresa, mensaje)
 * que guarda el lead vía POST /api/contact. Honeypot incluido.
 * Los campos viven en el store (prefill por tema sin efectos).
 */
export function ContactDialog() {
  const open = useLeadDialog((s) => s.open);
  const source = useLeadDialog((s) => s.source);
  const topic = useLeadDialog((s) => s.topic);
  const form = useLeadDialog((s) => s.form);
  const setField = useLeadDialog((s) => s.setField);
  const closeDialog = useLeadDialog((s) => s.closeDialog);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reset del estado visual al cerrar (async: no cascada de renders)
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStatus("idle");
      setErrorMsg(null);
    }, 250);
    return () => clearTimeout(t);
  }, [open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Validación ligera client-side (la real vive en el server)
    if (form.name.trim().length < 2) {
      setErrorMsg("Contanos tu nombre (mínimo 2 caracteres).");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErrorMsg("El email no parece válido.");
      setStatus("error");
      return;
    }
    if (form.message.trim().length < 10) {
      setErrorMsg("Escribinos al menos una línea sobre tu proyecto.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: source ?? "dialog" }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setErrorMsg(data.error ?? "Algo salió mal. Probá de nuevo.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("No pudimos conectar. Revisá tu conexión e intentá otra vez.");
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto rounded-2xl border-zen-line bg-zen-surface p-0 sm:max-w-md">
        {/* Borde superior degradado con el loto */}
        <div
          aria-hidden
          className="h-1 w-full rounded-t-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,171,145,0.7), transparent)",
          }}
        />

        {status === "success" ? (
          <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-zen-accent/40 bg-zen-accent-soft">
              <CheckIcon className="text-zen-accent" width={28} height={28} />
            </span>
            <h2 className="mt-6 text-xl font-semibold text-zen-ink">
              ¡Mensaje enviado!
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zen-muted">
              Gracias por escribirnos. Te respondemos dentro de las próximas
              24–48&nbsp;hs hábiles.
            </p>
            <button
              type="button"
              onClick={closeDialog}
              className="btn-primary mt-8 cursor-pointer rounded-full bg-zen-accent px-6 py-2.5 text-sm font-semibold text-[#1a1210]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <DialogHeader className="px-6 pt-6 sm:px-8">
              <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-zen-ink">
                <LotusIcon className="text-zen-accent" width={20} height={20} />
                Hablemos de tu proyecto
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-zen-muted">
                {topic ? (
                  <span className="mb-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-zen-accent/30 bg-zen-accent-soft px-3 py-1 text-xs font-medium text-zen-accent">
                    <LotusIcon width={12} height={12} />
                    <span className="truncate">{topic}</span>
                  </span>
                ) : null}
                Contanos qué necesitás en dos líneas. Sin compromiso, sin
                jerga: te contestamos en castellano, claro y al punto.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 flex flex-col gap-4 px-6 pb-2 sm:px-8">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lead-name" className="text-sm text-zen-ink/90">
                  Nombre <span className="text-zen-accent">*</span>
                </Label>
                <Input
                  id="lead-name"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  maxLength={80}
                  required
                  className="border-zen-line bg-zen-surface-raised/60 text-zen-ink placeholder:text-zen-muted/60 focus-visible:ring-zen-accent/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lead-email" className="text-sm text-zen-ink/90">
                  Email <span className="text-zen-accent">*</span>
                </Label>
                <Input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@empresa.com"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  maxLength={120}
                  required
                  className="border-zen-line bg-zen-surface-raised/60 text-zen-ink placeholder:text-zen-muted/60 focus-visible:ring-zen-accent/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lead-company" className="text-sm text-zen-ink/90">
                  Empresa{" "}
                  <span className="text-xs font-normal text-zen-muted/70">
                    (opcional)
                  </span>
                </Label>
                <Input
                  id="lead-company"
                  autoComplete="organization"
                  placeholder="Nombre de tu negocio"
                  value={form.company}
                  onChange={(e) => setField("company", e.target.value)}
                  maxLength={80}
                  className="border-zen-line bg-zen-surface-raised/60 text-zen-ink placeholder:text-zen-muted/60 focus-visible:ring-zen-accent/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lead-message" className="text-sm text-zen-ink/90">
                  Tu proyecto <span className="text-zen-accent">*</span>
                </Label>
                <Textarea
                  id="lead-message"
                  placeholder="Ej.: necesitamos ordenar ventas, stock y facturación en un solo sistema…"
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  maxLength={2000}
                  required
                  rows={4}
                  className="resize-none border-zen-line bg-zen-surface-raised/60 text-zen-ink placeholder:text-zen-muted/60 focus-visible:ring-zen-accent/50"
                />
              </div>

              {/* Honeypot: invisible para humanos, tentador para bots */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="lead-website">Website</label>
                <input
                  id="lead-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setField("website", e.target.value)}
                />
              </div>

              {status === "error" && errorMsg ? (
                <p
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-[#ff9b9b]"
                >
                  {errorMsg}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary group mt-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-zen-accent px-6 py-3 text-sm font-semibold text-[#1a1210] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <span
                      aria-hidden
                      className="h-4 w-4 animate-spin rounded-full border-2 border-[#1a1210]/30 border-t-[#1a1210]"
                    />
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <ArrowRightIcon
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      width={16}
                      height={16}
                    />
                  </>
                )}
              </button>

              <p className="pb-6 pt-1 text-center text-xs text-zen-muted/70">
                O escribinos directo a{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-accent text-zen-muted"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
