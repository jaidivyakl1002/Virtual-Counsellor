FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

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

EXPOSE 8080

CMD ["uvicorn", "server.run:app", "--host", "0.0.0.0", "--port", "8080"]