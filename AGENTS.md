# AGENTS.md

## Purpose

This file is the repository-level operating contract for coding agents working on **Zen ERP Homepage**.

Read this file before making changes.

The most important rule is simple:

> **This project uses Bun. Do not introduce another package manager or create alternate project setup just to make the repository run.**

---

## 1. Project Identity

- Repository: `4beru/zenerp-homepage`
- Default branch: `main`
- Framework: **Next.js**
- UI: **React + TypeScript**
- Styling: **Tailwind CSS + CSS**
- Component primitives: **shadcn/ui / Radix**
- Animation: **GSAP** and existing motion utilities
- Database layer: **Prisma**, used by project features that require persistence
- Package manager / JavaScript runtime: **Bun**

This is an existing application. Treat the repository as the source of truth.

Do not scaffold, reinitialize, migrate, or recreate the application unless the task explicitly requires it.

---

## 2. Startup — Do Not Invent Setup Steps

The standard development setup is intentionally minimal.

Run exactly:

```bash
bun install
bun run dev
```

The development server is configured by `package.json` to run:

```text
next dev -p 3000 -H 0.0.0.0
```

Therefore the normal development URL is:

```text
http://localhost:3000
```

### Do NOT replace Bun with another package manager

Do not use these as project setup commands:

```bash
npm install
npm run dev
npx ...
yarn install
yarn ...
pnpm install
pnpm ...
```

Do not create any of the following just because an environment or tool normally expects them:

- `package-lock.json`
- `yarn.lock`
- `pnpm-lock.yaml`
- another Bun lockfile
- a second `package.json`
- a second application root
- a new `node_modules` strategy
- a new framework configuration
- a generated wrapper project

The existing `bun.lock` is the dependency lockfile and must be preserved.

If dependencies need to be added or updated, use Bun and update the existing dependency files instead of introducing another package manager.

---

## 3. Environment Rules

Before changing environment configuration, inspect:

- `.env.example`
- `src/lib/assets.ts`
- `next.config.ts`
- existing API/database code

Do not create or modify environment files as part of routine startup unless the task actually requires it.

The repository already documents the optional/public asset configuration in `.env.example`.

Do not invent new environment variables when an existing project variable or implementation already solves the problem.

Never commit secrets.

---

## 4. Repository Structure

Relevant application structure:

```text
.
├── src/
│   ├── app/             # Next.js App Router, routes, metadata, API routes
│   ├── components/
│   │   ├── hero/        # Hero and Hero media implementation
│   │   ├── ui/          # Reusable UI primitives
│   │   └── zen/         # Zen ERP site-specific sections/components
│   ├── data/            # Content/data modules
│   ├── hooks/           # Shared React hooks
│   └── lib/             # Utilities, assets, DB, rate limiting, configuration
├── public/              # Static assets and Hero media
├── prisma/              # Prisma schema
├── DESIGN.md            # Visual/design source of truth
├── package.json         # Scripts and dependencies
├── bun.lock             # Bun dependency lockfile
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
├── eslint.config.mjs    # ESLint configuration
└── tailwind.config.ts   # Tailwind configuration
```

Use the existing architecture.

Do not create a parallel structure such as:

```text
app/
components/
pages/
website/
frontend/
web/
src-new/
```

unless the task explicitly calls for an architectural migration.

---

## 5. Before Editing Code

For every non-trivial task:

1. Inspect the existing implementation.
2. Read the relevant component(s), data module(s), and styles.
3. Read `DESIGN.md` for visual/interaction work.
4. Check `package.json` before adding a dependency.
5. Reuse existing utilities and components where appropriate.
6. Make the smallest coherent change that solves the requested problem.

Do not start by scaffolding files from a generic template.

Do not assume that a missing feature means a missing framework or dependency.

---

## 6. Design System Is a Contract

`DESIGN.md` is the design source of truth for the homepage.

Before changing visual design, read it.

Core visual direction:

- dark-first
- editorial
- technical
- calm
- warm
- precise
- confident
- typography-led
- architectural grid
- hairlines
- restrained terracotta accent
- measured motion

Avoid introducing generic SaaS visual language without a concrete reason.

Do not add visual dependencies only because they are available.

Do not use animation, WebGL, 3D, particle systems, cursor effects, or heavy visual libraries unless the task explicitly needs them and the existing architecture supports them.

The preferred implementation principle is:

> **Use the simplest technology that achieves the intended visual result.**

---

## 7. Current Hero Architecture

The Hero is an important visual reference for the rest of the site.

Current conceptual structure:

```text
Hero
├── HeroBackground
│   ├── native HTML video / media layer
│   └── CSS overlays, grain, grid, etc.
└── HeroContent
    └── GSAP entrance / scroll behavior
```

Respect the separation between:

- media
- semantic content
- animation
- layout

Do not replace existing native media with a new rendering engine without an explicit requirement.

---

## 8. Homepage Sections — Inspect the Real Entry Point

The active homepage composition is defined by:

```text
src/app/page.tsx
```

Never infer which sections are active only from filenames.

This repository contains historical/legacy section components and data modules alongside the current work.

For example, files may exist under:

```text
src/components/zen/
src/data/
```

without necessarily being part of the final intended homepage.

Before deleting, restoring, or adding sections:

1. inspect `src/app/page.tsx`
2. inspect the relevant component
3. check `DESIGN.md`
4. consider whether the component is intentionally retained for later work

Do not perform broad cleanup simply because a file appears unused unless the task explicitly requests cleanup.

---

## 9. Dependency Policy

Before adding a package:

1. Check whether the repository already has the capability.
2. Check `package.json`.
3. Check existing utilities/components.
4. Prefer the existing stack.
5. Add a dependency only when it provides a real requirement that cannot reasonably be handled by the current codebase.

Do not add packages for:

- basic CSS effects
- simple animations already covered by GSAP
- utility functions that can be implemented locally
- framework setup that already exists
- replacing Bun behavior with Node/npm workflows

After dependency changes, keep `package.json` and `bun.lock` consistent.

---

## 10. Next.js Rules

This is a Next.js App Router project.

Respect the existing conventions:

- `src/app` contains routes and application entry points.
- Server/client boundaries should remain intentional.
- Do not introduce Pages Router files unless explicitly required.
- Do not replace the current Next.js configuration merely to satisfy a generic template.
- The repository intentionally uses standalone output in `next.config.ts`.
- Do not remove existing configuration without verifying its deployment purpose.

The current configuration also intentionally ignores TypeScript build errors during Next.js builds.

Do not silently change that behavior while solving unrelated tasks.

---

## 11. TypeScript and Imports

Use the existing path alias:

```text
@/* -> ./src/*
```

Prefer imports such as:

```ts
import { Something } from "@/components/zen/something";
```

Avoid unnecessarily introducing new relative import trees when the existing alias is appropriate.

Keep TypeScript changes compatible with the current `tsconfig.json`.

---

## 12. UI Components

Reusable UI primitives are under:

```text
src/components/ui/
```

Site-specific components are primarily under:

```text
src/components/zen/
```

Hero-specific components are under:

```text
src/components/hero/
```

Do not duplicate an existing primitive just because a generic UI template would normally generate one.

Modify an existing primitive when the change is genuinely reusable.

Keep page-specific behavior in page/site components when that is the existing pattern.

---

## 13. Styling

Use the existing Tailwind/CSS system.

Before introducing new design tokens, colors, shadows, radii, or typography, inspect:

- `src/app/globals.css`
- `tailwind.config.ts`
- `DESIGN.md`

Do not create arbitrary parallel token systems.

Prefer existing Zen ERP tokens and composition rules.

Do not introduce unrelated neon palettes, arbitrary gradients, or excessive glassmorphism.

---

## 14. Animation

Existing animation technology includes GSAP and existing motion components/hooks.

Use motion intentionally.

For new animated UI:

- provide a complete static state
- respect reduced-motion preferences
- avoid unnecessary continuous animation
- avoid exaggerated bounce or scaling
- keep animation subordinate to content and typography

Do not install another animation framework unless the task has a demonstrated need for it.

---

## 15. Media and Assets

Static assets live under `public/`.

Hero asset resolution is handled through existing code under:

```text
src/lib/assets.ts
```

Do not invent a second asset-loading system.

Before adding large media:

- inspect existing asset conventions
- inspect CDN/fallback behavior
- preserve the existing media architecture
- avoid committing unnecessarily large generated artifacts

Do not replace the current Hero media pipeline merely because another agent/template normally uses a different asset system.

---

## 16. Database

Prisma is part of the existing project.

Relevant files:

```text
prisma/schema.prisma
src/lib/db.ts
```

Do not introduce a second ORM or database client.

Do not perform destructive database operations unless the task explicitly requires them.

In particular, do not run destructive Prisma commands merely to make the development server start.

---

## 17. Validation

After making changes, validate the smallest relevant surface first.

Typical development flow:

```bash
bun run dev
```

For code quality where appropriate:

```bash
bun run lint
```

For a production build where appropriate:

```bash
bun run build
```

Do not run expensive or destructive commands unnecessarily.

Do not change project configuration solely to make a validation command pass.

When a command fails, diagnose the existing project first before changing dependencies or architecture.

---

## 18. Agent Behavior — Important

Agents working in this repository must not:

- initialize a new npm/yarn/pnpm project
- run `npm install` or equivalent package-manager commands
- create duplicate dependency manifests
- create duplicate application roots
- add generic starter-template files
- replace existing configuration without inspecting it
- rewrite the project structure to match the agent's preferred framework conventions
- add dependencies without checking the existing stack
- create generated documentation or tool directories unless explicitly required
- delete existing project files as speculative cleanup
- replace working code with a generic scaffold
- invent environment variables or services without checking the repository first
- add visual technology merely because it is fashionable or available

### Especially important

If the repository already works with:

```bash
bun install
bun run dev
```

do not make changes to the repository just to satisfy an agent's assumption that npm, Vite, a different Next.js structure, or additional setup is required.

---

## 19. Change Discipline

Every change should have a clear relationship to the requested task.

Prefer:

```text
inspect -> understand -> modify -> validate
```

Avoid:

```text
scaffold -> install everything -> reorganize -> modify
```

Keep unrelated formatting churn and opportunistic refactors out of focused tasks.

Do not modify files outside the task scope unless the change is necessary to keep the application coherent.

---

## 20. Documentation

Use these documents according to their purpose:

### `AGENTS.md`

Repository operating rules for coding agents.

### `DESIGN.md`

Visual, interaction, responsive, accessibility, and design-system contract.

### `worklog.md`

Historical/project work notes when relevant.

Do not replace `DESIGN.md` with a new design document.

Do not create another agent instruction file unless explicitly required for a specific agent ecosystem.

---

## 21. Definition of Done

A change is complete when:

- it solves the requested task
- it fits the existing architecture
- it uses the existing Bun workflow
- it does not introduce unnecessary dependencies or directories
- visual changes conform to `DESIGN.md`
- responsive behavior is intentional
- accessibility is preserved
- relevant validation has been performed
- unrelated files remain untouched

---

## 22. Final Rule

When uncertain, prefer preserving the repository's existing conventions over applying generic agent or framework conventions.

**This repository is already configured. Inspect it first.**
