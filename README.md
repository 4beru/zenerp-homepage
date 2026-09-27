# Zen ERP — Landing page

Landing de producto optimizada para conversión: Next.js (App Router) + Tailwind CSS 4 + GSAP (ScrollTrigger), lista para Vercel.

## Desarrollo

```bash
bun install
bun run dev     # http://localhost:3000
```

## Animaciones (capa de impacto)

- **Motor:** GSAP + ScrollTrigger vía `@gsap/react` (`useGSAP`, scope por componente y limpieza automática). El registro del plugin vive en `src/lib/motion/gsap.ts` (solo cliente).
- **Hooks reutilizables** en `src/lib/motion/`: `use-reveal` (fade+translateY con stagger), `use-hero-motion` (entrada escalonada + parallax leve), `use-pinned-steps` (proceso pineado con paso activo por scrub; en mobile/reduced-motion degrada a reveal simple), `use-count-up` (contador de la cifra real "3 ERP"), `use-nav-highlight` (link activo del nav).
- **Componentes de movimiento** en `src/components/motion/`: `LotusMark` (loto que se dibuja con stroke-dashoffset), `AmbientBg` (motas canvas ~24fps + blobs CSS que "respiran"; se pausa fuera de viewport), `LotusDivider` (SVG estático, respiro orgánico entre secciones).
- **Carga diferida:** el JS de animación llega tras el primer paint (`lazy` + `requestAnimationFrame`) para no tocar el LCP del hero.
- **Accesibilidad:** todo respeta `prefers-reduced-motion` (los componentes renderizan visibles/estáticos sin JS); solo se animan `transform`/`opacity`.

## Deploy en Vercel

1. Importá el repo en Vercel (framework Next.js detectado automáticamente).
2. Configurá las variables de entorno (ver `.env.example`):
   | Variable | Descripción |
   |---|---|
   | `RESEND_API_KEY` | API key de [Resend](https://resend.com) para envío de leads |
   | `RESEND_TO_EMAIL` | Casilla destino (recomendado: `contacto@zenerp.com`) |
   | `RESEND_FROM_EMAIL` | Remitente verificado en tu dominio, ej. `leads@zenerp.com` |
3. Deploy. Sin las variables, el formulario muestra un error amigable (no rompe el sitio).

## Agregar un proyecto al portfolio

1. Subí la captura a `public/projects/` (ej. `pos-desktop.png`), optimizada (~WebP/AVIF o PNG comprimido, <200 KB ideal).
2. En `src/data/projects.ts`, agregá una entrada:
   ```ts
   {
     id: "mi-proyecto",
     title: "Sistema de gestión para comercio retail",
     category: "Desktop",           // Web | Mobile | Desktop | ERP
     description: "Una línea clara, sin jerga.",
     image: "/projects/pos-desktop.png",
     alt: "Captura del punto de venta en pantalla",
   }
   ```
3. Sin `image`, la tarjeta muestra el placeholder de loto automáticamente. No hay que tocar ningún componente.

## Datos editables

Servicios (`src/data/services.ts`), proceso (`src/data/process.ts`), valores (`src/data/values.ts`), stack (`src/data/stack.ts`) y email/WhatsApp (`src/lib/site-config.ts`) viven fuera de los componentes de UI.

## Notas

- `public/logo.svg` es un marcador provisorio con la paleta del loto: reemplazalo por el SVG oficial cuando esté disponible (mismo nombre, sin deformar).
- Antispam: honeypot + validación server-side en `src/app/api/contact/route.ts`. Si crece el spam, sumar Cloudflare Turnstile.
- Analítica: `@vercel/analytics` activo en `src/app/layout.tsx`.
