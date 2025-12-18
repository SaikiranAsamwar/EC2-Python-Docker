# Use official Python runtime as base image
FROM python:3.11-slim

# Set working directory in container
WORKDIR /app/backend

# Copy requirements file first for better caching
COPY requirements.txt .

# Install Python dependencies including production server
# psycopg2-binary includes pre-compiled binaries, so no gcc needed
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application files
COPY app/ ./app/
COPY run.py config.py utils.py ./

# Create non-root user for security
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose port 5000
EXPOSE 5000

# Set environment variables
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/').read()"

# Run with Gunicorn for production
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--timeout", "120", "--access-logfile", "-", "--error-logfile", "-", "run:app"]
