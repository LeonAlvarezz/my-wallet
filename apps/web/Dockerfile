FROM oven/bun:1.3.9 AS deps

WORKDIR /app

# Workspace manifests for install caching
COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/exception/package.json ./packages/exception/package.json
COPY packages/api-client/package.json ./packages/api-client/package.json
COPY packages/utils/package.json ./packages/utils/package.json

RUN bun install --frozen-lockfile

FROM deps AS build

WORKDIR /app

ARG VITE_API_URL

COPY apps/web ./apps/web
COPY packages/types ./packages/types
COPY packages/exception ./packages/exception
COPY packages/api-client ./packages/api-client

ENV VITE_API_URL=${VITE_API_URL}
ENV NODE_ENV=production

RUN bun run --cwd packages/api-client build
RUN bun run --cwd apps/web build

FROM nginx:1.27-alpine AS runtime

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]