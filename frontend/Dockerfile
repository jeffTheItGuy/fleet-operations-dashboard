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
#  Stage 2 — Serve with Nginx (hardened for read-only root)
# ═══════════════════════════════════════════════════════════
FROM nginx:alpine

RUN apk add --no-cache curl

# Fix 1: Move nginx PID away from /run (read-only) to /tmp (emptyDir mount).
#        The regex catches /run/nginx.pid, /var/run/nginx.pid, etc.
RUN sed -i 's|pid.*nginx.pid|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf

# Fix 2: Remove default site so the entrypoint script doesn't try (and fail)
#        to patch a read-only file on startup.
RUN rm -f /etc/nginx/conf.d/default.conf

# Fix 3: Ensure temp directories nginx needs are on writable paths.
RUN mkdir -p /tmp/nginx/client-body /tmp/nginx/proxy /tmp/nginx/fastcgi \
             /tmp/nginx/uwsgi /tmp/nginx/scgi && \
    chown -R nginx:nginx /tmp/nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix 4: Update nginx.conf to also use /tmp for client body temp.
#        (Not strictly required for startup, but prevents runtime errors.)
RUN sed -i 's|client_body_temp_path.*|client_body_temp_path /tmp/nginx/client-body;|' /etc/nginx/nginx.conf || true

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Bypass the entrypoint scripts entirely — they try to modify read-only files.
# We run nginx directly with the daemon-off flag.
CMD ["nginx", "-g", "daemon off;"]