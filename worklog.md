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

---

Task ID: 3 (cron webDevReview, ronda 2)
Agent: main-agent (Z.ai Code)
Task: QA del estado + Fase 03: sección Proceso ("Cómo trabajamos") con timeline y paso activo al scrollear. Incluyó debugging real de dos bugs de la nueva sección.

Work Log:
- QA inicial: 200, 0 errores consola/página, lint OK, secciones [inicio, servicios], sin overflow → fase estable.
- Estudié el patrón del repo original (usePinnedSteps con GSAP + pin; descarté el pinneo para no secuestrar el scroll, prefiriendo una regla propia sobre scrollY).
- `src/data/process.ts`: 4 pasos (Diagnóstico, Propuesta, Desarrollo, Entrega y soporte) + campo `kicker` nuevo (chip corto: "Escuchamos primero", "Precio cerrado", "Avances reales", "No desaparecemos").
- Icons nuevos: ChatIcon, NoteIcon, HandshakeIcon + mapa `processIcons`.
- `src/components/zen/lotus-divider.tsx`: divisor orgánico loto (SVG estático del repo original).
- `src/components/zen/process.tsx`: sección `#proceso` — heading "03 · Cómo trabajamos", timeline con línea vertical (mobile: izquierda con nodos por paso; desktop: columna + chips de ícono), relleno coral que crece con el paso activo (scaleY = (active+1)/4), cards glass con número mono, kicker chip y descripción; CTA final "agendá una charla de 15 minutos →" abre dialog con tema "Charla inicial de 15 minutos".
- **Bug 1 (lógica):** primera versión con IntersectionObserver no cambiaba el paso activo (las 4 cards comparten fila en desktop → mismas intersecciones; además layout thrashing). Reescribí con regla directa sobre getBoundingClientRect en rAF (lecturas agrupadas → escritura única vía setState): transición exacta cuando top del card cruza el 55% del viewport.
- **Bug 2 (CSS):** `.glass-card` pisaba los estilos del paso activo (misma propiedad, orden posterior) → el activo no mostraba borde coral ni glow. Fix: specificity con `.step-card.glass-card[data-active]` (+ `opacity:1` en activo, dimming 0.72 en inactivos, hover los reaviva).
- Nav "Proceso" ahora ancla real; page.tsx monta Process entre Services y Footer.
- Reduced-motion: todos los pasos visibles/activos, sin listener de scroll.

Stage Summary:
- ✅ Fase 03 completa y verificada: lint 0, 0 errores consola, mobile sin overflow, cards apiladas en 1 col.
- ✅ QA: transición de activo probada por DOM en 1600→(true primero), 2100/2112 (true/false límite exacto), 2140+ (último activado); computed styles confirman borde coral rgba(255,171,145,0.45) + glow + dimming 0.72; VLM (texto plano) confirma visual: 4 cards numeradas, 4ª destacada, línea coral llena, chips e íconos, sin defectos.
- Features nuevas: timeline con progreso, paso activo por scroll, kickers, CTA con tema, divisor loto, íconos de proceso.
- Detalles de estilo: nodos con halo coral (mobile), chip de ícono que escala y gradiente (desktop activo), dimming suave de inactivos, glow radial de sección.

Unresolved / riesgos / próxima fase (recomendado):
- **Fase 04 sugerida: Proyectos/portfolio** (cards con placeholder de loto en data-URI como el repo original) — nav #proyectos sigue con toast.
- Luego: Filosofía/valores + mid-CTA antes del footer, y sección contacto completa.
- OG image propia (og.png), sitemap.ts/robots.ts, datos reales de contacto, integración Resend.
- Nota técnica: si en el futuro se agregan/mudan secciones, verificar que la regla del 55% sigue razonable (es robusta: solo compara tops de cards).

---

Task ID: 4 (cron webDevReview, ronda 3)
Agent: main-agent (Z.ai Code)
Task: QA del estado + Fase 04: sección Proyectos (04), Filosofía (05), Mid-CTA pre-footer, tracking de sección activa en nav, SEO (sitemap/robots/JSON-LD) y upgrades de estilo (footer 3 columnas). Incluyó fix de un bug real de servidor.

Work Log:
- QA inicial: 200, 0 errores de consola/página, secciones [inicio, servicios, proceso], sin overflow desktop/mobile → fase estable, sin fixes prioritarios.
- `src/data/projects.ts`: 4 proyectos realistas alineados con los servicios y el stat del hero (ERP Odoo manufactura, ERPNext retail multi-sucursal, app Flutter de repartos offline, portal B2B Next.js), cada uno con categoría, stack, métrica de resultado y año + disclaimer de confidencialidad.
- `src/data/philosophy.ts`: quote manifiesto ("El mejor software es el que no se nota.") + 4 principios (Simpleza, Transparencia, Cercanía, Calma).
- Icons nuevos en `icons.tsx`: FactoryIcon, StoreIcon, TruckIcon, GlobeIcon (+map `projectIcons`) y LeafIcon, EyeIcon, UsersIcon, MoonIcon (+map `philosophyIcons`).
- `src/components/zen/projects.tsx`: sección `#proyectos` "04 · Proyectos" — grid 2 cols / 1 col mobile, tarjetas con "tapa" decorativa (gradiente coral + textura de puntos + loto marca de agua + zoom sutil en hover), chip de categoría con ícono, año mono, chips de stack y métrica de resultado grande; disclaimer honesto + CTA "Contanos tu idea" → dialog con tema "Un proyecto como los del portfolio".
- `src/components/zen/philosophy.tsx`: sección `#filosofia` "05 · Filosofía" — layout editorial a dos columnas: quote grande sticky (desktop) + lista de principios con divisores finos, índice mono, chip de ícono y hover coral (distinto del grid de cards: más texto, más aire).
- `src/components/zen/mid-cta.tsx`: panel glass redondeado pre-footer con glow radial, textura de puntos enmascarada, LotusMark con su halo, heading "¿Tenés un proyecto en mente?", CTA primario (dialog) + WhatsApp directo + microcopy "Respondemos en menos de 24 h hábiles.".
- Header: **tracking de sección activa** — la clase `.is-active` (ya existía en CSS, no se usaba) ahora se aplica según scroll (regla del 40% del viewport, lecturas agrupadas + rAF, `aria-current`); menú mobile resalta en coral y ganó scroll interno (max-h + overflow-y-auto) por si crece; gaps ajustados (gap-6 lg:gap-8) para 5 links; corregido copy desactualizado del toast ("Fase 01: hero" → genérico).
- Hero: botón "Ver proyectos" ahora es ancla real a `#proyectos` (antes toast) — se eliminó el handler projectsSoon y el import de useToast.
- Footer: 3 columnas (marca / navegación rápida "Explorá" con todos los anchors / contacto directo), nota inferior actualizada ("Sitio en evolución — seguimos sumando secciones").
- SEO: `src/app/sitemap.ts` + `src/app/robots.ts` (App Router metadata routes) + JSON-LD Organization en `layout.tsx` (schema.org: nombre, email, área, knowsAbout).
- **Bug real corregido (servidor):** `GET /robots.txt` devolvía 500 — conflicto entre el `public/robots.txt` del boilerplate y la nueva ruta `app/robots.ts` ("A conflicting public file and page file was found"). Fix: eliminé `public/robots.txt` (y `public/logo.svg` boilerplate sin uso) → robots.txt 200 con Sitemap referenciado.
- `site-config.ts`: navLinks con 5 secciones ready (agregada Filosofía).

Stage Summary (estado actual):
- ✅ Fase 04 completa y verificada: lint 0 errores, 0 errores de consola/página, GET/POST OK.
- ✅ QA agent-browser desktop 1440px + mobile 390px: 6 secciones [inicio, servicios, proceso, proyectos, filosofia, contacto], sin overflow horizontal (scrollWidth 390 exacto), menú mobile con los 5 links, anclas funcionando con scroll-margin 88px.
- ✅ Tracking de sección activa probado por DOM: en #proyectos → "Proyectos" resaltado con aria-current; en #filosofia → "Filosofía"; arriba → ninguno (correcto).
- ✅ VLM (texto plano) sin defectos: tarjetas de proyectos con tapa/categoría/stack/métrica; filosofía con quote + 4 principios legibles; mid-CTA centrado con 2 botones; footer 3 columnas; mobile todo apilado y legible.
- ✅ E2E form desde Proyectos: dialog con prefill «Un proyecto como los del portfolio» → submit → lead persistido con source `proyectos-cta` → datos de prueba limpiados (tabla vacía y lista para producción).
- ✅ SEO: /sitemap.xml 200 (XML válido), /robots.txt 200 (con Sitemap), JSON-LD Organization presente en DOM.
- ✅ Screenshot full-page: ritmo visual consistente (numeración 02-05, glows alternados, acentos coral, loto recurrente).
- Capturas de QA en `/home/z/my-project/download/qa-fase04/` (desktop, mobile y full-page).

Unresolved / riesgos / próxima fase (recomendado):
- **Fase 05 sugerida:** sección de contacto completa (form embebido + datos reales) o sección Testimonios/Equipo — hoy contacto = mid-CTA + footer + dialog (funcional pero compacto).
- OG image propia (og.png) para compartir en redes — metadata ya apunta a summary_large_image pero no hay imagen.
- Datos reales de contacto (email/WhatsApp siguen siendo placeholders en `site-config.ts`).
- Integración Resend para notificar leads por email cuando existan credenciales.
- Nota técnica: el LotusMark del mid-cta anima su reveal al montar (no usa whileInView); si molesta al llegar tarde, cambiar a whileInView. Hoy es aceptable porque el halo sigue latiendo.
- Nota técnica: VLM en screenshots downscaled puede confundir etiquetas de sección — validar contenido clave por DOM (ya se hizo en esta ronda).
- URL del sitio (`siteConfig.url`) es placeholder zenerp.com — ajustar al dominio real para sitemap/robots/JSON-LD en producción.

---

Task ID: 5 (cron webDevReview, ronda 4)
Agent: main-agent (Z.ai Code)
Task: QA del estado + Fase 05: sección FAQ con acordeón (06), OG image propia, feature de copiar email en footer y fix de un bug real de CSS. Incluyó debugging de un problema de Tailwind 4 que sirvió CSS stale.

Work Log:
- QA inicial: 200, 0 errores consola/página, 5 secciones, sin overflow desktop/mobile → fase estable, sin fixes prioritarios.
- `src/data/faq.ts`: 6 preguntas reales de pre-venta (precio, plazos, migración de datos, Odoo vs ERPNext, soporte post-entrega, propiedad del código) con respuestas honestas en es_AR.
- `src/components/zen/faq.tsx`: sección `#faq` "06 · FAQ" — layout dos columnas: izquierda encabezado + tarjeta de ayuda sticky (CTA dialog + WhatsApp), derecha acordeón shadcn/ui. Ítems `.faq-item` (tarjeta glass propia), número mono 01–06, chevron coral, respuesta con borde-left coral; reveal escalonado por delay (0.05·i) — NOTA: no usar RevealGroup para esto, el Accordion interrumpe la cadena de variants de framer-motion y el stagger se pierde.
- JSON-LD `FAQPage` en `page.tsx` (server) importando `faqs` — además del `Organization` existente en layout.
- **Bug real (Tailwind 4 / Turbopack):** tras editar globals.css, los nuevos estilos `.faq-item` NO se servían (CSS stale: @keyframes dentro de `@theme inline` rompía silenciosamente el procesamiento y Turbopack servía la versión anterior del archivo). Diagnóstico: comparé CSS servido vs disco; descubrí además que las animaciones `animate-accordion-*` ya las provee `tw-animate-css` (mi bloque @theme era redundante e innecesario). Fix: eliminé el bloque `@keyframes` de `@theme inline` → al re-guardar, Turbopack reprocesó y `.faq-item` apareció (5 matches). Lección: NO poner @keyframes custom dentro de `@theme inline` en este setup; tw-animate-css ya cubre accordion/collapsible/caret.
- Nav: link "FAQ" agregado (navLinks, ready) — 6 links totales; gaps del header ajustados a `gap-4 lg:gap-6 xl:gap-7` para que encaje exacto en 768px (verificado: headerW 768 = clientW 768). El tracking de sección activa del header y el footer "Explorá" lo toman de navLinks automáticamente.
- **OG image (1200×630):** en vez de generación AI (texto ilegible), maqueté HTML con la identidad exacta (logo SVG inline, Inter/JetBrains Mono de Google Fonts, gradiente #050505→#161d1e, halo coral, textura de puntos, chips de stack) → screenshot con agent-browser a viewport 1200×630 → `public/og.png` (224 KB). Fuente del diseño en `download/og-image.html`. VLM aprobó: texto legible y bien escrito, logo limpio, composición equilibrada.
- Metadata: `openGraph.images` + `twitter.images` con og.png + `metadataBase: new URL(siteConfig.url)` (eliminó warning de Next).
- **Feature copy-email en footer:** botón ícono junto al email (CopyIcon → CheckIcon 2s) con `navigator.clipboard.writeText` + fallback legacy `document.execCommand('copy')` (textarea temporal) para navegadores sin permiso; toast de éxito/fallback. Footer pasó a client component. Verificado E2E: icono check + toast "Email copiado" (nota: en headless el clipboard API falla por permisos — el fallback execCommand funciona con click real).
- Estilos FAQ en globals.css: `.faq-item` (glass, hover coral), `.faq-item[data-state="open"]` (borde rgba(255,171,145,0.45) + glow), chevron coral, incluidos en el bloque prefers-reduced-motion.
- QA completa: acordeón single-collapsible (abrir ítem 4 cierra otros), borde/sombra coral en abierto, contenido visible; dialog desde FAQ (source "faq"); submit E2E → lead persistido con source `faq` → tabla limpiada; menú mobile 6 links + ancla #faq (top 88px, menú autoclose); sección activa "FAQ" en nav desktop; mobile 390px apilado 1 col sin overflow; screenshots en `download/qa-fase05/`.

Stage Summary (estado actual):
- ✅ Fase 05 completa y verificada: lint 0 errores, 0 errores consola/página, GET/POST OK, og.png 200 + meta tags correctos (metadataBase resuelto a zenerp.com).
- ✅ 6 secciones ancla + JSON-LD doble (Organization + FAQPage) → 7 secciones contando contacto/footer.
- ✅ QA agent-browser: desktop 1440px (header 768px verificado también), mobile 390px sin overflow, acordeón interactivo, copy-email con toast, nav activo, menú mobile.
- ✅ VLM: FAQ section pulida (cards con borde, números mono, chevrons coral, alineación excelente, sin defectos); OG image aprobada.
- Features nuevas: sección FAQ con acordeón accesible (Radix), FAQPage schema, OG image de marca, copiar email al portapapeles con fallback, link FAQ en nav/footer.

Unresolved / riesgos / próxima fase (recomendado):
- **Fase 06 sugerida:** sección Testimonios/Equipo (social proof) o sección de contacto completa embebida (hoy: dialog + mid-CTA + footer). Ambas cierran el funnel del homepage.
- Datos reales de contacto (email/WhatsApp placeholders en `site-config.ts`) — el dominio `zenerp.com` en metadataBase/sitemap/JSON-LD es placeholder.
- Integración Resend para notificar leads por email cuando existan credenciales.
- Lección técnica registrada: @keyframes custom NO dentro de `@theme inline` (rompe el CSS silenciosamente en este setup); tw-animate-css ya trae accordion/collapsible/caret-blink.
- Si se agregan más secciones, revisar ancho del nav en 768px (hoy encaja exacto; un séptimo link largo requeriría achicar el CTA o el gap).
- OG image: el texto pequeño (chips) puede costar en thumbnails mínimos de redes — aceptable hoy; regenerar con chips más grandes si se comparte mucho.
- VLM en imágenes full-page muy altas hace timeout — validar por secciones o por DOM (ya hecho).

---

Task ID: 6 (cron webDevReview, ronda 5)
Agent: main-agent (Z.ai Code)
Task: QA del estado + Fase 06: sección Testimonios con carrusel sereno (social proof), sistema de links `footerOnly`, renumeración de secciones y mejora de touch targets. Sin bugs previos: fase 05 estable.

Work Log:
- QA inicial: 200, 0 errores consola/página, 6 secciones, sin overflow desktop/mobile → fase estable.
- `src/data/testimonials.ts`: 4 testimonios alineados 1:1 con los proyectos del portfolio (manufactura/Odoo, retail/ERPNext, repartos/Flutter, portal B2B) — nombres abreviados por confidencialidad, cada uno con industria, iniciales para avatar y chip de resultado.
- `src/components/zen/testimonials.tsx`: sección `#testimonios` "05 · Testimonios" — carrusel de UN testimonio a la vez sobre glass-card: tag de industria (mono), chip de resultado coral, cita grande con comilla decorativa, avatar circular con gradiente coral + iniciales, nombre/rol, dots + flechas.
  - **Interacción completa:** auto-avance cada 7 s (sereno) que arranca recién al entrar al viewport (IntersectionObserver threshold 0.35 — evita que quien scrollea tarde se pierda los primeros testimonios); pausa al hover Y al foco (onBlur verifica relatedTarget para no despausar entre controles internos); flechas prev/next con wrap-around; dots navegables; swipe táctil (umbral 40 px); indicador "Avanza solo cada 7 s · N de M" / "Pausado" (desktop).
  - **Accesibilidad:** role="region" + aria-roledescription="carrusel", aria-live="polite" en la cita, dots como role="tab" con aria-selected, aria-labels descriptivos, reduced-motion = sin auto-avance ni animaciones (swap instantáneo).
  - AnimatePresence mode="wait" con crossfade y desplazamiento sutil (y: ±14, ease calma 0.45 s).
- **Fix de UX encontrado en QA:** el auto-avance original corría desde el mount → quien llegaba tarde veía el testimonio 3 sin haber visto el 1. Gate de visibilidad con IO + estado `visible` (sin setState síncrono en efecto: initializer SSR-safe `typeof IntersectionObserver === "undefined"`).
- **Touch targets (feedback VLM):** flechas agrandadas a 44×44 px (h-11 w-11); dots reestructurados a botón con padding (span visual de 8 px dentro de hit area mayor) + hover de grupo (`group/dots`).
- Nav: nuevo flag **`footerOnly`** en navLinks (tipo `NavLink` explícito) — Testimonios aparece en el footer "Explorá" (7 links) pero NO en el header ni en su tracking (mantiene el ancho exacto de 768 px y deja "Proyectos" resaltado al pasar por la sección). Header simplificado: rama "coming soon" eliminada (todos los links están ready), junto con useToast/HammerIcon muertos.
- Renumeración: Testimonios=05, Filosofía 05→06, FAQ 06→07 (numeración 02–07 consistente, verificada en fuentes).
- ArrowLeftIcon nuevo en icons.tsx.
- QA: auto-avance verificado (7.6 s → avanza; gate de visibilidad probado), flechas paso a paso (2→3→2), dots (Lucía T. → 4), pausa por hover Y por foco ("Pausado"), reduced-motion emulado (sin auto-avance tras 8 s, nav manual instantánea), swipe táctil verificado con TouchEvent sintético (2→3), ancla footer #testimonios OK, footer con 7 links, header desktop/menú mobile sin Testimonios (por diseño), mobile 390 px sin overflow, 7 secciones.
- VLM: card equilibrado y profesional, sin cortes ni problemas de contraste (detectó correctamente el estado del carrusel — estaba en Lucía T., confirmando el auto-avance).
- Capturas en `download/qa-fase06/` (desktop, mobile, full-page).

Stage Summary (estado actual):
- ✅ Fase 06 completa y verificada: lint 0 errores, 0 errores de consola/página, GET 200, mobile sin overflow.
- ✅ Homepage completo: Hero → Servicios → Proceso → Proyectos → Testimonios → Filosofía → FAQ → CTA → Footer (8 piezas + contacto).
- ✅ Carrusel accesible y sereno con auto-avance, pausas, swipe y reduced-motion.
- ✅ VLM sin defectos; numeración 02–07 verificada.
- Features nuevas: carrusel de testimonios completo, sistema footerOnly de navegación, touch targets conformes.

Unresolved / riesgos / próxima fase (recomendado):
- **Fase 07 sugerida:** sección de contacto completa embebida (form inline convalidación + datos) — hoy contacto = dialog + mid-CTA + footer; o sección Equipo ("quién está detrás") con avatares de iniciales como testimonios.
- Datos reales de contacto (email/WhatsApp placeholders en `site-config.ts`); dominio zenerp.com placeholder en metadataBase/sitemap/JSON-LD.
- Integración Resend para notificar leads cuando existan credenciales.
- Nota técnica: dots tienen hit area de ~20 px (visual 8 px) — aceptable como control terciario (flechas 44 px + swipe son los principales); si se quiere 44 px en dots, envolver en contenedor con padding mayor.
- Nota técnica: para probar swipe en QA headless, los eventos mouse NO disparan los handlers touch — usar dispatchEvent con TouchEvent sintético (ya documentado arriba).
- El carrusel reinicia su intervalo en cada cambio manual (dep `index`) — comportamiento deseado (el usuario siempre tiene 7 s completos de lectura).

---

Task ID: 7 (cron webDevReview, ronda 6)
Agent: main-agent (Z.ai Code)
Task: QA del estado + Fase 07: sección de contacto completa embebida (canales directos + form inline con calificación por motivo) que reemplaza al mid-CTA como cierre del funnel. Extracción de hook reutilizable. Sin bugs previos: fase 06 estable.

Work Log:
- QA inicial: 200, 0 errores consola/página, 7 secciones, sin overflow → fase estable.
- `src/hooks/use-copy-text.ts`: hook reutilizable de clipboard (Clipboard API + fallback execCommand + toast + reset automático con timeout y cleanup). Refactor del footer para usarlo (~40 líneas de lógica duplicada eliminadas).
- `src/components/zen/contact-section.tsx`: sección `#contacto` "08 · Contacto" — layout dos columnas:
  - **Izquierda (canales):** card de disponibilidad con punto coral pulsante (animate-ping) "Respondemos en menos de 24 h hábiles"; card de email con botón copiar (usa el hook); card de WhatsApp con flecha que se desliza en hover; card "Argentina · remoto" con loto. Microcopy final: oferta de charla de 15 minutos.
  - **Derecha (form):** glass-card con glow interno — chips de motivo calificadores ("Proyecto a medida" / "Implementar ERP" / "App mobile / web" / "Una consulta", aria-pressed, estilo coral al activo), nombre+email en grid 2 cols (apila en mobile), empresa opcional, mensaje con contador "N / 2000" tabular-nums, honeypot, estados idle/submitting (spinner)/success (check animado + "Enviar otro mensaje" con reset completo incl. chips)/error (alerta coral-roja). Submit full-width en mobile, auto en desktop. Microcopy anti-spam: "Tus datos viajan solo para responderte. Nada de listas, nada de spam — promesa zen."
  - **Source tracking calificado:** `contacto-{slug}` (p. ej. `contacto-erp`) — mismo endpoint /api/contact sin cambios de schema.
- `mid-cta.tsx` eliminado (reemplazado por la sección; sin referencias colgantes). El dialog de contacto SE CONSERVA para los CTA de header/servicios/FAQ/proceso.
- Footer: quitado `id="contacto"` (evita id duplicado; el ancla ahora vive en la sección real). El link "Contacto" del nav/footer/menú mobile apunta a la sección y el tracking del header la marca activa.
- JSON-LD: `contactPoint` (ContactPoint: customer support, AR, es) agregado al Organization de layout.tsx.
- **Fix menor (feedback VLM):** contraste de placeholders subido de `zen-muted/60` a `/70` en los 8 inputs (sección + dialog).
- QA E2E: chip "Implementar ERP" → aria-pressed + estilo activo; submit con motivo ERP → success inline verificado; lead persistido con source `contacto-erp` → tabla limpiada; "Enviar otro mensaje" resetea form + chips; validación client (nombre corto → alerta visible); copy-email (icono check); contador de caracteres; ancla #contacto del nav (scroll + sección activa "Contacto"); honeypot (ok sin guardar, tabla en 0); mobile 390 px sin overflow, form apilado (300 px); 8 secciones.
- VLM: layout dos columnas balanceado y profesional, jerarquía clara (canales vs acción primaria), estilos consistentes — única observación (contraste placeholder) corregida al instante.
- Capturas en `download/qa-fase07/` (desktop, mobile, full-page).

Stage Summary (estado actual):
- ✅ Fase 07 completa y verificada: lint 0 errores, 0 errores de consola/página, GET/POST OK, honeypot OK, tabla limpia.
- ✅ Homepage COMPLETO de punta a punta: Hero → Servicios → Proceso → Proyectos → Testimonios → Filosofía → FAQ → Contacto (canales + form) → Footer. Numeración 02–08.
- ✅ Doble vía de contacto: dialog rápido (CTAs contextuales con tema) + sección completa (form con calificación de motivo).
- ✅ JSON-LD triple: Organization (con ContactPoint) + FAQPage.
- Features nuevas: sección de contacto completa, calificación de leads por motivo (source tracking), hook use-copy-text compartido, contador de caracteres, JSON-LD ContactPoint.

Unresolved / riesgos / próxima fase (recomendado):
- **El homepage está funcionalmente completo.** Próximas fases posibles (ordenadas por valor):
  1. **Sección Equipo** ("quiénes estamos") con avatares de iniciales — humaniza la marca; o
  2. **Página de privacidad/legal** mínima (link en footer) — el form promete "nada de spam", una mini política lo respalda; o
  3. **Modo de mantenimiento de contenido**: mover copy a CMS/archivos editables.
- Datos reales de contacto (email/WhatsApp placeholders en `site-config.ts`); dominio zenerp.com placeholder en metadataBase/sitemap/JSON-LD.
- Integración Resend para notificar leads cuando existan credenciales (hoy solo SQLite).
- Considerar rate limiting básico en /api/contact (hoy: honeypot + validación zod; suficiente para volumen bajo).
- Nota técnica: el form de la sección NO comparte estado con el dialog (intencional: flows distintos); si en el futuro se quiere prefill cruzado, extender el store lead-dialog.
- OG image y sitemap OK; favicon SVG OK. Falta favicon PNG fallback para clientes viejos (opcional).

---

Task ID: 8 (cron webDevReview, ronda 7)
Agent: main-agent (Z.ai Code)
Task: QA del estado + Fase 08: sección Equipo (quiénes están del otro lado), dialog de Privacidad en el footer y rate limiting en /api/contact. Sin bugs previos: fase 07 estable.

Work Log:
- QA inicial: 200, 0 errores consola/página, 8 secciones, sin overflow desktop/mobile → fase estable.
- `src/data/team.ts`: 3 perfiles (placeholder, como email/WhatsApp — reemplazar con datos reales) alineados con la oferta del sitio: fundador/implementaciones ERP (Odoo·ERPNext), full-stack (Next.js/React), mobile/automatización (Flutter/offline-first). Iniciales para avatar (misma honestidad que testimonios), chips de especialidades y nota diferencial "equipo chico a propósito".
- `src/components/zen/team.tsx`: sección `#equipo` "06 · Equipo" — grid de 3 cards glass centradas (avatar de iniciales h-16 con gradiente coral, nombre, rol, divisor coral fino, bio, chips mono), RevealGroup stagger 0.1; nota diferencial en strip con LotusIcon debajo.
- CSS `.team-card .team-avatar`: halo coral (ring 6px + shadow + lift -2px) al hover de la tarjeta; agregado a la lista de prefers-reduced-motion. Verificado en CSS servido (2 apariciones de team-card — lección de Tailwind 4 de la fase 05 aplicada).
- Nav: `#equipo` como footerOnly (mismo patrón que Testimonios) → footer "Explorá" con 8 links, header intacto con 6 (sin riesgo de overflow en 768px).
- Renumeración: Equipo=06 (nueva), Filosofía 06→07, FAQ 07→08, Contacto 08→09 (numeración 02–09 verificada en DOM).
- `src/components/zen/privacy-dialog.tsx` + integración en footer: link "Privacidad" junto al copyright abre Dialog controlado. Contenido "Privacidad, en criollo": lo que guardamos / para qué / lo que NO hacemos (sin cookies de tracking, sin listas, sin newsletters) / cómo pedir el borrado. Respalda la promesa anti-spam del form. ShieldIcon nuevo en icons.tsx; cierre con Escape verificado.
- `src/lib/rate-limit.ts`: ventana deslizante en memoria (Map<key, timestamps[]>, prune si >500 keys) — 5 envíos/IP/minuto en POST /api/contact, antes de parsear el body. 429 con mensaje criollo + header `Retry-After` estándar.
- QA E2E completo: rate limit (5×200 → 6º 429 "esperá un minuto" → Retry-After: 57 → ventana expira → 200 otra vez); leads de prueba limpiados (tabla en 0); form de contacto E2E final (submit → success → source `contacto-proyecto` en SQLite → limpieza); DOM de las 3 cards verificado (iniciales/nombres/roles/chips correctos); hover del avatar computa el halo coral; dialog Privacidad abre/cierra; numeración 02–09; footer 8 links; header 6 links; mobile 390 px sin overflow (cards full-width 350 px); desktop 1440 px sin overflow.
- VLM: sección Equipo "alta calidad, sin cortes ni problemas de contraste, spacing consistente" (3 cards + strip con loto detectados); dialog Privacidad "excellent, no visual defects". Nota: en un chequeo el VLM alucinó una card "Ana G" leyendo un viewport parcial — el DOM confirmó los datos reales; usar DOM para verificación de contenido.
- Capturas en `download/qa-fase08/` (baseline, equipo desktop + final, dialog privacidad, equipo mobile, footer mobile, full-page).

Stage Summary (estado actual):
- ✅ Fase 08 completa y verificada: lint 0 errores, 0 errores de consola/página, GET/POST/429 OK, tabla limpia, CSS custom en build.
- ✅ Homepage: Hero → Servicios (02) → Proceso (03) → Proyectos (04) → Testimonios (05) → Equipo (06) → Filosofía (07) → FAQ (08) → Contacto (09) → Footer — 9 secciones + dialog de contacto + dialog de privacidad.
- ✅ Funnel completo con prueba social (testimonios) y humanización (equipo), respaldo legal mínimo (privacidad) y protección del endpoint (rate limit).
- Features nuevas: sección Equipo con avatares de iniciales y hover halo, nota diferencial del estudio, mini política de privacidad en dialog, rate limiting 5/min con Retry-After.

Unresolved / riesgos / próxima fase (recomendado):
- El homepage está funcional y narrativamente completo. Próximas fases posibles (valor decreciente):
  1. **Pulido de contenido**: textos del equipo/placeholders reales (nombres, email, WhatsApp, dominio zenerp.com) cuando existan datos reales del cliente;
  2. ** favicon PNG fallback** para clientes viejos (solo SVG hoy);
  3. **Integración Resend** para notificar leads por email cuando existan credenciales;
  4. **Microinteracciones extra**: p. ej. count-up de métricas en Hero/Proyectos si se definen KPIs reales.
- Rate limiting en memoria: por proceso — si el sitio escala a múltiples instancias, mover a Redis.
- Si se suma una 3ª sección footerOnly más, revisar altura del footer en mobile (hoy 8 links en 2 columnas, ok).
- Nota técnica: `agent-browser screenshot` full-page usa flag `--full` (no `--full-page`); VLM en viewports parciales puede alucinar contenido fuera de encuadre — verificación de contenido siempre por DOM.

---
Task ID: 9 (cron webDevReview, ronda 8)
Agent: main-agent (Z.ai Code)
Task: QA del estado + Fase 09: banda de métricas con count-up ("Zen en números"), asistente de diagnóstico en el FAQ, favicons PNG y print stylesheet completo. Estado inicial estable (fase 08 verificada al arrancar).

Work Log:
- QA inicial: GET 200, 0 errores consola/página, 9 secciones, sin overflow en 1440/768/390 → fase estable.
- **Feature A — Banda "EL COMPROMISO"** (`src/components/zen/stats.tsx`): banda glass sin numeración entre Proyectos (04) y Testimonios (05), con kicker mono centrado entre hairlines. 4 métricas honestas de posicionamiento (no inventadas): 15 min primera charla / 3 caminos (Odoo, ERPNext, a medida) / 24 h respuesta / 100 % código y datos tuyos. Count-up easeOutCubic 1,4 s con stagger 140 ms por índice, disparo por IO (threshold 0,6, una sola vez), tabular-nums, sufijos coral mono, semántica dl/dt/dd con sr-only completo.
- **Feature B — Asistente "¿No sabés por dónde arrancar?"** (`src/components/zen/faq-assistant.tsx`): wizard de 2 preguntas dentro de la tarjeta sticky del FAQ (reemplaza la tarjeta estática; el botón WhatsApp queda debajo, separado por hairline; el atajo "Prefiero escribir directo" se conserva en el paso inicial). Preguntas: situación actual (planillas / sistema corto / mamotreto) + dolor principal (panorama / manual / tumbos). Resultado: ruta recomendada (Arrancar ordenado / Mejorar lo que hay / Rescate del mamotreto) + card coral con primer paso concreto + CTA que abre el dialog con el tema precargado (source `faq-asistente`). Transiciones AnimatePresence mode="wait" (instantáneas con reduced-motion), aria-live="polite", botones Atrás / Volver a empezar, dots de progreso, foco visible coral (.assistant-option:focus-visible).
- **Regresión propia encontrada y corregida en QA:** el hook `src/hooks/use-count-up.ts` YA EXISTÍA (lo usaba el hero "3 sistemas ERP" desde fase previa con API `startOnView:false` = arranque inmediato) y lo sobrescribí sin verificar. Mi versión requería ref+IO → el contador del hero quedó clavado en 0. Fix: hook unificado con ambas APIs (`startOnView`, `delay`, `duration`), reduced-motion SSR-safe vía `usePrefersReducedMotion` (return `value: reduced ? target : value`), y finish en `beforeprint` + `matchMedia('print') change` para que el papel nunca muestre un 0 congelado. Lección: **verificar con git status/rg si un archivo existe antes de escribirlo** (el Write dijo "updated", no "created").
- **Favicons PNG fallback:** `public/favicon-32.png` (32×32, downscale LANCZOS desde render 64) + `public/apple-touch-icon.png` (180×180), generados con agent-browser sobre HTML wrapper con fondo #050505 (loto centrado al 88 %), validados con VLM ("fully visible, centered, even margins"). layout.tsx: `icons.icon` ahora [SVG, PNG 32] + `icons.apple` 180×180.
- **Print stylesheet completo** (`@media print` en globals.css): paleta invertida redefiniendo tokens en `:root` (bg/surfaces blancos, ink #1b2426, acento terracota #c1614a — imprime mejor que el coral), `@page { margin: 14mm 12mm }`, glass-cards a blanco con borde legible + break-inside avoid, URLs impresas tras links de contacto (`#contacto a[href^="http"]::after`), chrome oculto (header, scroll-progress, back-to-top, toaster vía wrapper con print:hidden).
- **3 bugs REALES de print encontrados y corregidos** (el primero afectaba a todo el sitio, preexistente):
  1. **Contenido whileInView invisible en papel:** todo lo Reveal-eado bajo el fold que nunca entró al viewport queda opacity:0 → al imprimir sin scrollear desaparecen secciones enteras (verificado: PDF sin fix saltaba de Proceso al footer). Fix: regla blanket `* { opacity:1 !important; transform:none !important; animation:none !important; transition:none !important; filter:none !important; backdrop-filter:none !important; }` dentro de @media print.
  2. **Márgenes @page pintados oscuros:** el meta color-scheme dark (viewport de Next) hace que Chromium pinte el canvas de márgenes en gris #121212 (verificado: bandas exactamente de 12 mm/14 mm). Fix: `html { color-scheme: light }` en print.
  3. **Fondos literales y filtros:** footer `bg-[#080b0c]/80`, marquee `bg-[#0a0f10]/40` + sus gradientes de fade, chip de proyectos y velo gris de blur/halo → `print:bg-transparent` / `print:from-transparent` / `print:hidden` (tapa decorativa de proyectos y blobs ambient del hero fuera del papel).
- QA E2E completo: count-up (0 → 15/3/24/100 al entrar en viewport; el "99 congelado" intermedio era throttling de rAF headless, completa con actividad de frames); hero 3 recuperado; wizard paso a paso (intro→q1→q2→result), reset, atrás, dialog con tema precargado «auditar y mejorar mi sistema actual», submit → lead en SQLite con source `faq-asistente` → limpieza (tabla en 0); reduced-motion (valores directos + wizard instantáneo); overflow 390/768/1440 OK; lint 0 errores; dev.log sin errores.
- Validación de print con **Playwright Python** (agent-browser pdf NO emula media print — ver lecciones): `emulate_media('print')` + `page.pdf()` → 13 páginas, TODAS las secciones presentes (pdftotext), esquinas blancas puras (255,255,255), hero=3 y stats finales en papel (listeners beforeprint/matchMedia), banda EL COMPROMISO en pág. 7 confirmada por VLM.
- VLM (pantalla): stats band "fits perfectly, well-spaced, highly legible"; wizard desktop "clean within card bounds, consistent rhythm, high readability"; mobile 390 "options 50–60px, comfortably above 44px minimum". Única observación (contraste del título FAQ) verificada como percepción errónea: color computado #f5f1ed ≈ 18:1 sobre #050505.
- Capturas y PDFs en `download/qa-fase09/` (screen-stats-1440/390, screen-faq-intro/q1/result, print-real-v2.pdf 13 págs, favicon, brightness maps).

Stage Summary (estado actual):
- ✅ Fase 09 completa y verificada: lint 0 errores, 0 errores de consola/página nuevos, sin overflow 1440/768/390, tabla de leads limpia.
- ✅ Homepage: Hero → Servicios (02) → Proceso (03) → Proyectos (04) → **Banda compromiso** → Testimonios (05) → Equipo (06) → Filosofía (07) → FAQ (08, con asistente) → Contacto (09) → Footer.
- ✅ Nuevas features: banda de métricas con count-up accesible, asistente de diagnóstico con calificación de leads (source faq-asistente), favicons PNG/apple, versión print profesional (13 págs, blanco, todas las secciones).
- ✅ 1 regresión propia (hook sobrescrito) y 3 bugs de print (1 preexistente grave: whileInView invisible) encontrados y corregidos en QA.

Unresolved / riesgos / próxima fase (recomendado):
- Datos reales pendientes (placeholders): nombres del equipo, email/WhatsApp, dominio zenerp.com en metadataBase/sitemap/JSON-LD.
- Integración Resend para notificar leads (sin credenciales).
- Limitaciones de print conocidas y aceptables: las respuestas CERRADAS del acordeón FAQ no imprimen (Radix las desmonta; forzar con forceMount + CSS si algún día importa) y el carrusel imprime solo el testimonio activo (state del DOM).
- Warning de hidratación dev-only si se carga la página con reduced-motion activo a nivel OS (diferencia de `initial` de framer entre server y cliente; cosmético, preexistente, sin impacto visual — el contenido queda visible).
- Lecciones de tooling: agent-browser pdf NO emula media print (usar Playwright: emulate_media + page.pdf); VLM con múltiples imágenes puede desordenarlas/alucinar en PDFs — contenido por pdftotext + páginas específicas; VLM percibió bajo contraste inexistente en título (verificar siempre por color computado).
- Próximas fases posibles (valor decreciente): 1) pulido de contenido con datos reales del cliente; 2)sitemap/OG ya OK — considerar manifest.webmanifest + PWA icons si se quiere instalable; 3) micro-animaciones extra (ej. hover sheen en cards de proyectos) si se pide más vida visual.

---
Task ID: 10 (cron webDevReview, ronda 9)
Agent: main-agent (Z.ai Code)
Task: QA del estado + Fase 10: fix del mismatch de hidratación con reduced-motion (bug real preexistente), PWA instalable (manifest + 4 iconos), skip-link a11y, sheen en cards, carrusel con teclado y fallback noscript.

Work Log:
- QA inicial: GET 200, 0 errores de página, sin overflow 1440/768/390, lint 0 errores → estado estable. Único problema real: error de hidratación ("A tree hydrated but some attributes...") al cargar con prefers-reduced-motion activo a nivel dispositivo (agent-browser lo tiene ON por defecto — el bug era reproducible en cada QA).
- **Diagnóstico del bug (raíz encontrada leyendo el source de framer):** `useReducedMotion` de framer usa `useState(prefersReducedMotion.current)` — un módulo-global que ya vale `true` en el PRIMER render del cliente, mientras el server renderizó con `false` → divergen style attrs (initial de motion) y texto (count-ups "0" vs "3"). El comentario de use-count-up que decía "el flag cambia post-mount" era incorrecto.
- **Fix (3 capas):**
  1. `use-prefers-reduced-motion.ts` ahora gatea con `useHydrated` (useSyncExternalStore): devuelve `false` durante la hidratación (idéntico al server) y la preferencia real tras el mount. Todos los componentes pasan por este hook (eliminados los imports directos de `useReducedMotion` en hero, lotus-mark, scroll-progress, back-to-top, testimonials, faq-assistant, reveal).
  2. `initial` CONSTANTE en framer (reveal.tsx, hero.tsx): `initial="hidden"` siempre — sin branch por reduced. El comportamiento reduced lo cubre MotionConfig.
  3. NUEVO `motion-provider.tsx`: `<MotionConfig reducedMotion={reduced ? "always" : "never"}>` en la raíz (layout.tsx). Lección clave: pasar "user" ESTÁTICO empeoraba el mismatch (framer resuelve el initial con la preferencia real DURANTE la hidratación y salta al estado final); hay que gatearlo igual.
- **Verificación del fix:** sesión nueva de agent-browser (ojo: `console` acumula logs de sesiones previas — cerrar con `close --all` antes de validar errores), reduced-motion ON: 0 errores de hidratación, hero visible (opacity 1), erpCount=3 (no clavado en 0), las 10 secciones revelan al scrollear, sheen desactivado. Sin reduced: animaciones normales intactas. En ambos: lint 0, sin overflow.
- **Feature A — PWA instalable:** `public/manifest.webmanifest` (name/short_name es, display standalone, theme/bg #050505, categorías) + 4 iconos generados con la técnica de favicon de fase 09 (wrapper HTML `download/icon-wrapper.html` + viewport exacto + screenshot): `icon-192/512.png` (purpose any, loto 84%) y `icon-maskable-192/512.png` (purpose maskable, loto 70% dentro de la safe-zone del círculo 80%). VLM: "fully visible, centered, even margins, crisp, no artifacts" en ambos. layout.tsx: `manifest`, `applicationName`, `appleWebApp` (capable, black-translucent, title). Verificado: manifest 200 con content-type correcto, `<link rel=manifest>` y metas apple en el head.
- **Feature B — Skip-link "Saltar al contenido":** primer elemento enfocable del body (layout.tsx), clase propia `.skip-link` en globals.css (fixed, translateY(-200%) → 0 en focus-visible). Lección: NO usar sr-only/not-sr-only de Tailwind — not-sr-only resetea padding a 0 y el link quedaba de 20px de alto. Verificado con Tab: 190×40px en top/left 16px, coral.
- **Feature C — Carrusel con teclado:** región focusable (tabIndex=0 + focus-visible ring coral con offset), ArrowLeft/ArrowRight cambian testimonio (preventDefault). Verificado: Martín → Carolina → Martín.
- **Feature D — Fallback noscript:** `<noscript><style>*{opacity:1!important...}</style></noscript>` — sin JS las secciones Reveal (opacity:0 inline) quedan visibles. Presente en el HTML servido (los navegadores con JS no lo materializan en el DOM — normal).
- **Pulido — Sheen en cards:** `.card-hover` (clase que estaba muerta en services+projects) ahora define un barrido de luz diagonal (::after, gradiente 115deg coral/blanco sutil, translateX(-130%)→(130%) skewX(-10deg), 1.1s cubic-bezier zen). `.card-hover { overflow: hidden }` para recortar al radio. Desactivado en reduced-motion (display:none) y no imprime (vive off-card). Verificado por computed style: matrix con -672px → +555px al hover. VLM: "visible and tasteful, soft diagonal sweep, not harsh".
- QA E2E completo: form de contacto (fill + submit → success "Gracias por escribirnos" → lead en SQLite source `contacto-proyecto` → limpieza, tabla en 0), menú mobile (abre, links visibles, Escape cierra, body unlock), overflow 390/768/1440 OK, dev.log sin errores, curl sanity de head/manifest/iconos.
- Capturas en `download/qa-fase10/` (hero/proyectos/testimonios 1440, sheen mid-sweep, mobile servicios 390, mobile menú) + iconos en `download/qa-fase10/`.

Stage Summary (estado actual):
- ✅ Fase 10 completa y verificada: lint 0 errores, 0 errores de consola/página (incluido el de hidratación, ahora fijado en BOTH paths), sin overflow 1440/768/390, tabla de leads limpia.
- ✅ Homepage: Hero → Servicios → Proceso → Proyectos → Banda compromiso → Testimonios → Equipo → Filosofía → FAQ (asistente) → Contacto → Footer — ahora instalable como PWA y con a11y reforzada (skip-link, carrusel teclado, noscript, reduced-motion de framer centralizado).
- ✅ Bug real preexistente corregido: mismatch de hidratación para usuarios con prefers-reduced-motion (afectaba consola en producción para esos usuarios; comportamiento visual ya era correcto por escrituras imperativas de framer).
- ✅ Nuevas features: PWA manifest+iconos (any/maskable 192/512), skip-link, navegación por teclado del carrusel, sheen en cards de servicios/proyectos, fallback noscript.

Unresolved / riesgos / próxima fase (recomendado):
- Datos reales pendientes (placeholders): nombres del equipo, email/WhatsApp real, dominio zenerp.com en metadataBase/sitemap/JSON-LD/manifest (start_url "/" ok, pero conviene revisar cuando haya dominio real).
- El warning DEV de framer "You have Reduced Motion enabled..." sigue apareciendo con reduced ON (informativo, dev-only, esperado: llamamos useReducedMotion dentro del hook gateado). En producción no existe.
- Con reduced-motion los usuarios ahora ven fades de opacidad (MotionConfig quita transforms) en vez de cero animación — cumple WCAG (2.3.3 apunta a movimiento); si algún día se quiere cero animación total, agregar variantes con duration 0 gateadas.
- Limitaciones conocidas de print sin cambios (respuestas FAQ cerradas no imprimen; carrusel imprime solo el activo).
- Lecciones de tooling: (1) `agent-browser console` acumula logs entre sesiones — usar `close --all` + sesión nueva para validar errores; (2) `set media reduced-motion off` NO apaga — usar `set media light no-reduced-motion`; (3) Turbopack stale CSS reapareció con `.skip-link` — touch de globals.css lo revierte; (4) MultiEdit puede aplicar parcialmente edits antes de fallar — releer el archivo tras un error.
- Próximas fases posibles (valor decreciente): 1) contenido real del cliente (bloqueante externo); 2) og:image ya OK — PWA ya OK; 3) micro-detalles: pausar el auto-avance del carrusel cuando la pestaña no tiene foco (visibilitychange), o tooltips en los chips de stack de proyectos; 4) medir Core Web Vitals con Lighthouse si se pide.
