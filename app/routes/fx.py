from flask import Blueprint, jsonify

fx_bp = Blueprint("fx", __name__)

DEMO_RATES = {
    "USD": 1.0,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.5,
    "CAD": 1.36,
}


@fx_bp.route("/", methods=["GET"])
def fx():
    # Returns only internal/static rate data — no user-controlled outbound fetch.
    return jsonify(
        {
            "source": "demo",
            "base": "USD",
            "rates": DEMO_RATES,
            "updated": "2024-01-15T12:00:00Z",
            "disclaimer": "DEMO ONLY — not real exchange rates",
        }
    )
