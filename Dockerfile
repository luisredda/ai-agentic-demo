FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
COPY scripts/ ./scripts/

EXPOSE 3000

RUN useradd --no-create-home --shell /bin/false appuser
USER appuser

CMD ["python", "-m", "app.server"]
