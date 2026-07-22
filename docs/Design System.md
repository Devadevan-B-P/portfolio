---
tags: [project, design]
created: 2026-07-22
---

# Design System

See also: [[Home]] · [[Architecture]]

Defined in `tailwind.config.ts` and `app/globals.css`.

## Color

| Token | Value |
|---|---|
| bg.primary | `#050505` |
| bg.secondary | `#0D0D0D` |
| card | `rgba(255,255,255,0.04)` |
| border.subtle | `rgba(255,255,255,0.08)` |
| text.primary | `#FFFFFF` |
| text.secondary | `#B5B5B5` |
| text.muted | `#7B7B7B` |
| **accent** | **`#4F8CFF`** (Electric Blue) |
| accent.glow | `rgba(79,140,255,0.25)` |

## Type scale

- Display face: General Sans (weights 500–700)
- Body face: Inter
- Mono accents: JetBrains Mono (labels, code telemetry overlays)

## Motion & Transitions

- Easing: `cubic-bezier(.22,.61,.36,1)`
- Dynamic scroll linking: uses Lenis for smooth transitions.
- Spotlight Hover effect: spotlight cards render gradient hover borders following cursor offsets.
- Video Lifespan: Loops in Hero, dissolves into pure black on scroll.

## Signature element

**Engineering Journey Spine** — a single electric-blue glowing timeline path that draws itself as you scroll, connecting structured engineering wireframes (YOLO bounding boxes, system flow schemas, data directories).

#type/design-tokens
