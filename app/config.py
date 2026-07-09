import os

# Secrets are loaded from environment variables (or a secrets manager), never
# hardcoded. Demo-only fallbacks are used when the env vars are unset so the app
# still boots locally.
JWT_SECRET = os.environ.get("JWT_SECRET", "demo-only-fallback-change-me")
API_KEY = os.environ.get("API_KEY", "demo-only-fallback-change-me")
ACCESS_TOKEN = os.environ.get("ACCESS_TOKEN", "demo-only-fallback-change-me")

config = {
    "port": int(os.environ.get("PORT", 3000)),
    "db_path": os.environ.get("DB_PATH", "./demobank.db"),
    "jwt_secret": JWT_SECRET,
    "api_key": API_KEY,
    "access_token": ACCESS_TOKEN,
    "app_name": "DemoBank AI SDLC",
    "demo_mode": True,
}
