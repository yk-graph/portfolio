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
COPY packages/tailwind-config/package.json ./packages/tailwind-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
RUN pnpm install --frozen-lockfile

# ===== Builder =====
FROM base AS builder
WORKDIR /app
ARG NOTION_TOKEN
ARG NOTION_WORKS_DATA_SOURCE_ID
ARG NOTION_NOTES_DATA_SOURCE_ID
ARG R2_ACCOUNT_ID
ARG R2_ACCESS_KEY_ID
ARG R2_SECRET_ACCESS_KEY
ARG R2_BUCKET
ARG GH_TOKEN
ARG GH_USERNAME
ENV NOTION_TOKEN=$NOTION_TOKEN
ENV NOTION_WORKS_DATA_SOURCE_ID=$NOTION_WORKS_DATA_SOURCE_ID
ENV NOTION_NOTES_DATA_SOURCE_ID=$NOTION_NOTES_DATA_SOURCE_ID
ENV R2_ACCOUNT_ID=$R2_ACCOUNT_ID
ENV R2_ACCESS_KEY_ID=$R2_ACCESS_KEY_ID
ENV R2_SECRET_ACCESS_KEY=$R2_SECRET_ACCESS_KEY
ENV R2_BUCKET=$R2_BUCKET
ENV GH_TOKEN=$GH_TOKEN
ENV GH_USERNAME=$GH_USERNAME
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