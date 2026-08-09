# ═══════════════════════════════════════════════════════════
#  Stage 2 — Serve with Nginx
# ═══════════════════════════════════════════════════════════
FROM nginx:alpine
RUN apk add --no-cache curl

# Fix 1: Robustly replace the PID path regardless of spacing or /var/run vs /run
# This ensures Nginx writes its PID to /tmp (which is mounted as a writable emptyDir)
RUN sed -i 's|/var/run/nginx.pid|/tmp/nginx.pid|g; s|/run/nginx.pid|/tmp/nginx.pid|g' /etc/nginx/nginx.conf

# Fix 2: Symlink logs to stdout/stderr to prevent read-only filesystem crashes
# Nginx will try to write to /var/log/nginx/ which is blocked by readOnlyRootFilesystem
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]