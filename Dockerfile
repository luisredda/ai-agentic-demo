FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
COPY scripts/ ./scripts/

RUN groupadd --system appgroup \
    && useradd --system --gid appgroup --home-dir /app appuser \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD ["python", "-m", "app.server"]
