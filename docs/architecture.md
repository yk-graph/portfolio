# Architecture

The single source of truth for HOW this app is structured.
CC: read this before implementing any page, route, or data-fetching logic.

> Status legend: `TBD` = not yet decided. When a decision is made,
> update the relevant row/section here FIRST, then implement.

## 1. Rendering strategy (decided)

- Default: **SSG** (static generation) for all pages.
- Pages live under a `[lang]` segment and are generated **per locale** (`generateStaticParams` emits `en` / `ja`) — see section 7.
- Use **ISR** for content that changes after deploy (e.g. Notion-backed pages that may be edited without a redeploy).
- Use **SSR** only when a page genuinely needs per-request data.
- Rule of thumb: start a page as SSG. Promote to ISR/SSR only with a concrete reason, and record that reason in the routing table below.

## 2. Routing table (the core — grow this as pages are decided)

Each page = one row. When you add a page, add a row here BEFORE implementing.

| Route           | Page                                      | Rendering        | Data source                              | Status                            |
| --------------- | ----------------------------------------- | ---------------- | ---------------------------------------- | --------------------------------- |
| `/[lang]`       | Home (swipeable Home/Works/Notes/Contact) | SSG (per locale) | Notion works data source + UI dictionary | implemented; ISR revalidation TBD |
| `/[lang]/about` | About                                     | SSG (per locale) | UI dictionary (static)                   | implemented                       |

All routes are locale-prefixed (`/en`, `/ja`). A visit without a locale
(`/`, `/about`) is redirected by `proxy.ts` — see section 7.

## 3. Directory responsibilities (decided)

| Path                   | Responsibility                                                    |
| ---------------------- | ----------------------------------------------------------------- |
| `apps/web/app/`        | Route segments ONLY (App Router). No non-route code here.         |
| `apps/web/components/` | Site-specific composite UI (Hero, ProjectCard). NOT generic.      |
| `apps/web/constants/`  | Static app data/config (e.g. section definitions).                |
| `apps/web/lib/`        | App logic: data fetching, the Notion data layer, i18n, helpers.   |
| `apps/web/lib/i18n/`   | Locale config + server-side UI dictionaries (see section 7).      |
| `apps/web/proxy.ts`    | Locale detection + redirect (middleware).                         |
| `packages/ui/`         | Generic, reusable UI only (Button, Card). Imported as `@repo/ui`. |

The root `app/layout.tsx` owns `<html>`/`<body>` and the app shell (providers,
language switcher); `app/[lang]/layout.tsx` only validates the locale and syncs
`<html lang>`. This keeps the shell mounted across locale switches (see section 7).

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
- Content localization of Notion data (Works/Notes bodies): TBD (see section 7)

## 7. Internationalization (decided)

Locales: `en` (default) and `ja`. The foundation localizes the **UI shell**;
localizing Notion **content** (Works/Notes bodies) is deferred (section 6).

- **Routing**: all routes are nested under an `app/[lang]` segment. `proxy.ts`
  redirects a locale-less path, choosing the locale by
  `NEXT_LOCALE` cookie → `Accept-Language` → default `en`.
- **UI strings**: server-side dictionaries in `lib/i18n` (`getDictionary(lang)`
  loads `en.json` / `ja.json`). No i18n library — the site only needs string
  lookup, and keeping dictionaries server-only means translations never ship in
  the client bundle. Data is loaded at the route boundary (page/layout) and
  passed to presentational components as plain props.
- **Language switcher**: a client control in the shell that swaps the locale
  segment of the current path and persists the choice in the `NEXT_LOCALE`
  cookie so `proxy.ts` respects it on later locale-less visits.
- **Shell placement**: the shell (html/body, providers, switcher) lives in the
  root layout so it does NOT remount on locale switches — otherwise the splash
  would replay and its blocking script would re-render. `[lang]/layout` only
  validates the locale and syncs `<html lang>`.
- **Import boundary**: client-safe locale config and the `Dictionary` type are
  exported from `@/lib/i18n`; the server-only `getDictionary` is imported from
  `@/lib/i18n/dictionaries` so it can never be pulled into a client bundle.
