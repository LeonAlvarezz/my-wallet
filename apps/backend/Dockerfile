FROM oven/bun:1.3.9 AS build

WORKDIR /app

# Cache packages
COPY package.json package.json
COPY bun.lock bun.lock

COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/exception/package.json ./packages/exception/package.json
COPY packages/api-client/package.json ./packages/api-client/package.json
COPY packages/utils/package.json ./packages/utils/package.json


RUN bun install

COPY apps/backend ./apps/backend
COPY packages/exception ./packages/exception
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils

WORKDIR /app/apps/backend

ENV NODE_ENV=production

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    src/app.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/apps/backend/server ./server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000