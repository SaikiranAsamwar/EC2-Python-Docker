# Use official Python runtime as base image
FROM python:3.11-slim

# Set working directory in container
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend application
COPY . .

# Expose port 5000
EXPOSE 5000

# Set environment variable for Flask
ENV FLASK_ENV=production

# Run the application
CMD ["python", "run.py"]
