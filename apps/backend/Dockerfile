FROM oven/bun:1.3.9 AS build

WORKDIR /app

# Cache packages
COPY package.json package.json
COPY bun.lock bun.lock

COPY /apps/backend/package.json ./apps/backend/package.json
COPY /packages/config/package.json ./packages/config/package.json

RUN bun install

COPY /apps/backend ./apps/backend
COPY /packages/config ./packages/config

ENV NODE_ENV=production

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --outfile backend \
    src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/backend backend

ENV NODE_ENV=production

CMD ["./backend"]

EXPOSE 3000