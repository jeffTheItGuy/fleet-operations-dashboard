# syntax=docker/dockerfile:1

# ═══════════════════════════════════════════════════════════
#  Stage 1 — Build the React (Vite) application
# ═══════════════════════════════════════════════════════════
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build

# ═══════════════════════════════════════════════════════════
#  Stage 2 — Serve with Nginx (read-only root hardened)
# ═══════════════════════════════════════════════════════════
FROM nginx:alpine

RUN apk add --no-cache curl

# Remove the default site config
RUN rm -f /etc/nginx/conf.d/default.conf

# Ensure temp directories are on the writable emptyDir mount (/tmp)
RUN mkdir -p /tmp/nginx/client-body /tmp/nginx/proxy /tmp/nginx/fastcgi \
             /tmp/nginx/uwsgi /tmp/nginx/scgi && \
    chown -R nginx:nginx /tmp/nginx

# Copy custom main nginx.conf (pid moved to /tmp) and site config
COPY nginx.main.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Bypass the entrypoint script entirely — it tries to modify
# read-only files and generates noise. Start nginx directly.
ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]