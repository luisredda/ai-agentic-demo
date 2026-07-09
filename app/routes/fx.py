import requests
from flask import Blueprint, jsonify, request

fx_bp = Blueprint("fx", __name__)

DEMO_RATES = {
    "USD": 1.0,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.5,
    "CAD": 1.36,
}


# DEMO VULNERABILITY: SSRF via user-controlled URL (VULN-004)
# Do not fix — required for Semgrep SAST demo finding demo-bank-ssrf
@fx_bp.route("/", methods=["GET"])
def fx():
    url = request.args.get("url")
    if url:
        # Intentionally passes user-controlled URL directly to requests
        try:
            response = requests.get(url)
            return jsonify({"source": "external", "data": response.text})
        except requests.RequestException:
            return jsonify({"error": "Failed to fetch external rate"}), 502

    return jsonify(
        {
            "source": "demo",
            "base": "USD",
            "rates": DEMO_RATES,
            "updated": "2024-01-15T12:00:00Z",
            "disclaimer": "DEMO ONLY — not real exchange rates",
        }
    )
