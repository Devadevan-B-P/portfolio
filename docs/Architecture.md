---
tags: [project, architecture]
created: 2026-07-22
---

# Architecture

See also: [[Home]] · [[Components]] · [[Content Source]]

## Folder layout

```
app/            App Router: layout.tsx, globals.css, page.tsx
components/     UI pieces: Hero, EngineeringJourney, SpotlightCard, etc.
lib/data.ts     Portfolio data layer (single source of truth)
public/         Static assets incl. Devadevan_B_P_Resume.pdf and background video loop
```

## Rendering flow

`app/page.tsx` wraps everything in `SmoothScroll` (Lenis) and `CustomCursor`, then renders sections top to bottom:

`Navbar → Hero → EngineeringJourney (Problem → Blueprint → Forge AI Chapter → Systems → Edge → Credibility → Lessons → Final Scene)`

## Data flow

Every section imports from `lib/data.ts` — nothing is hardcoded inside components. See [[Content Source]] for how to edit it.

## Fonts

- Display: **General Sans** — loaded via a `<link>` to Fontshare in `app/layout.tsx` `<head>`
- Body: **Inter** — via `next/font/google`
- Mono: **JetBrains Mono** — via `next/font/google` for code blocks and UI tags

#type/architecture
