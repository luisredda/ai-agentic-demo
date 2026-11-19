FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
COPY scripts/ ./scripts/

EXPOSE 3000

# Run as a non-root user to limit blast radius if the process is compromised.
RUN useradd --system --no-create-home appuser
USER appuser

CMD ["python", "-m", "app.server"]
