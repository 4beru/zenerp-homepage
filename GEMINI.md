# GEMINI.md — Agent Operating Contract

This document codifies the mandatory operating rules for Gemini and coding agents in the **Zen ERP** repository (`4beru/zenerp-homepage`), strictly binding to `AGENTS.md` and explicit user instructions.

---

## 1. Absolute Directives

### A. Strictly English Language for All Copy
- **ALL user-facing content MUST be in English**:
  - Headings, body copy, taglines, kickers, metadata, subtitles.
  - Buttons, links, form placeholders, error states, and tooltips.
  - HTML document language must be `lang="en"`.
  - SEO metadata, OpenGraph tags, and JSON-LD schema must be in English.
- **NO Spanish text** anywhere on the user-facing interface unless explicitly requested by the user.

### B. Bun Runtime & Lockfile Integrity
- Follow `AGENTS.md`: This repository uses **Bun**.
- Preserve `bun.lock`. Do NOT run `npm install`, `yarn`, or `pnpm`.
- Do NOT generate `package-lock.json` or alternate lockfiles.

### C. Non-Blocking UI & Zero-Failure Intro Sequences
- Any loading screen, preloader, or entrance motion MUST be **completely non-blocking**:
  - Time-boxed to under 1.2 seconds max.
  - If `prefers-reduced-motion` is active, it must resolve immediately (0ms).
  - Storage operations (`sessionStorage` / `localStorage`) MUST be safely wrapped in `try/catch` blocks to prevent crashes in sandboxed iframes.
  - In all failure modes or timeouts, the loader MUST automatically detach / hide so the user can never be locked out of the website.
  - `pointer-events: none` on loader overlays at all times.

---

## 2. Visual System & Architecture

- **Dark-first, architectural, editorial, precise, calm**.
- Scene sequence:
  - Hero: `#050505` (Dark Cinematic)
  - Services / Selected Works: `#0C1011` (Dark Technical)
  - Approach: `#F0EBE6` (Warm Editorial Light Scene)
  - Contact: `#050505` (Return to Dark)
  - Footer: Quiet architectural dark.
- Accent: Restrained Terracotta `#CB4B16`.
- Typography: Clash Display / Space Grotesk display headings, Inter body, tabular numerals for data.
- Centralized media repository: All media lives in `src/data/media.ts`.

---

## 3. Reference to AGENTS.md

All guidelines and architectural boundaries defined in `AGENTS.md` remain in full effect. Inspect before modifying, preserve working infrastructure, and validate using `compile_applet` and `lint_applet`.
