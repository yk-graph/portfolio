# ===== Base =====
FROM node:24-alpine AS base
RUN npm install -g pnpm@11.9.0
RUN apk add --no-cache libc6-compat

# ===== Dependencies =====
FROM base AS deps
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/storybook/package.json ./apps/storybook/
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/typescript-config/package.json ./packages/typescript-config/
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ===== Builder =====
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter storybook build-storybook

# ===== Runner (Nginx) =====
FROM nginx:alpine AS runner
COPY --from=builder /app/apps/storybook/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]