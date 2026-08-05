# =============================================================================
# CMED Frontend — Production Dockerfile
# =============================================================================
# Multi-stage build:
#   Stage 1: Node 20 Alpine — build the React app with Vite
#   Stage 2: Nginx Alpine — serve static files + proxy API to backend
#
# Result: Optimized, minified production bundle served by Nginx.
# No Node runtime in final image — attack surface minimized.
# =============================================================================

# ------------------------------ Stage 1: Build -------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (leverages Docker layer cache)
COPY package*.json ./
RUN npm ci --only=production

# Copy source and build
COPY . .
RUN npm run build

# ------------------------------ Stage 2: Serve -------------------------------
FROM nginx:alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
