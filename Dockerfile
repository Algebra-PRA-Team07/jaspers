FROM node:22-alpine AS build

WORKDIR /build

COPY apps/ apps/

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

RUN npm install --global pnpm

RUN pnpm install --frozen-lockfile
RUN pnpm --filter=@jaspers/frontend build
RUN pnpm --filter=@jaspers/backend --legacy deploy backend-pruned

FROM node:22-alpine

WORKDIR /app

COPY .docker/entrypoint.sh entrypoint.sh

RUN apk add nginx

COPY .docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /build/apps/frontend/dist ./web 
COPY --from=build /build/backend-pruned ./backend

EXPOSE 80

ENTRYPOINT ["sh", "entrypoint.sh"]
