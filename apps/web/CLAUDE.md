# apps/web — conventions

Facts (port, scripts, deps) live in package.json / next.config.ts — read those.
Architecture (routes, rendering, data flow) lives in docs/architecture.md.
This file holds only conventions you can't read from a file.

- Import presentational UI from `@repo/ui` (including site-flavored, prop-driven
  pieces). Keep route-bound, data-fetching, or app-shell components in `components/`
  at the apps/web root; their data lives in `constants/` / `lib/` and is passed to
  `@repo/ui` components as props (see docs/architecture.md §3).
- Never call the external CMS (Notion) directly from a component.
  Go through the data layer in `lib/` (see docs/architecture.md §4).
- Follow the official Next.js ESLint config as-is; don't override it.
- Colors: 4 base brand tokens (brand-navy/brand-olive/brand-forest/brand-cherry)
  in `@repo/tailwind-config` (`theme.css`), each with `-light` / `-dark` shades. Base colors are used as
  text on light (neutral) chips/buttons; base + shades compose the per-section
  animated gradient backgrounds (built in constants/sections.ts, animated via
  `--animate-bg-drift`). The `brand-` prefix avoids clashing with Tailwind's own
  scales. Grays, black and white use Tailwind neutrals — don't add custom tokens.

(All code and comments in English.)
