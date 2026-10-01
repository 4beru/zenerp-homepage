# Zen ERP — Design System

> Status: Active  
> Scope: Homepage / marketing site  
> Primary reference: Hero v1  
> Design owner: Zen ERP

## 1. Purpose

This document is the visual and interaction contract for the Zen ERP homepage.

The Hero established the first mature expression of the brand. Future sections must inherit its visual language without mechanically copying its composition.

The goal is a single system that feels:

- editorial
- technical
- calm
- warm
- precise
- confident
- intentionally crafted

DESIGN.md is a source of truth for redesign work. A component may deviate only when there is a clear content, responsive, accessibility or functional reason.

---

## 2. Brand Direction

### Core idea

Zen ERP is a creative software studio focused on design, engineering, digital products and business systems.

The visual language should feel closer to a product studio or architecture practice than to a generic SaaS landing page.

### Personality

| Quality | Expression |
|---|---|
| Calm | low visual noise, measured motion |
| Precise | alignment, proportion, hairlines |
| Technical | monospace metadata, system markers |
| Editorial | oversized type, whitespace, asymmetry |
| Warm | terracotta accent, warm off-white |
| Confident | concise copy, clear hierarchy |
| Human | plain language, no artificial buzzwords |

---

## 3. Visual Principles

### 3.1 Typography leads

Typography carries more visual weight than cards, shadows or decorative effects.

Prefer large display headlines, compact supporting copy, monospace metadata and strong hierarchy.

### 3.2 Structure over ornament

Create visual interest with:

- alignment
- whitespace
- grid
- hairlines
- metadata
- image/video composition
- subtle contrast
- controlled motion

Do not add effects merely because the technology makes them possible.

### 3.3 Dark, but not flat

The interface is dark-first. Surfaces must still have enough tonal separation to establish hierarchy.

Use:

background → surface → raised surface → accent

### 3.4 Accent is a signal

Terracotta is an emphasis color, not the dominant canvas.

Use it for active states, CTAs, markers, links and deliberate highlights.

### 3.5 Every visual primitive needs a reason

Avoid decoration whose only job is to make a section look impressive.

---

## 4. Color System

Current brand tokens:

~~~css
--zen-bg: #050505;
--zen-bg-to: #0c1011;
--zen-surface: #0e1315;
--zen-surface-raised: #151c1e;

--zen-accent: #cb4b16;
--zen-accent-strong: #d9531e;
--zen-accent-soft: rgba(203, 75, 22, 0.12);

--zen-ink: #eee8d5;
--zen-muted: #839496;
--zen-line: rgba(238, 232, 213, 0.08);
~~~

### Usage

- Background: dominant dark canvas.
- Ink: primary text, intentionally warmer than pure white.
- Muted: secondary copy and metadata.
- Accent: interaction and emphasis.
- Line: structure and separation.

Do not introduce unrelated neon palettes, arbitrary accents or generic blue/purple SaaS gradients without a concrete reason.

---

## 5. Typography

### Display

Space Grotesk.

Use for major titles, Hero headlines and key numerical statements.

Preferred characteristics:

- bold
- compact tracking
- short line-height
- controlled line breaks

### Body

Inter.

Use for paragraphs, descriptions, forms and long-form reading.

### Metadata

Use the existing monospace stack for:

- section numbers
- status labels
- coordinates
- contextual markers
- technical classifications
- small navigation labels

Metadata should be small, low-contrast and structured.

### Hierarchy

The usual sequence is:

section marker / eyebrow  
↓  
large title  
↓  
supporting explanation  
↓  
content  
↓  
action

Not every heading should be oversized.

---

## 6. Layout System

### 6.1 Container

The Hero establishes a maximum content width of approximately 1480px.

Preserve a common left alignment across major sections where practical.

Current outer-gutter direction:

- mobile: about 20px
- tablet: about 40px
- wide desktop: about 64px

### 6.2 Grid

Think in terms of a shared architectural grid even when a section does not literally use a twelve-column CSS grid.

Useful compositions include:

- full-width field
- 2/3 + 1/3
- 3-column system
- 4-step sequence
- media + text split
- asymmetric editorial layout

### 6.3 Spacing

Large sections should breathe.

Avoid stacking many dense cards with minimal separation. Use whitespace as a compositional element.

---

## 7. Borders, Radius and Surfaces

### Borders

Hairlines are a defining language element.

Use them for:

- section rules
- module boundaries
- metadata separators
- timelines
- navigation separation
- CTA framing

### Radius

The Hero establishes mostly rectangular editorial controls.

Do not turn every component into a rounded card.

Use radius as a semantic tool:

- editorial block: square or very small radius
- interactive control: small radius
- functional card: moderate radius
- avatar / status indicator: circular where appropriate

### Glass

Existing glass-card styles remain compatible with the codebase, but glassmorphism is not the defining visual identity.

For redesigned sections, prefer flat surfaces, tonal contrast and hairlines over heavy blur.

---

## 8. Section Anatomy

A section may use this general rhythm:

~~~text
02 / SERVICES
────────────────────────────

SECTION TITLE

Short explanatory statement.

Primary content system.

Optional contextual note / CTA.
~~~

This is a grammar, not a template.

Do not force every section into eyebrow + title + three cards + CTA.

Variation is required to keep the homepage editorial rather than templated.

---

## 9. Metadata Language

Metadata is part of the brand vocabulary.

Examples:

~~~text
01 / Architecture
02 / Engineering
03 / Digital Systems

34° 36' S · 58° 22' W
BUENOS AIRES · GLOBAL

/// Scroll to explore
~~~

Rules:

- small
- structured
- monospace
- low contrast
- secondary to real content

Technical language should provide context, not simulate complexity.

---

## 10. Buttons and Links

### Primary CTA

Characteristics:

- compact
- rectangular
- clear label
- small directional icon
- strong contrast
- restrained hover

Avoid pill-shaped primary CTAs.

### Secondary action

Prefer text-first links:

~~~text
Explore our work →
View project ↗
~~~

Use underlines or small directional movement rather than a second heavy button.

### Magnetic and exaggerated effects

Do not make magnetic buttons, cursor trails or distortion effects default components.

Motion must reinforce hierarchy.

---

## 11. Motion System

### Motion personality

Motion should feel:

- cinematic
- measured
- responsive
- editorial

Avoid:

- bounce-heavy transitions
- constant floating
- exaggerated scaling
- decorative motion with no purpose

### Entrance choreography

The Hero establishes this ordering:

eyebrow  
↓  
headline  
↓  
description  
↓  
CTA  
↓  
signature / context

Later sections should preserve the principle of hierarchical reveal without copying exact timings.

### Scroll motion

Good candidates:

- subtle opacity
- small vertical displacement
- line growth
- progressive reveal
- image translation

Avoid turning the homepage into a sequence of pinned scenes without a content reason.

### Reduced motion

Every animated component must have a complete static state.

---

## 12. Media Direction

### Hero media

The Hero uses native video as decorative background media.

Rules:

- media never determines section height
- use object-cover
- preserve intentional crop
- provide a poster/fallback
- text must remain readable over every frame
- media and semantic content remain separate

### Images

Images should function as composition, not filler.

Prefer deliberate crops, controlled aspect ratios and restrained overlays.

### Texture

Low-opacity grain is acceptable as atmospheric material.

It should be felt before it is consciously noticed.

---

## 13. Cards and Content Modules

Cards are allowed but are not the default answer.

Before creating a card grid, consider:

1. editorial list
2. structured rows
3. split composition
4. timeline
5. bordered module
6. card grid

Cards should contain a clear unit of meaning.

Avoid:

- nested cards
- too many chips
- large shadows
- icon-first layouts
- equal visual weight for everything

---

## 14. Icons and Decorative Geometry

Icons support comprehension.

Prefer simple, consistent line-based forms from the existing icon system.

Decorative geometry should reinforce:

- grid
- rhythm
- hierarchy
- brand symbolism

Avoid arbitrary floating blobs or ornamental 3D objects.

---

## 15. Copy Direction

The visual system and copy system must reinforce each other.

Tone:

- direct
- concrete
- confident
- warm
- intelligent
- low on buzzwords

Prefer clear statements about what Zen ERP designs, builds and transforms.

Avoid generic language such as “next-generation solutions”, “revolutionary platforms” or similar filler.

---

## 16. Responsive Behavior

Responsive design is compositional.

On smaller widths:

- preserve hierarchy
- simplify metadata
- reduce simultaneous columns
- keep CTAs visible
- protect headline readability
- stack content intentionally
- reduce decoration before reducing clarity

Do not simply shrink a desktop layout until it becomes cramped.

Recompose it.

---

## 17. Accessibility

Accessibility is part of the system.

Every redesigned section must maintain:

- semantic headings
- visible keyboard focus
- sufficient contrast
- meaningful links and controls
- decorative media marked as decorative
- reduced-motion support
- adequate touch targets
- no information conveyed only by color

---

## 18. Technical Design Contract

The visual stack should remain as simple as the desired result allows.

Current Hero baseline:

~~~text
Hero
├── HeroBackground
│   ├── native HTML video
│   └── CSS overlays / grain / grid
└── HeroContent
    └── GSAP entrance + scroll motion
~~~

The project should prefer:

- Next.js
- React
- CSS / Tailwind
- native media
- GSAP where timeline or scroll choreography benefits from it

Do not add a rendering engine or visual dependency solely because it is available.

---

## 19. Anti-Patterns

Treat these as design smells:

- generic SaaS gradients
- excessive glassmorphism
- pill-shaped everything
- giant rounded cards
- excessive shadows
- neon/cyberpunk treatment
- decorative 3D without meaning
- too many icons
- repeated three-card sections
- motion on every element
- buzzword-heavy copy
- effects that compete with typography

The standard is not “does this look impressive?”

The standard is:

**Does this feel like Zen ERP?**

---

## 20. Section Redesign Workflow

### Step 1 — Understand the content

Identify:

- purpose
- audience question
- primary information
- secondary information
- desired action

### Step 2 — Choose the composition

Select one dominant structure:

- editorial list
- split layout
- timeline
- grid
- media-led section
- comparison
- metrics
- quote
- CTA field

### Step 3 — Apply the shared language

Reuse:

- color tokens
- typography
- spacing
- hairlines
- metadata vocabulary
- motion personality

### Step 4 — Add one section-specific idea

Each major section should have one memorable visual behavior.

Examples:

- Services → system map
- Process → architectural timeline
- Projects → editorial case-study field
- Stats → typographic metric field
- Testimonials → calm quote composition
- Team → human editorial profiles

### Step 5 — Validate against the Hero

Ask:

- Does it feel like the same brand?
- Is typography still dominant?
- Are effects subordinate to content?
- Is the composition intentional?
- Is the motion restrained?
- Does the section remain complete without animation?

---

## 21. Hero as Reference

Hero v1 establishes the current visual language:

~~~text
dark cinematic media
+
large display typography
+
monospace metadata
+
terracotta accent
+
architectural hairlines
+
subtle grain
+
restrained vignette
+
editorial spacing
+
measured motion
~~~

Future sections do not need to duplicate the Hero.

They need to belong to the same design system.

---

## 22. Completion Criteria

A section is ready when:

- content hierarchy is clear
- composition is visually distinct
- the section belongs to the Zen ERP system
- desktop and mobile are intentionally designed
- motion is purposeful
- reduced-motion behavior is valid
- keyboard focus is visible
- contrast is acceptable
- no unnecessary visual dependency was introduced

---

## 23. Evolution Rule

When a new visual principle is introduced:

1. test it on one section
2. validate the result against the Hero
3. document the principle here
4. propagate it to subsequent sections

The Hero established the language.

The rest of the homepage now has to become one coherent system.

---

## 24. Architectural Service Register

Services uses an editorial capability register rather than a generic card grid.

- Full-width 1480px studio grid aligned with the Hero.
- Hairlines establish horizontal rhythm and content grouping.
- Service rows combine index, classification, capability, deliverables and action.
- Filters are functional controls, not decorative tabs.
- Terracotta is reserved for active states, CTAs and directional signals.
- Dark surfaces use tonal separation instead of heavy glass or glow effects.
- English is the working copy language for the current homepage redesign.
