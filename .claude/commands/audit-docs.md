---
description: Audit CC-facing docs against the actual codebase, report drift and gaps, then edit only on request
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Edit, Write
---

You are auditing this repository's **CC-facing documentation** against the
actual implementation. Work in two phases. Do NOT edit anything in Phase 1.

## Scope

In scope (CC-facing docs — must describe the _current_ state):

- `docs/architecture.md`
- root `CLAUDE.md`
- every `CLAUDE.md` under `apps/*` and `packages/*`
- `.claude/rules/*.md`

Out of scope (do NOT audit or edit — these are human-facing history):

- `portfolio-*.md`
- `README.md`
- this command file and other `.claude/commands/*`

## Phase 1 — Audit (read-only, NO writes)

1. Read the in-scope docs listed above.
2. Read the actual implementation: config files (`package.json`, `turbo.json`,
   `tsconfig.json`, `next.config.*`, `tsup.config.ts`, `pnpm-workspace.yaml`,
   `docker-compose.*.yml`, `.github/workflows/*`) and the source under
   `apps/*/` and `packages/*/`.
3. Produce two bullet lists:

   **A. Drift** — docs that contradict the code. For each:
   - file + section
   - what the doc says vs. what the code actually does
   - which is the source of truth (usually the code)

   **B. Gaps** — implemented things with no doc that should have one. For each:
   - what exists in code but is undocumented
   - where it should be documented (existing file, or a new `.md` to create)
   - why it matters for someone making implementation decisions

   If a list is empty, say so explicitly. Do not invent items to fill space.
   Respect the "no duplication" rule: a fact that already lives in a config
   file is NOT a gap — CC-facing docs hold conventions/boundaries, not facts
   readable from config.

4. Stop. Present both lists and ask which items (if any) I want you to act on.

## Phase 2 — Edit (only after I choose items)

- Act ONLY on the items I approve. Do not touch un-approved items.
- For edits: change the minimum needed to match reality.
- For new files: create the `.md`, and add a one-line pointer from the nearest
  parent doc (root `CLAUDE.md` or `docs/architecture.md`) so it's discoverable.
- Keep CC-facing docs short and present-tense. No duplicating config facts.
- After editing, show a summary of every file you changed or created.
