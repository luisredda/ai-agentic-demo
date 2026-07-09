FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
COPY scripts/ ./scripts/

RUN useradd -r -u 1001 appuser && chown -R appuser:appuser /app

ENV FLASK_HOST=0.0.0.0

USER appuser

EXPOSE 3000

CMD ["python", "-m", "app.server"]
