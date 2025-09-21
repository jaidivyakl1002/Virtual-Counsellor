# Use Alpine Linux for minimal size
FROM python:3.11-alpine

# Install only essential build dependencies
RUN apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy and install requirements first (for better caching)
COPY requirements.txt .

# Install Python dependencies and clean up build deps in one layer
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del gcc musl-dev libffi-dev \
    && rm -rf /root/.cache/pip

# Copy only the necessary Python modules
COPY agentic_layer/ ./agentic_layer/
COPY config/ ./config/
COPY core/ ./core/
COPY models/ ./models/
COPY scrapers/ ./scrapers/
COPY server/ ./server/
COPY ui/ ./ui/
COPY utils/ ./utils/

# Copy any root-level Python files
COPY *.py ./

# Create non-root user for security
RUN adduser -D -s /bin/sh appuser \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8080

# Use exec form to ensure proper signal handling
CMD ["uvicorn", "server.run:app", "--host", "0.0.0.0", "--port", "8080"]