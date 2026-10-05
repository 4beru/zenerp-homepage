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
  name: z.string().trim().min(2, "Please provide your name (minimum 2 characters).").max(80),
  email: z.string().trim().email("Please provide a valid email address.").max(120),
  company: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a line about your project (minimum 10 characters).")
    .max(2000),
  source: z.string().trim().max(40).optional(),
  /** Honeypot: if filled, request is identified as bot spam. */
  website: z.string().optional(),
});

export async function POST(req: Request) {
  // Rate limit: 5 requests per IP per minute.
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
          "We received multiple submissions from your connection in a short window. Please wait a minute and try again.",
      },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Please check the form inputs." },
      { status: 400 }
    );
  }

  const { name, email, company, message, source, website } = parsed.data;

  // Honeypot: return OK without persisting bot spam.
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
    console.error("[api/contact] error saving lead:", error);
    return NextResponse.json(
      { ok: false, error: "We could not register your message. Please try again in a moment." },
      { status: 500 }
    );
  }
}
