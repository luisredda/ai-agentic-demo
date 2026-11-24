FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
COPY scripts/ ./scripts/

RUN useradd -r -s /sbin/nologin appuser
USER appuser

EXPOSE 3000

CMD ["python", "-m", "app.server"]
