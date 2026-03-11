# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image (serve built Angular app estaticamente)
FROM base

WORKDIR /app

# Servidor HTTP simple para servir archivos estáticos
RUN npm install -g http-server

# Copiar solo los archivos ya compilados de Angular
# Ruta por defecto de salida con el builder "@angular/build:application"
COPY --from=build /app/dist/proyecto-prueba/browser ./dist

# Fly está configurado para enrutar al puerto interno 8080
EXPOSE 8080

# Levanta un servidor estático sobre la carpeta dist
CMD [ "http-server", "dist", "-p", "8080" ]
