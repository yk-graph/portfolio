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

| Route                | Page                                                     | Rendering                        | Data source                                       | Status      |
| -------------------- | -------------------------------------------------------- | -------------------------------- | ------------------------------------------------- | ----------- |
| `/[lang]`            | Home/Works/Notes/Contact (one-page pager)                | SSG (per locale) + on-demand ISR | Notion works + notes data source + UI dictionary  | implemented |
| `/[lang]/notes/[id]` | Note detail (motion drawer over notes list)              | SSG (per locale) + on-demand ISR | Notion note (per-locale body) + notes list        | implemented |
| `/[lang]/about`      | About (profile + career timeline)                        | SSG (per locale)                 | UI dictionary + career Markdown (`content/about`) | implemented |
| `/[lang]/skill`      | Skill (GitHub contribution calendar + top-language bars) | ISR (per locale, revalidate 1h)  | GitHub GraphQL (`lib/github`)                     | implemented |

All routes are locale-prefixed (`/en`, `/ja`). A visit without a locale
(`/`, `/about`) is redirected by `proxy.ts` — see section 7. API routes under
`/api` are NOT locale-prefixed and are excluded from that redirect.

The Notion-backed pages (`/[lang]`, `/[lang]/notes/[id]`) are built as SSG but
refreshed on demand: a Notion webhook hits `/api/revalidate`, which calls
`revalidatePath` for both page types — so a Notion edit reaches the site without
a redeploy and without paying an ISR/SSR cost on every visit. See section 4.

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

| Path                    | Responsibility                                                         |
| ----------------------- | ---------------------------------------------------------------------- |
| `apps/web/app/`         | Route segments ONLY (App Router). No non-route code here.              |
| `apps/web/components/`  | Site-specific composite UI (Hero, ProjectCard). NOT generic.           |
| `apps/web/constants/`   | Static app data/config (e.g. section definitions).                     |
| `apps/web/content/`     | Authored Markdown content, per locale (e.g. `about/career.<lang>.md`). |
| `apps/web/lib/`         | App logic: data fetching, the Notion data layer, i18n, helpers.        |
| `apps/web/lib/i18n/`    | Locale config + server-side UI dictionaries (see section 7).           |
| `apps/web/lib/content/` | Loads + parses authored Markdown from `content/` (e.g. career).        |
| `apps/web/proxy.ts`     | Locale detection + redirect (middleware); excludes `/api` + assets.    |
| `packages/ui/`          | Generic, reusable UI only (Button, Card, SectionNav). Imported as `@repo/ui`. |

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
If it is specific to this site → `apps/web/components/`. Dependency-free,
fully prop-driven UI is promoted to `packages/ui` and cataloged in Storybook
(e.g. `SectionNav`, which `apps/web` consumes via `@repo/ui`).

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

### GitHub as a second external source (decided)

The Skill page pulls the contribution calendar and language breakdown from the
GitHub GraphQL API. Same rule as Notion: components never call GitHub — access
goes through the data layer in `lib/github`, which maps the raw GraphQL shape to
internal types (`ContributionCalendar`, `LanguageStat`) and is the only place
that knows about GitHub. Auth is a Personal Access Token (`GH_TOKEN`, `repo`
scope so private contributions count) plus `GH_USERNAME`, both server-only
env vars (the `GITHUB_` prefix is reserved by GitHub Actions secrets, so `GH_`
is used). The page is **ISR (revalidate 1h)** — "live from GitHub" without an
SSR request cost on every visit; on a fetch/GraphQL error the data layer returns
an empty result so the build/render never crashes.

### On-demand revalidation (Notion webhook) (decided)

Notion content is SSG, so an edit would otherwise only appear on the next
redeploy. Instead of a time-based ISR interval, revalidation is **event-driven**:
a Notion API webhook subscription POSTs to the `/api/revalidate` route handler
(`app/api/revalidate/route.ts`) on content changes, and the handler calls
`revalidatePath('/[lang]', 'page')` and `revalidatePath('/[lang]/notes/[id]', 'page')`
to rebuild every Notion-backed page.

- The handler answers the one-time `verification_token` handshake (returns it so
  it can be stored), then verifies every later event's `X-Notion-Signature`
  (HMAC-SHA256 of the raw body, `timingSafeEqual`) against `NOTION_WEBHOOK_SECRET`.
- `NOTION_WEBHOOK_SECRET` is **runtime-only** (the handler runs on the server), so
  it lives in the runtime `.env` (injected via docker-compose `env_file`) — NOT a
  build ARG like `NOTION_TOKEN`, which is needed at build time for SSG.
- Why event-driven over an ISR interval: edits reach the site in seconds without
  polling, and unedited pages are never re-fetched.

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
- ISR revalidation for Notion content: decided — event-driven via a Notion
  webhook to `/api/revalidate` (no time interval); see section 4
- Content localization of Notion data: Note bodies are localized per locale
  (`getNote` reads the locale's toggle); Works bodies TBD (see section 7)

## 7. Internationalization (decided)

Locales: `en` (default) and `ja`. The **UI shell** is localized, and Notion
**content** is localized for Note bodies (per-locale toggle read by `getNote`);
Works bodies remain deferred (section 6).

- **Routing**: all routes are nested under an `app/[lang]` segment. `proxy.ts`
  redirects a locale-less path, choosing the locale by
  `NEXT_LOCALE` cookie → `Accept-Language` → default `en`. `/api` routes and
  static assets are excluded from the matcher, so webhook endpoints like
  `/api/revalidate` are never locale-prefixed.
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
