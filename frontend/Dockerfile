# syntax=docker/dockerfile:1

# ═══════════════════════════════════════════════════════════
#  Stage 1 — Build the React (Vite) application
# ═══════════════════════════════════════════════════════════
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Install dependencies
#    - Use 'npm ci' when a lockfile is present (fast, reproducible).
#    - Fall back to 'npm install' when it is missing.
#    - Do NOT omit devDependencies: vite, @vitejs/plugin-react, etc.
#      are required to run the build.
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# 2. Copy source code and build static assets
COPY . .
RUN npm run build

# ═══════════════════════════════════════════════════════════
#  Stage 2 — Serve with Nginx
# ═══════════════════════════════════════════════════════════
FROM nginx:alpine

# Install curl for health-check probes
RUN apk add --no-cache curl

# Replace default nginx site with your custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Pull in the compiled Vite output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]