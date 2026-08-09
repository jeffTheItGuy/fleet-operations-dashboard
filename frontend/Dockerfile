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
#  Stage 2 — Serve with Nginx
# ═══════════════════════════════════════════════════════════
FROM nginx:alpine

RUN apk add --no-cache curl

# Fix: nginx cannot write PID to /run because the container uses
# readOnlyRootFilesystem. Move PID to /tmp (already an emptyDir mount).
RUN sed -i 's|pid /run/nginx.pid|pid /tmp/nginx.pid|' /etc/nginx/nginx.conf

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]