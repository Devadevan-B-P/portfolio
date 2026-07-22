---
tags: [project, content]
created: 2026-07-22
---

# Content Source

See also: [[Home]] · [[Components]] · [[Roadmap]]

Single file: `lib/data.ts`. Everything text-based on the site comes from here — no copy is hardcoded in components.

## Exports

- `profile` — name, role, location, email, GitHub, LinkedIn, summary
- `projects` — array of `Project`: id, index, title, subtitle, description[], tech[], github, featured?
- `education` — degree, school, graduation, cgpa, coursework[]
- `certifications` — array of `{ title, issuer, date }`

## Flagship Project: Forge AI

Forge AI is the highlight project of the portfolio. The project details are displayed chronologically as a step-by-step software lifecycle chapter in the timeline:
`User Intake → PRD Generation → Architecture Mapping → Folder Code Synthesis → AWS Infrastructure Deployment Map`

## Adding a new project

1. Add an entry to the `projects` array in `lib/data.ts`.
2. Ensure you outline its specific technical sub-steps or systems description inside [[Components|EngineeringJourney.tsx]] if custom visual rendering is needed.

See [[Roadmap]] for planned additions.

#type/reference
