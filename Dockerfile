FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
COPY scripts/ ./scripts/

# Run as a dedicated non-root user to limit blast radius on container compromise.
RUN addgroup --system appgroup \
    && adduser --system --ingroup appgroup appuser \
    && chown -R appuser:appgroup /app

# Inside the container the server must listen on all interfaces so the
# published port / k8s Service and probes can reach it.
ENV BIND_HOST=0.0.0.0

EXPOSE 3000

USER appuser

CMD ["python", "-m", "app.server"]
