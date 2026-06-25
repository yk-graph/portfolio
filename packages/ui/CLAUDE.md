# packages/ui — conventions

Facts (build target, deps, tsconfig) live in tsup.config.ts / package.json
/ tsconfig.json — read those. This file holds only conventions.

- Generic, reusable components ONLY. Anything site-specific belongs in the
  consuming app, not here (Principle 1: separate generic from specific).
- Export everything through `src/index.ts`. When adding a component, add its
  export there — don't change the build config.

(All code and comments in English.)
