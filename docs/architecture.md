# Architecture

The single source of truth for HOW this app is structured.
CC: read this before implementing any page, route, or data-fetching logic.

> Status legend: `TBD` = not yet decided. When a decision is made,
> update the relevant row/section here FIRST, then implement.

## 1. Rendering strategy (decided)

- Default: **SSG** (static generation) for all pages.
- Use **ISR** for content that changes after deploy (e.g. Notion-backed pages that may be edited without a redeploy).
- Use **SSR** only when a page genuinely needs per-request data.
- Rule of thumb: start a page as SSG. Promote to ISR/SSR only with a concrete reason, and record that reason in the routing table below.

## 2. Routing table (the core — grow this as pages are decided)

Each page = one row. When you add a page, add a row here BEFORE implementing.

| Route | Page | Rendering | Data source | Status |
| ----- | ---- | --------- | ----------- | ------ |
| `/`   | Home | TBD       | TBD         | TBD    |

<!-- Example of a filled row (remove once real pages exist):
| `/work` | Work list | SSG | Notion (projects DB) | planned |
| `/work/[slug]` | Work detail | ISR | Notion (projects DB) | planned |
-->

## 3. Directory responsibilities (decided)

| Path                    | Responsibility                                                    |
| ----------------------- | ----------------------------------------------------------------- |
| `apps/web/app/`         | Route segments ONLY (App Router). No non-route code here.         |
| `apps/web/components/`  | Site-specific composite UI (Hero, ProjectCard). NOT generic.      |
| `apps/web/constants/`   | Static app data/config (e.g. section definitions).                |
| `apps/web/lib/`         | App logic: data fetching, the Notion data layer, helpers.         |
| `packages/ui/`          | Generic, reusable UI only (Button, Card). Imported as `@repo/ui`. |

Non-route code (components, constants, lib) lives at the `apps/web` root, not
under `app/`, so route segments stay clearly separated from shared code. It is
imported via the `@/*` alias.

Boundary rule: if a component is reusable across projects → `packages/ui`.
If it is specific to this site → `apps/web/components/`.

## 4. Data flow (decided)

External CMS (Notion) is NEVER called directly from components.
All access goes through a data layer in `apps/web/lib/`.

```
Notion API

│  (fetch + map to internal types)

▼

apps/web/lib/  ← data layer (the ONLY place that knows about Notion)

│  (returns internal types, not raw Notion shapes)

▼

app/ pages (SSG/ISR)  →  components render internal types
```

Why: if the data layer is the only place that knows Notion's shape,
switching CMS later touches one directory, not every component.
Internal types are the contract; the Notion mapping is an implementation detail.

## 5. Content / data model

The shape of internal types (Project, Note, etc.) is TBD.
When defined, document the types here (or split into `docs/data-model.md`
if this section grows large) and reference them from the data layer.

## 6. Open decisions (TBD — fill in as decided)

- Page structure (which pages exist): TBD
- Internal type definitions: TBD
- ISR revalidation interval for Notion content: TBD
