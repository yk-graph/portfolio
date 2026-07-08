# Deployment

How this site gets from a git push to a running container.
For app structure (routes, rendering, data flow) see `docs/architecture.md`.
This file records deployment DECISIONS and their reasons — exact image
names, ports, and steps live in `cd.yml` / the compose files; don't
duplicate them here.

## Pipeline

```
push to staging / main
        │
        ▼
GitHub Actions (CD)
  ├─ build job  (GitHub-hosted arm64 runner)
  │     build linux/arm64 images → push to GHCR
  │
  └─ deploy job (self-hosted runner on the Mac mini)
        docker compose pull → up -d   (no --build)
```

Images are consumed via `image:` in `docker-compose.stg.yml` /
`docker-compose.prod.yml`; the tag is chosen by branch
(staging → `:staging`, main → `:latest`).

## Decisions (and why)

### 1. Build in CI, deploy by pull — never build on the edge

The deploy target is a Mac mini on a home network. Its downlink is thin
(~3.7 Mbps, with heavy bufferbloat under load), so running `pnpm install`
there timed out — the failure that made this pipeline necessary. So the
Mac mini only ever **pulls** a finished image; all building happens in CI,
which has fast network and layer caching.

### 2. arm64 images

The Mac mini is Apple Silicon, so images must be `linux/arm64`. They are
built natively on GitHub's arm64 runner (rather than cross-built via QEMU).

### 3. Build-time secrets live in GitHub Secrets

Because the site is SSG, the build fetches Notion and persists images to R2
**at build time** (see `docs/architecture.md` §4). Those secrets
(`NOTION_*`, `R2_*`) are therefore needed by the build job in CI, and are
passed as Docker build args from GitHub Secrets — not injected at runtime on
the edge. Keeping them in CI means no build secrets have to sit on the Mac mini.

### 4. GHCR auth on the Mac mini

GHCR packages are private, so the Mac mini must authenticate to pull.
`docker login` over SSH fails because it cannot reach the macOS Keychain
(`User interaction is not allowed`), so the credential is written directly to
`~/.docker/config.json` (base64 of `user:PAT`, PAT scoped to `read:packages`).
The self-hosted runner reads the same config, so its automated pulls work too.

## Content-update cadence

`/` is currently pure SSG with no ISR, so Notion edits (new works, changed
images) only appear after a **rebuild**, which is triggered by a push to
staging/main. There is no scheduled/on-demand revalidation yet — see the
"ISR revalidation" open decision in `docs/architecture.md` §6.
