# packages/ui — conventions

Facts (build target, deps, tsconfig) live in tsup.config.ts / package.json
/ tsconfig.json — read those. This file holds only conventions.

- Prop-driven presentational components, cataloged in Storybook. Site-flavored
  pieces are OK (e.g. CareerTimeline, TechStack) as long as they hold no data
  fetching or business logic and take their content via props. The data itself
  stays in the consuming app (Principle 1: separate presentation from data;
  see docs/architecture.md §3).
- Export everything through `src/index.ts`. When adding a component, add its
  export there — don't change the build config.

(All code and comments in English.)
