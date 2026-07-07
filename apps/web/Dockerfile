# ===== Base =====
FROM node:24-alpine AS base
RUN npm install -g pnpm@11.9.0
RUN apk add --no-cache libc6-compat

# ===== Dependencies =====
FROM base AS deps
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/typescript-config/package.json ./packages/typescript-config/
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ===== Builder =====
FROM base AS builder
WORKDIR /app
ARG NOTION_TOKEN
ARG NOTION_DATA_SOURCE_ID
ENV NOTION_TOKEN=$NOTION_TOKEN
ENV NOTION_DATA_SOURCE_ID=$NOTION_DATA_SOURCE_ID
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter web build

# ===== Runner =====
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
EXPOSE 4000
CMD ["node", "apps/web/server.js"]