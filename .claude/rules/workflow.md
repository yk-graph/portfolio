# Implementation Workflow

## Core principle: plan before implementing

For any change touching 2-3+ files, or any new feature,
**do NOT implement directly — present a plan first.**

### Steps

1. Developer requests in Plan Mode (Shift+Tab).
2. Read relevant files. For pages/routing/data, read `docs/architecture.md` first. If needed, WebFetch official docs for the latest info.
3. Present a plan WITHOUT editing files, including:
   - Files you will touch
   - What you will do in each
   - New packages/dependencies, if any
4. Wait for approval.
5. Implement only after approval.

### Exception for minor changes

Typo fixes or small single-file edits with no design decision may be implemented directly.

## After implementation

- Show how to verify (commands or steps).
- Do NOT update docs automatically. Update only when the developer runs `/update-docs`.
