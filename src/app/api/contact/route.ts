import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Route handler del formulario de contacto.
 * Envía el lead por email con Resend (https://resend.com).
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   — API key de Resend
 *   RESEND_TO_EMAIL  — destino de los leads (ej. contacto@zenerp.com)
 *   RESEND_FROM_EMAIL— remitente verificado en Resend (ej. leads@zenerp.com)
 */

const PROJECT_TYPES = new Set([
  "Aplicación Web",
  "App Mobile",
  "App Desktop",
  "Implementación Odoo",
  "Implementación ERPNext",
  "Desarrollo a medida / no estoy seguro",
]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Formato inválido." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 254);
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  const projectType = String(body.projectType ?? "").trim();
  const message = String(body.message ?? "").trim().slice(0, 4000);
  const website = String(body.website ?? ""); // honeypot

  // Honeypot relleno → bot. Respondemos éxito para no darle señales.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Necesitamos tu nombre.";
  if (!isValidEmail(email)) fieldErrors.email = "Revisá que el email esté bien escrito.";
  if (!PROJECT_TYPES.has(projectType)) fieldErrors.projectType = "Elegí un tipo de proyecto.";
  if (message.length < 10) fieldErrors.message = "Contanos un poco más (mínimo 10 caracteres).";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Algunos campos necesitan una revisión.", fields: fieldErrors },
      { status: 400 }
    );
  }

  const to = process.env.RESEND_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !to || !from) {
    console.error("[contact] Faltan variables de entorno de Resend.");
    return NextResponse.json(
      { error: "El formulario no está configurado todavía. Escribinos por email." },
      { status: 500 }
    );
  }

  const html = `
    <h2 style="font-family:sans-serif;color:#161d1e">Nuevo lead desde zenerp.com</h2>
    <table style="font-family:sans-serif;font-size:14px;color:#161d1e;border-collapse:collapse">
      <tr><td style="padding:6px 12px 6px 0"><b>Nombre</b></td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0"><b>Email</b></td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0"><b>Teléfono</b></td><td style="padding:6px 0">${phone ? escapeHtml(phone) : "—"}</td></tr>
      <tr><td style="padding:6px 12px 6px 0"><b>Tipo de proyecto</b></td><td style="padding:6px 0">${escapeHtml(projectType)}</td></tr>
    </table>
    <div style="font-family:sans-serif;font-size:14px;color:#161d1e;margin-top:16px;padding:16px;background:#f5f1ed;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo lead: ${name} — ${projectType}`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Teléfono: ${phone || "—"}`,
        `Tipo de proyecto: ${projectType}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "No pudimos enviar el mensaje. Intentá de nuevo o escribinos por email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Excepción al enviar:", err);
    return NextResponse.json(
      { error: "Ocurrió un problema inesperado. Probá de nuevo en unos minutos." },
      { status: 500 }
    );
  }
}
