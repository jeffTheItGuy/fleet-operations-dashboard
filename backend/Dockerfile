# =============================================================================
# CMED Backend — Production Dockerfile
# =============================================================================
# Multi-stage build with security hardening:
#   - Python 3.11 slim base
#   - System dependencies for psycopg2
#   - Non-root user for runtime security
#   - Gunicorn WSGI server (4 workers, 120s timeout)
#
# No Flask dev server in production. Gunicorn handles concurrent requests
# and is restart-safe under load.
# =============================================================================

FROM python:3.11-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies into a virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ------------------------------ Runtime Stage -------------------------------
FROM python:3.11-slim

WORKDIR /app

# Install runtime dependencies only (no gcc)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Create non-root user for security
RUN groupadd -r cmed && useradd -r -g cmed cmed

# Copy application code
COPY --chown=cmed:cmed . .

# Create logs directory
RUN mkdir -p /app/logs && chown -R cmed:cmed /app/logs

# Switch to non-root user
USER cmed

# Expose port
EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:5000/api/health || exit 1

# Production command: Gunicorn with 4 workers
CMD ["gunicorn", \
     "--bind", "0.0.0.0:5000", \
     "--workers", "4", \
     "--worker-class", "sync", \
     "--worker-connections", "1000", \
     "--timeout", "120", \
     "--keep-alive", "5", \
     "--max-requests", "1000", \
     "--max-requests-jitter", "50", \
     "--access-logfile", "-", \
     "--error-logfile", "-", \
     "--capture-output", \
     "--enable-stdio-inheritance", \
     "run:app"]
