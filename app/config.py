# DEMO VULNERABILITY: hardcoded secrets for SAST demonstration (VULN-005)
# These are fake demo-only values. Do not use in production.
import os

JWT_SECRET = "demo-super-secret-jwt-key-not-for-production"
API_KEY = "demo-api-key-12345-not-real"
ACCESS_TOKEN = "demo-access-token-abcdef-not-real"

config = {
    "port": int(os.environ.get("PORT", 3000)),
    "db_path": os.environ.get("DB_PATH", "./demobank.db"),
    "jwt_secret": JWT_SECRET,
    "api_key": API_KEY,
    "access_token": ACCESS_TOKEN,
    "app_name": "DemoBank AI SDLC",
    "demo_mode": True,
}
