"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/zen/section-heading";
import { Reveal } from "@/components/zen/reveal";
import { useCopyText } from "@/hooks/use-copy-text";
import {
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  LotusIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/zen/icons";

type Status = "idle" | "submitting" | "success" | "error";

/** Motivos de contacto — califican el lead vía source tracking. */
const reasons = [
  { slug: "proyecto", label: "Proyecto a medida" },
  { slug: "erp", label: "Implementar ERP" },
  { slug: "app", label: "App mobile / web" },
  { slug: "consulta", label: "Una consulta" },
] as const;

/**
 * Contacto: sección completa con canal directo a la izquierda (email con
 * copiar, WhatsApp, disponibilidad) y formulario embebido a la derecha
 * (motivo como chips, honeypot, estados inline). Reemplaza al mid-CTA
 * como cierre del homepage. El dialog sigue para los CTA del resto.
 */
export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("proyecto");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "", // honeypot
  });
  const { copied, copy } = useCopyText();

  const setField =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const copyEmail = () =>
    copy(siteConfig.email, {
      success: "Email copiado",
      fail: `No pudimos copiar — anotá ${siteConfig.email}`,
    });

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
        body: JSON.stringify({ ...form, source: `contacto-${reason}` }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setErrorMsg(data.error ?? "Algo salió mal. Probá de nuevo.");
        setStatus("error");
      }
    } catch {
      setErrorMsg(
        "No pudimos conectar. Revisá tu conexión e intentá otra vez."
      );
      setStatus("error");
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", company: "", message: "", website: "" });
    setReason("proyecto");
    setStatus("idle");
    setErrorMsg(null);
  };

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Glow inferior tenue: la despedida del sitio */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 34% at 50% 100%, rgba(255,171,145,0.07), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="10"
            eyebrow="Contacto"
            title={
              <span id="contacto-title">
                Empecemos por <span className="text-zen-accent">una charla.</span>
              </span>
            }
            description="Contanos qué necesitás en dos líneas. Si podemos ayudarte, te lo decimos; si no, también. Sin compromiso y en criollo."
          />
        </Reveal>

        <div className="mt-14 lg:mt-16 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Columna izquierda: canales directos */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3.5">
              {/* Disponibilidad */}
              <div className="glass-card flex items-center gap-3.5 rounded-2xl px-5 py-4">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span
                    aria-hidden
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zen-accent/50"
                  />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-zen-accent" />
                </span>
                <p className="text-sm leading-relaxed text-zen-ink/90">
                  Respondemos en menos de{" "}
                  <span className="font-semibold text-zen-accent">
                    24 h hábiles
                  </span>
                </p>
              </div>

              {/* Email */}
              <div className="glass-card flex items-center justify-between gap-3 rounded-2xl px-5 py-4">
                <div className="flex min-w-0 items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zen-accent/25 bg-zen-accent-soft text-zen-accent">
                    <MailIcon width={18} height={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zen-ink">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link-accent block truncate text-sm text-zen-muted"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={`Copiar ${siteConfig.email} al portapapeles`}
                  title="Copiar email"
                  className="btn-secondary flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zen-line bg-zen-surface/60 text-zen-muted hover:text-zen-accent"
                >
                  {copied ? (
                    <CheckIcon
                      className="text-zen-accent"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <CopyIcon width={16} height={16} />
                  )}
                </button>
              </div>

              {/* WhatsApp */}
              {siteConfig.whatsapp ? (
                <a
                  href={siteConfig.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card group flex items-center justify-between gap-3 rounded-2xl px-5 py-4"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zen-accent/25 bg-zen-accent-soft text-zen-accent">
                      <WhatsAppIcon width={18} height={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-zen-ink">
                        WhatsApp
                      </p>
                      <p className="text-sm text-zen-muted">
                        {siteConfig.whatsapp.displayNumber}
                      </p>
                    </div>
                  </div>
                  <ArrowRightIcon
                    className="shrink-0 text-zen-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zen-accent"
                    width={16}
                    height={16}
                  />
                </a>
              ) : null}

              {/* Cobertura */}
              <div className="glass-card flex items-center gap-3.5 rounded-2xl px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zen-accent/25 bg-zen-accent-soft text-zen-accent">
                  <LotusIcon width={18} height={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zen-ink">
                    Argentina · remoto
                  </p>
                  <p className="text-sm text-zen-muted">
                    Trabajamos con todo el país, sin vueltas de traslados.
                  </p>
                </div>
              </div>

              <p className="mt-1 px-1 text-xs leading-relaxed text-zen-muted/70">
                ¿Preferís una charla de 15 minutos? Pedila en el mensaje y
                coordinamos horario.
              </p>
            </div>
          </Reveal>

          {/* Columna derecha: formulario embebido */}
          <Reveal delay={0.2} className="mt-10 lg:mt-0">
            <div className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
              {/* Glow interno superior */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 40% at 50% 0%, rgba(255,171,145,0.07), transparent 70%)",
                }}
              />

              {status === "success" ? (
                <div
                  role="status"
                  className="relative flex flex-col items-center py-14 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-zen-accent/40 bg-zen-accent-soft">
                    <CheckIcon className="text-zen-accent" width={28} height={28} />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-zen-ink">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-zen-muted">
                    Gracias por escribirnos. Te respondemos dentro de las
                    próximas 24–48&nbsp;hs hábiles — mirá también tu carpeta
                    de spam, just in case.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="btn-secondary mt-8 cursor-pointer rounded-full border border-zen-line bg-zen-surface/60 px-6 py-2.5 text-sm font-medium text-zen-ink"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="relative">
                  {/* Motivo: chips calificadores */}
                  <fieldset>
                    <legend className="text-sm text-zen-ink/90">
                      ¿De qué se trata?{" "}
                      <span className="text-zen-accent">*</span>
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {reasons.map((r) => (
                        <button
                          key={r.slug}
                          type="button"
                          onClick={() => setReason(r.slug)}
                          aria-pressed={reason === r.slug}
                          className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                            reason === r.slug
                              ? "border-zen-accent/50 bg-zen-accent-soft font-medium text-zen-accent"
                              : "border-zen-line bg-zen-surface-raised/50 text-zen-muted hover:border-zen-accent/30 hover:text-zen-ink"
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="ct-name"
                        className="text-sm text-zen-ink/90"
                      >
                        Nombre <span className="text-zen-accent">*</span>
                      </Label>
                      <Input
                        id="ct-name"
                        autoComplete="name"
                        placeholder="Tu nombre"
                        value={form.name}
                        onChange={setField("name")}
                        maxLength={80}
                        required
                        className="border-zen-line bg-zen-surface-raised/60 text-zen-ink placeholder:text-zen-muted/70 focus-visible:ring-zen-accent/50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="ct-email"
                        className="text-sm text-zen-ink/90"
                      >
                        Email <span className="text-zen-accent">*</span>
                      </Label>
                      <Input
                        id="ct-email"
                        type="email"
                        autoComplete="email"
                        placeholder="tu@empresa.com"
                        value={form.email}
                        onChange={setField("email")}
                        maxLength={120}
                        required
                        className="border-zen-line bg-zen-surface-raised/60 text-zen-ink placeholder:text-zen-muted/70 focus-visible:ring-zen-accent/50"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-1.5">
                    <Label
                      htmlFor="ct-company"
                      className="text-sm text-zen-ink/90"
                    >
                      Empresa{" "}
                      <span className="text-xs font-normal text-zen-muted/70">
                        (opcional)
                      </span>
                    </Label>
                    <Input
                      id="ct-company"
                      autoComplete="organization"
                      placeholder="Nombre de tu negocio"
                      value={form.company}
                      onChange={setField("company")}
                      maxLength={80}
                      className="border-zen-line bg-zen-surface-raised/60 text-zen-ink placeholder:text-zen-muted/70 focus-visible:ring-zen-accent/50"
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-1.5">
                    <Label
                      htmlFor="ct-message"
                      className="text-sm text-zen-ink/90"
                    >
                      Tu proyecto <span className="text-zen-accent">*</span>
                    </Label>
                    <Textarea
                      id="ct-message"
                      placeholder="Ej.: necesitamos ordenar ventas, stock y facturación en un solo sistema…"
                      value={form.message}
                      onChange={setField("message")}
                      maxLength={2000}
                      required
                      rows={5}
                      className="resize-none border-zen-line bg-zen-surface-raised/60 text-zen-ink placeholder:text-zen-muted/70 focus-visible:ring-zen-accent/50"
                    />
                    <p className="self-end text-[11px] tabular-nums text-zen-muted/60">
                      {form.message.length} / 2000
                    </p>
                  </div>

                  {/* Honeypot: invisible para humanos, tentador para bots */}
                  <div
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="ct-website">Website</label>
                    <input
                      id="ct-website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={setField("website")}
                    />
                  </div>

                  {status === "error" && errorMsg ? (
                    <p
                      role="alert"
                      className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-[#ff9b9b]"
                    >
                      {errorMsg}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary group mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-zen-accent px-6 py-3.5 text-base font-semibold text-[#1a1210] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
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
                          width={18}
                          height={18}
                        />
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-xs leading-relaxed text-zen-muted/70">
                    Tus datos viajan solo para responderte. Nada de listas,
                    nada de spam — promesa zen.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
