# Zen ERP Homepage — Worklog / Handover

> Sitio: landing de Zen ERP (Next.js 16, App Router, Tailwind 4, shadcn/ui, Prisma/SQLite).
> Repo de referencia (diseño original): https://github.com/4beru/zenerp-homepage
> El usuario pidió: **Hero Phase 01** (Fase 01 del homepage).

---

Task ID: 1
Agent: main-agent (Z.ai Code)
Task: Construir la Fase 01 (Hero) del homepage de Zen ERP en /home/z/my-project, siguiendo el diseño del repo de referencia y el logo oficial (zen-logo.svg). Nota: los archivos adjuntos del usuario (ZEN-ERP-HERO-DESIGN.md, capturas hyprshot, zen-logo.svg) no llegaron a /upload (carpeta vacía); se trabajó desde el repo GitHub clonado, que contiene el mismo zen-logo.svg oficial y todo el sistema de diseño.

Work Log:
- Cloné y estudié el repo de referencia (paleta, hero, header, componentes de motion, site-config, README).
- Copié el logo oficial `zen-logo.svg` a `public/` (también como `favicon.svg`).
- Diseño en `src/app/globals.css`: paleta Zen (bg #050505→#161d1e, surface #12181a/#1b2426, acento coral #ffab91/#ff8a65, ink #f5f1ed, terracota del logo #C1614A), mapeada a tokens shadcn (`--color-*`), más utilidades: `.glass-card`, `.btn-primary/.btn-secondary`, `.nav-link`, `.link-accent`, keyframes `zen-breathe`, `zen-halo`, `zen-marquee`, `scroll-dot`, scrollbar custom, `::selection`, focus-visible, soporte `prefers-reduced-motion`.
- `src/app/layout.tsx`: fuente Inter, `lang="es"`, metadata SEO completa (es_AR), themeColor #050505, favicon zen-logo.
- `src/lib/site-config.ts`: marca, email, WhatsApp, navLinks (con flag `ready`), stack tecnológico.
- `src/components/zen/header.tsx`: sticky con blur al scrollear, logo oficial (next/image), nav desktop, CTA que abre el dialog, menú hamburguesa mobile (Escape + scroll lock), toasts "en construcción" para secciones futuras.
- `src/components/zen/hero.tsx`: hero a pantalla completa — eyebrow con LotusIcon, H1 "Software en calma, hecho a tu medida." (acento coral con glow), subtítulo del repo original, 2 CTAs, stat "3" con count-up animado, loto oficial grande (desktop) y compacto (mobile), tira marquee del stack con máscaras de gradiente, indicador de scroll "Deslizá", parallax con framer-motion (contenido -56px / logo +36px), entrada escalonada (stagger 0.12s).
- `src/components/zen/lotus-mark.tsx`: logo oficial inline SVG (path extraído a `zen-logo-path.ts`) con reveal blur+scale (1.8s), halo radial que late (zen-halo 7s), respiración sutil (zen-breathe-logo 9s), drop-shadow terracota.
- `src/components/zen/ambient-bg.tsx`: canvas de motas coral a ~24fps (18 mobile / 34 desktop), pausa fuera de viewport, blobs CSS que respiran, respeta reduced-motion.
- `src/components/zen/contact-dialog.tsx` + `src/app/api/contact/route.ts` + Prisma `Lead` (schema push OK): formulario (nombre, email, empresa opcional, mensaje) con validación client+server (zod), honeypot antispam, estados idle/submitting/success/error, guardado en SQLite.
- `src/lib/store/lead-dialog.ts`: zustand para abrir el dialog desde header/hero.
- `src/components/zen/footer.tsx`: id="contacto", divisor loto, email + WhatsApp, copyright, nota "Fase 01 en construcción". Layout con `min-h-svh flex flex-col` + footer `mt-auto`.
- Hooks: `use-count-up.ts` (rAF, easeOutCubic, IO opcional), `use-prefers-reduced-motion.ts` (delega en framer-motion), `use-hydrated.ts` (useSyncExternalStore, SSR-safe).
- Fix importante: hydration mismatch por parallax `useScroll` → los estilos de scroll ahora se aplican solo tras hidratar (gate con `useHydrated`).
- Fix lint: reglas nuevas `react-hooks/set-state-in-effect` → refactor de hooks (sin setState síncrono en efectos).
- `next.config.ts`: `allowedDevOrigins` para el preview proxy.

Stage Summary (estado actual):
- ✅ Fase 01 completa y verificada: lint 0 errores, 0 errores de consola/hidratación, HTTP 200.
- ✅ QA con agent-browser (desktop 1440px y mobile 390px) + análisis visual VLM: header, hero, loto, marquee, footer, menú mobile — todo renderiza sin defectos ni overflow horizontal; footer pegado al fondo.
- ✅ Flujos probados end-to-end: dialog de contacto (validación, submit, success), lead persistido en SQLite (verificado con query; después limpié los datos de prueba), toasts de secciones futuras, scroll a contacto, honeypot (responde ok sin guardar), payload inválido → 400 con mensaje en español.
- Artefactos clave: `src/components/zen/*`, `src/hooks/use-{count-up,prefers-reduced-motion,hydrated}.ts`, `src/app/api/contact/route.ts`, `prisma/schema.prisma` (model Lead), `public/zen-logo.svg`.

Unresolved / riesgos / próximos pasos sugeridos (Fase 02+):
- Secciones pendientes del diseño original: Servicios, Proceso (pineado con scroll), Proyectos/Portfolio, Filosofía, CTA medio, contacto completo (hoy solo footer + dialog). Los links del nav ya existen y avisan "en construcción" vía toast.
- El stat "3" es count-up simple; podría sumarse animación de dígitos o más métricas.
- WhatsApp/email son placeholders (`site-config.ts`) — reemplazar por datos reales.
- El envío de leads guarda en SQLite; falta integración de email (Resend en el repo original) cuando existan credenciales.
- OG image: el repo original tiene og.png; acá solo favicon/metadata — generar og.png propio.
- Considerar: sitemap.ts/robots.ts como en el repo original, view transitions, modo de "prefers-reduced-motion" verificado en QA real.
- Datos de prueba del form fueron borrados; la tabla Lead está vacía y lista para producción.

---

Task ID: 2 (cron webDevReview, ronda 1)
Agent: main-agent (Z.ai Code)
Task: QA del estado actual + Fase 02: sección Servicios, micro-detalles visuales y nuevas features (sin bugs que corregir: Fase 01 estable).

Work Log:
- QA inicial: página 200, 0 errores de consola/página, DB limpia, lint OK → sin fixes prioritarios.
- Infraestructura de motion reutilizable: `src/components/zen/reveal.tsx` (`Reveal`, `RevealGroup`, `RevealItem`) con framer-motion `whileInView` (once, margin -80px), stagger 0.09, reduced-motion → render directo.
- `src/components/zen/section-heading.tsx`: encabezado numerado "02 · Servicios" (índice mono + línea coral + eyebrow).
- `src/data/services.ts`: 6 servicios con `tag` contextual nuevo (Navegador, iOS·Android, Offline, ERP todo-en-uno, Sin licencias, A medida).
- `src/components/zen/services.tsx`: sección `#servicios` con glow radial terracota + textura de puntos enmascarada, grid 3/2/1 cols, tarjetas `glass-card card-hover` con: número mono en esquina (01–06), chip de ícono 48px con gradiente coral, título, chip de tag, descripción y CTA "Consultar" → dialog con tema; cierre de sección con CTA "Hablemos y lo descubrimos juntos".
- Icons nuevos en `icons.tsx`: WebIcon, MobileIcon, DesktopIcon, OdooIcon, ErpNextIcon, PuzzleIcon, ArrowUpIcon + mapa `serviceIcons`.
- Features: `scroll-progress.tsx` (barra coral fija 2px, useSpring del progreso, gate useHydrated + reduced-motion) y `back-to-top.tsx` (FAB glass 44px, aparece tras 600px, animación entrada/salida, scroll top suave).
- Dialog con contexto: store `lead-dialog` refactorizado — el formulario vive en zustand (`form`, `setField`, prefill en `openDialog(source, topic)`) para evitar setState síncrono en efectos (regla `react-hooks/set-state-in-effect`); chip de tema coral en el header del dialog + mensaje precargado "Hola, me interesa «{topic}». ".
- Nav: "Servicios" ahora ancla real (ready: true); indicador "Deslizá" del hero apunta a #servicios; `page.tsx` monta Services + ScrollProgress + BackToTop.

Stage Summary:
- ✅ Fase 02 completa: lint 0 errores, 0 errores consola/hidratación, GET/POST OK, overflow 0 en mobile (390px).
- ✅ QA agent-browser: nav "Servicios" scrollea a la sección (hash OK); "Consultar" de tarjeta Odoo abre dialog con chip de tema + prefill verificado en DOM; submit end-to-end → lead guardado con source `servicio-implementacion-odoo` (luego limpiado); back-to-top 1310→0; barra de progreso confirmada visualmente (VLM); grid 3x2 con los 6 títulos exactos verificado por DOM + VLM; mobile apilado 1 columna sin cortes (VLM + DOM).
- Features nuevas: sección Servicios completa, reveals on-scroll, progreso de lectura, volver arriba, dialog con contexto de tema y prefill, source tracking por servicio.
- Detalles de estilo: glow + dot-mask por sección, chips de ícono con gradiente, numeración de tarjetas, hover states coral.

Unresolved / riesgos / próxima fase (recomendado):
- **Fase 03 sugerida: sección Proceso** (pasos 01–04 con tarjeta activa al scrollear o versión estática con reveals) — el nav ya tiene el link (#proceso, hoy toast).
- Luego: Proyectos/portfolio (cards con placeholder de loto), Filosofía/valores, y mid-CTA antes del footer.
- OG image propia (og.png) + sitemap.ts/robots.ts.
- Datos reales de contacto (email/WhatsApp placeholders).
- Integración Resend para notificar leads por email cuando existan credenciales.
- Riesgo menor: VLM tiende a "reconstruir HTML" en screenshots de cards — validar contenido clave por DOM (ya se hizo).
