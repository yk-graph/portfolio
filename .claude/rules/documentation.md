# Documentation Update Rules

CC-oriented docs are valuable ONLY while accurate. A stale doc actively
misleads CC into generating wrong code. So: keep docs few and correct,
and never duplicate facts that already live in code (package.json,
tsconfig, turbo.json, workflows). Document decisions and boundaries —
not facts a file already states.

All docs are in English. Updates are manual, via `/update-docs`.

## Change-to-doc mapping

| Type of change                                      | Document to update                                                      |
| --------------------------------------------------- | ----------------------------------------------------------------------- |
| New page / route added or removed                   | `docs/architecture.md` (routing table)                                  |
| Rendering strategy changed (SSG/ISR/SSR) for a page | `docs/architecture.md` (routing table + section 1)                      |
| Data flow / data-layer boundary changed             | `docs/architecture.md` (section 4)                                      |
| Internal type / content model defined or changed    | `docs/architecture.md` section 5 (or `docs/data-model.md` if split out) |
| Directory responsibility / boundary changed         | `docs/architecture.md` (section 3)                                      |

## Update policy

- Update the doc, then implement (architecture decisions are decided first).
- Record WHY when a non-obvious decision is made.
- If nothing here applies, state "no update needed" and stop.

## Do NOT document

- Ports, commands, versions → they live in package.json / turbo.json.
- Anything readable directly from a config file (avoid duplication).
- Typo/formatting-only changes.

## When a new doc is needed

If a section of architecture.md grows too large (e.g. the type model),
split it into its own `docs/*.md`, then add a row to this mapping table.
