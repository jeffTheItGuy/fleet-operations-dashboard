# ── Build Stage ──
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Production Stage ──
FROM nginx:1.25-alpine

# Copy static files and site config
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix for Kubernetes readOnlyRootFilesystem=true:
# Redirect nginx PID and logs to writable paths (/tmp is mounted as emptyDir)
RUN sed -i 's|/var/run/nginx.pid|/tmp/nginx.pid|' /etc/nginx/nginx.conf && \
    sed -i 's|error_log /var/log/nginx/error.log|error_log /dev/stderr|' /etc/nginx/nginx.conf && \
    sed -i 's|access_log /var/log/nginx/access.log|access_log /dev/stdout|' /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]