# Content

Authored Markdown content, one file per locale. Loaded and parsed at build time
by `apps/web/lib/content` and rendered by page components (SSG). Kept as plain
Markdown so it stays human- and LLM-readable (e.g. for later answering visitor
questions from these files).

## `about/career.<lang>.md` — career timeline

One entry per `##` heading, newest first. Heading levels:

- `## [work|study] <period> · <title>` — a career or education phase. The leading
  `[work]` / `[study]` tag selects the timeline icon (briefcase / graduation cap);
  `·` separates the period from the title.
- `### <heading>` — the phase summary (the text below it; the heading text itself
  is ignored).
- `#### <name>` — a project within the phase.
- `##### <label>` — a project detail (Tech / Role / Period …); the text below is
  its value.

The About page renders the period, title, and summary (`##` + `###`). The
`####` / `#####` levels are authored for later use and are not displayed yet.
