"use client";

import { useRef, useState, type FormEvent } from "react";
import { AlertIcon, CheckIcon, MailIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

const projectTypes = [
  "Aplicación Web",
  "App Mobile",
  "App Desktop",
  "Implementación Odoo",
  "Implementación ERPNext",
  "Desarrollo a medida / no estoy seguro",
] as const;

type Status = "idle" | "sending" | "success" | "error";

/**
 * Formulario de contacto.
 * - Honeypot anti-spam (campo invisible para humanos).
 * - Estados de éxito/error visibles con role="status"/"alert".
 */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: si un bot llenó el campo oculto, se descarta en silencio.
    if (typeof data.get("website") === "string" && data.get("website")) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          json?.error ??
            "No pudimos enviar tu mensaje. Intentá de nuevo o escribinos por email."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Falló la conexión. Revisá tu internet e intentá otra vez.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-surface/80 px-4 py-3 text-base text-ink placeholder:text-muted/60 transition-colors focus:border-accent/60 focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
      {/* Columna formulario */}
      <form ref={formRef} onSubmit={onSubmit} noValidate={false} aria-describedby="form-status">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Nombre <span className="text-accent">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Tu nombre"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="vos@tunegocio.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Teléfono <span className="text-muted">(opcional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+54 9 11 ..."
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="projectType" className={labelClass}>
              Tipo de proyecto <span className="text-accent">*</span>
            </label>
            <select id="projectType" name="projectType" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Elegí una opción
              </option>
              {projectTypes.map((t) => (
                <option key={t} value={t} className="bg-surface text-ink">
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className={labelClass}>
              Mensaje <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Contanos qué necesita tu negocio hoy. No hace falta que sepas de tecnología: alcanza con describir el problema."
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>

        {/* Honeypot — invisible para humanos, rellenable solo por bots */}
        <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="website">Dejá este campo vacío</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-[#1a1210] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Enviando…" : "Enviar mensaje"}
          </button>
          <p className="text-xs text-muted">
            Respondemos dentro de las 24 horas hábiles. Sin spam, nunca.
          </p>
        </div>

        {/* Feedback visible */}
        <div id="form-status" aria-live="polite" className="mt-5">
          {status === "success" ? (
            <p
              role="status"
              className="flex items-start gap-2.5 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-ink"
            >
              <CheckIcon className="mt-0.5 shrink-0 text-accent" />
              <span>
                <strong className="font-semibold">Mensaje enviado.</strong> Gracias por
                escribirnos: te respondemos muy pronto al email que nos dejaste.
              </span>
            </p>
          ) : null}
          {status === "error" ? (
            <p
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-ink"
            >
              <AlertIcon className="mt-0.5 shrink-0 text-red-300" />
              <span>{errorMsg}</span>
            </p>
          ) : null}
        </div>
      </form>

      {/* Columna contacto directo */}
      <aside aria-label="Contacto directo" className="lg:pt-2">
        <h3 className="text-lg font-semibold text-ink">¿Preferís hablar directo?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Escribinos por cualquiera de estos medios y seguimos la charla ahí.
        </p>
        <ul className="mt-6 space-y-3">
          <li>
            <a
              href={`mailto:${siteConfig.email}?subject=Consulta%20por%20un%20proyecto`}
              className="glass-card flex items-center gap-4 rounded-2xl p-5 text-ink"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <MailIcon />
              </span>
              <span>
                <span className="block text-sm font-semibold">{siteConfig.email}</span>
                <span className="block text-xs text-muted">Email directo</span>
              </span>
            </a>
          </li>
          {siteConfig.whatsapp ? (
            <li>
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-4 rounded-2xl p-5 text-ink"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <WhatsAppIcon />
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {siteConfig.whatsapp.displayNumber}
                  </span>
                  <span className="block text-xs text-muted">WhatsApp</span>
                </span>
              </a>
            </li>
          ) : null}
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Tip: si todavía no tenés claro qué pedir, manda un mensaje con dos
          líneas sobre tu negocio. Con eso alcanzamos para la primera charla.
        </p>
      </aside>
    </div>
  );
}
