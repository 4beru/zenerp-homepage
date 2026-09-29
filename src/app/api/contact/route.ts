import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/contact — recibe un lead del dialog "Hablemos de tu proyecto"
 * y de la sección de contacto. Validación server-side + honeypot antispam
 * + rate limiting (5 envíos / IP / minuto). Guarda en SQLite (Prisma).
 */
const leadSchema = z.object({
  name: z.string().trim().min(2, "Contanos tu nombre (mínimo 2 caracteres).").max(80),
  email: z.string().trim().email("El email no parece válido.").max(120),
  company: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Escribinos al menos una línea sobre tu proyecto (mínimo 10 caracteres).")
    .max(2000),
  source: z.string().trim().max(40).optional(),
  /** Honeypot: si llega con contenido, es un bot. */
  website: z.string().optional(),
});

export async function POST(req: Request) {
  // Rate limit: 5 envíos por IP por minuto (ventana deslizante en memoria).
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "local";
  const rl = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Recibimos varios mensajes tuyos en poco tiempo. Esperá un minuto y probá de nuevo.",
      },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido." },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Revisá los datos del formulario." },
      { status: 400 }
    );
  }

  const { name, email, company, message, source, website } = parsed.data;

  // Honeypot: los bots rellenan campos ocultos. Respondemos "ok" sin guardar.
  if (website && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    await db.lead.create({
      data: {
        name,
        email,
        company: company?.trim() ? company.trim() : null,
        message,
        source: source ?? null,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] error guardando lead:", error);
    return NextResponse.json(
      { ok: false, error: "No pudimos registrar tu mensaje. Probá de nuevo en un momento." },
      { status: 500 }
    );
  }
}
