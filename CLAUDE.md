# Portfolio Monorepo

Engineer portfolio site for hiring managers and PMs.
Keep this file thin. Detailed rules live in `.claude/rules/`.
Architecture lives in `docs/architecture.md` — read it before implementing pages.

## What this repo is

Turborepo monorepo. Three workspaces that matter:

- `apps/web` … Next.js site (App Router)
- `apps/storybook` … Storybook (React + Vite), catalogs packages/ui
- `packages/ui` … generic UI library (@repo/ui)

For commands, ports, and versions, read the relevant `package.json` /
`turbo.json` — do NOT duplicate those facts here (they go stale).

## Three design principles (return here when unsure)

1. Separate generic from specific (generic → packages/, specific → app components/)
2. Share only what multiple projects use (YAGNI)
3. Centralize versions and config (pnpm catalog, shared tsconfig)

## Workflow (must read)

- How to implement: `.claude/rules/workflow.md`
- How to update docs: `.claude/rules/documentation.md` (manual only, via `/update-docs`)
