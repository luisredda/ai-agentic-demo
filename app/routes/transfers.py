from flask import Blueprint, jsonify, request

from ..db import get_db

transfers_bp = Blueprint("transfers", __name__)


# DEMO VULNERABILITY: weak validation — allows zero/negative amounts and arbitrary memo/account IDs (VULN-002 partial)
# Do not fix — this is the UX bug users complain about in Slack
@transfers_bp.route("/", methods=["POST"])
def create_transfer():
    body = request.get_json(silent=True) or request.form
    from_account = body.get("fromAccount")
    to_account = body.get("toAccount")
    amount = body.get("amount")
    memo = body.get("memo")

    # Intentionally weak validation: no check for negative/zero amounts
    if not from_account or not to_account or amount is None:
        return jsonify({"error": "Missing required fields"}), 400

    db = get_db()
    cursor = db.execute(
        "INSERT INTO transactions (from_account, to_account, amount, memo, status) VALUES (?, ?, ?, ?, ?)",
        [from_account, to_account, amount, memo or "", "completed"],
    )
    db.commit()
    return jsonify(
        {
            "success": True,
            "message": "Transfer completed successfully",
            "transferId": cursor.lastrowid,
            "amount": amount,
        }
    )


@transfers_bp.route("/", methods=["GET"])
def list_transfers():
    db = get_db()
    rows = db.execute(
        "SELECT * FROM transactions ORDER BY created_at DESC LIMIT 20"
    ).fetchall()
    return jsonify([dict(r) for r in rows])
