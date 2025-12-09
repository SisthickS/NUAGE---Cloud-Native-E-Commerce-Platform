# --- Stage 1: Builder Stage (Install Dependencies) ---
# Goal: Create a virtual environment and install all dependencies.

FROM python:3.10-slim AS builder

# Set environment variables for the virtual environment and PATH
# This ensures pip and python commands use the venv binaries.
ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Copy requirements and create the virtual environment
# This step is cached as long as requirements.txt doesn't change
COPY requirements.txt .
RUN python3 -m venv $VIRTUAL_ENV

# Install dependencies using the pip from the new virtual environment
# The --no-cache-dir flag helps keep the layer size smaller
RUN pip install -r requirements.txt


# --- Stage 2: Final/Runtime Stage (Run Application) ---
# Goal: Build a slim image that only contains the application code and installed packages.

FROM python:3.10-slim

# Copy the environment variables from the builder stage
ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Copy ONLY the installed virtual environment from the builder stage
# This dramatically reduces the final image size.
COPY --from=builder $VIRTUAL_ENV $VIRTUAL_ENV

# Copy the application source code (app.py, etc.)
COPY . .

# Expose the port Gunicorn will bind to (8080 is standard for containers)
EXPOSE 8080

# Use CMD to start the application with Gunicorn.
# -b 0.0.0.0:8080 binds Gunicorn to all interfaces on port 8080.
# app:app refers to the application instance 'app' inside the module 'app.py'.
# The final running process is Gunicorn, not the Python interpreter directly.
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]