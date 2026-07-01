# apps/web — conventions

Facts (port, scripts, deps) live in package.json / next.config.ts — read those.
Architecture (routes, rendering, data flow) lives in docs/architecture.md.
This file holds only conventions you can't read from a file.

- Import generic UI from `@repo/ui`. Put site-specific composite UI
  (Hero, ProjectCard) in `app/components/` — never in packages/ui.
- Never call the external CMS (Notion) directly from a component.
  Go through the data layer in `lib/` (see docs/architecture.md §4).
- Follow the official Next.js ESLint config as-is; don't override it.
- Colors: the 4 base colors (brand-navy/brand-olive/brand-forest/brand-amber)
  are custom tokens in globals.css, each used for both background and text. The
  `brand-` prefix avoids clashing with Tailwind's own amber/olive scales. Grays,
  black and white use Tailwind neutrals — don't add custom tokens for them.

(All code and comments in English.)
