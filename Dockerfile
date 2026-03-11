# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"
WORKDIR /app
ENV NODE_ENV="production"

FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package-lock.json package.json ./
RUN npm ci --include=dev

COPY . .

RUN npm run build
RUN npm prune --omit=dev

FROM base
WORKDIR /app

RUN npm install -g http-server

COPY --from=build /app/dist/proyecto-prueba/browser ./dist

EXPOSE 8080

CMD [ "http-server", "dist", "-p", "8080", "-a", "0.0.0.0" ]
