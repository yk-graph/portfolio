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

| Route    | Page                                      | Rendering | Data source                           | Status                            |
| -------- | ----------------------------------------- | --------- | ------------------------------------- | --------------------------------- |
| `/`      | Home (swipeable Home/Works/Notes/Contact) | SSG       | Notion works data source (Works only) | implemented; ISR revalidation TBD |
| `/about` | About                                     | SSG       | — (static)                            | implemented                       |

## 3. Directory responsibilities (decided)

| Path                   | Responsibility                                                    |
| ---------------------- | ----------------------------------------------------------------- |
| `apps/web/app/`        | Route segments ONLY (App Router). No non-route code here.         |
| `apps/web/components/` | Site-specific composite UI (Hero, ProjectCard). NOT generic.      |
| `apps/web/constants/`  | Static app data/config (e.g. section definitions).                |
| `apps/web/lib/`        | App logic: data fetching, the Notion data layer, helpers.         |
| `packages/ui/`         | Generic, reusable UI only (Button, Card). Imported as `@repo/ui`. |

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

### Image persistence (decided)

Notion image URLs are signed and expire (~1 hour), so an SSG build that
embedded them would ship dead links. The data layer therefore downloads each
image at build time and re-hosts it on Cloudflare R2, returning the permanent
public URL as the internal type's image field. `last_edited_time` is appended
as a cache-busting query so an edited image invalidates the CDN cache.

Why R2 lives in the data layer: re-hosting is part of turning a raw Notion
shape into a stable internal type — components only ever see the permanent URL,
never the expiring Notion one.

## 5. Content / data model

The `Work` type is the internal model for a portfolio work, defined in
`apps/web/lib/notion/types.ts` and returned by the data layer (`getWorks`).
It is the contract components render — raw Notion shapes never leak out.
Note/Contact models are still TBD. (If this section grows, split into
`docs/data-model.md`.)

## 6. Open decisions (TBD — fill in as decided)

- Page structure (which pages exist): TBD
- Internal type definitions: `Work` defined; Note/Contact TBD
- ISR revalidation interval for Notion content: TBD
