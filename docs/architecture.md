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

| Route                | Page                                       | Rendering        | Data source                                        | Status      |
| -------------------- | ------------------------------------------ | ---------------- | -------------------------------------------------- | ----------- |
| `/[lang]`            | Home/Works/Notes/Contact (one-page pager)  | SSG (per locale) | Notion works + notes data source + UI dictionary   | implemented |
| `/[lang]/notes/[id]` | Note detail (motion drawer over notes list) | SSG (per locale) | Notion note (per-locale body) + notes list         | implemented |
| `/[lang]/about`      | About (profile + career timeline)          | SSG (per locale) | UI dictionary + career Markdown (`content/about`)  | implemented |

All routes are locale-prefixed (`/en`, `/ja`). A visit without a locale
(`/`, `/about`) is redirected by `proxy.ts` — see section 7.

**Section navigation.** Home/Works/Notes/Contact are NOT routes — they are one
`/[lang]` page rendered by a client `SectionPager` that switches the active
section from state (dot nav + swipe/keyboard) with a motion slide. The active
section lives in `SectionProvider` (a context in the root layout), so it survives
locale switches and navigation to a note (see section 7). `/[lang]/notes/[id]` IS
a real route (shareable, SSG): it renders the Notes list behind a motion drawer
(slides up on open, down on close), and a `SectionSync` marks Notes as the active
section — so closing returns to `/[lang]` on the Notes section (with the list
already behind, no lag), even from a shared link. A route-per-section variant and
an intercepting-route modal were both tried and dropped — real routes forced
parallel-slot / background-remount workarounds that the one-page pager avoids.

## 3. Directory responsibilities (decided)

| Path                   | Responsibility                                                    |
| ---------------------- | ----------------------------------------------------------------- |
| `apps/web/app/`        | Route segments ONLY (App Router). No non-route code here.         |
| `apps/web/components/` | Site-specific composite UI (Hero, ProjectCard). NOT generic.      |
| `apps/web/constants/`  | Static app data/config (e.g. section definitions).                |
| `apps/web/content/`    | Authored Markdown content, per locale (e.g. `about/career.<lang>.md`). |
| `apps/web/lib/`        | App logic: data fetching, the Notion data layer, i18n, helpers.   |
| `apps/web/lib/i18n/`   | Locale config + server-side UI dictionaries (see section 7).      |
| `apps/web/lib/content/`| Loads + parses authored Markdown from `content/` (e.g. career).   |
| `apps/web/proxy.ts`    | Locale detection + redirect (middleware).                         |
| `packages/ui/`         | Generic, reusable UI only (Button, Card). Imported as `@repo/ui`. |

The root `app/layout.tsx` owns `<html>`/`<body>`, the app shell (providers,
language switcher), the `SectionProvider` (active-section state) and the animated
section background (`SectionBackground`, which spans every route — the pager
follows the active section, the note route shows Notes, and other sub-pages like
`/about` show the Home gradient, so the backdrop stays continuous);
`app/[lang]/layout.tsx` only validates the locale and syncs `<html lang>`.
Keeping the context AND the background in the root layout means neither remounts
on locale switches or note navigation (see section 7) — otherwise the active
section and the background animation would reset.

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

The `Work` and `Note` types are the internal models for a portfolio work and a
note, defined in `apps/web/lib/notion/types.ts` and returned by the data layer
(`getWorks`, `getNotes` / `getNote`). They are the contract components render —
raw Notion shapes never leak out. Contact has no data model (static form).

The About page's career/education history is NOT from Notion — it is authored
Markdown in `content/about/career.<lang>.md`, parsed by `lib/content` into the
`CareerItem` type (a `[work]` / `[study]` tag, period, title, and summary). See
`apps/web/content/README.md` for the authoring convention.
(If this section grows, split into `docs/data-model.md`.)

## 6. Open decisions (TBD — fill in as decided)

- Page structure (which pages exist): decided — see the routing table (section 2)
- Internal type definitions: `Work` and `Note` defined; Contact is static (no model)
- ISR revalidation interval for Notion content: TBD
- Content localization of Notion data: Note bodies are localized per locale
  (`getNote` reads the locale's toggle); Works bodies TBD (see section 7)

## 7. Internationalization (decided)

Locales: `en` (default) and `ja`. The **UI shell** is localized, and Notion
**content** is localized for Note bodies (per-locale toggle read by `getNote`);
Works bodies remain deferred (section 6).

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
- **Shell placement**: the shell (html/body, providers, switcher), the
  `SectionProvider` and the animated section background live in the root layout so
  they do NOT remount on locale switches — otherwise the splash would replay (its
  blocking script would re-render), the active section would reset to Home, and
  the background animation would restart. `[lang]/layout` only validates the
  locale and syncs `<html lang>`.
- **Import boundary**: client-safe locale config and the `Dictionary` type are
  exported from `@/lib/i18n`; the server-only `getDictionary` is imported from
  `@/lib/i18n/dictionaries` so it can never be pulled into a client bundle.
