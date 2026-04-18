FROM node:22-slim AS build-env

WORKDIR /app

COPY package.json package-lock.json ./

# Install ALL deps (needed for build)
RUN npm ci

# Copy rest of app
COPY ./src ./src
COPY ./public ./public
COPY tailwind.config.js postcss.config.js ./

# Build assets
RUN npm run build:css

# Remove dev deps AFTER build
RUN npm prune --omit=dev


FROM gcr.io/distroless/nodejs22-debian13:nonroot

WORKDIR /app

COPY --from=build-env /app /app

ENV NODE_ENV=production

CMD ["src/server.js"]