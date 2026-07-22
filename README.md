# Devadevan B P — Portfolio

A cinematic, minimal portfolio built with Next.js 15 (App Router), TypeScript,
Tailwind CSS, and Framer Motion. Design language: near-black background,
electric-blue accent, glass surfaces, generous whitespace, and slow
cubic-bezier easing — inspired by Apple / Linear / Vercel, with a signature
"detection HUD" motif on the hero and project cards that nods to the
real-time object-detection project.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```
app/            Next.js App Router: layout, global styles, home page
components/     Navbar, Hero, About, Skills, Projects, Education, Contact,
                Footer, SmoothScroll (Lenis), CustomCursor
lib/data.ts     All resume-derived content lives here — edit this file to
                update projects, skills, education, or contact info
public/         Static assets, including your downloadable resume PDF
```

## Customizing

- **Content**: everything text-based (projects, skills, education, contact
  links) is centralized in `lib/data.ts`.
- **Colors**: the palette is defined in `tailwind.config.ts` under
  `theme.extend.colors` (accent is Electric Blue `#4F8CFF`).
- **Resume download**: replace `public/Devadevan_B_P_Resume.pdf` with an
  updated file of the same name any time, or update the filename referenced
  in `components/Navbar.tsx`.
- **Fonts**: display face is General Sans (loaded via Fontshare in
  `app/layout.tsx`), body is Inter, and monospace accents use JetBrains Mono
  — both loaded via `next/font/google`.

## Notes

- Smooth scrolling (Lenis) and the custom cursor automatically disable
  themselves when the browser reports `prefers-reduced-motion: reduce`, and
  the cursor is skipped entirely on touch devices.
- No content beyond what's on the resume PDF was added — update
  `lib/data.ts` yourself when you're ready to add new projects.
