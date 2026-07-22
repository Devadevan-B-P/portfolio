---
tags: [project, components]
created: 2026-07-22
---

# Components

See also: [[Home]] · [[Architecture]]

| Component | Purpose |
|---|---|
| `Navbar.tsx` | Fixed glass nav pill — logo mark, menu links, résumé download. Intercepts anchor links to scroll smoothly via Lenis. |
| `Hero.tsx` | Word-by-word blur-in name, ambient glow, detection-HUD corner widgets. Dissolves dynamically on scroll. |
| `HeroVideo.tsx` | Handles background loop video, fades it out on scroll, and stops rendering off-screen for performance. |
| `SpotlightCard.tsx` | Wrapper component tracking mouse offsets to draw custom electric-blue spotlight highlights on borders. |
| `EngineeringJourney.tsx` | Centerpiece scroll journey. Employs split-screen layout on desktop to stick structural blueprints, code frames, and telemetry charts matching user scroll stages. |
| `SmoothScroll.tsx` | Lenis scroll controller, exposing `window.lenis` and automatically disabling under reduced-motion. |
| `CustomCursor.tsx` | Dot + lagging ring cursor. Bound to standard CSS classes to avoid styled-jsx compiler crashes in Next.js 15. |

Each visual asset and copy point is loaded directly from [[Content Source]] (`lib/data.ts`) — editing a component's JSX edits *layout and logic*, editing `data.ts` edits *content*.

#type/reference
