import os

from flask import Blueprint, jsonify, request, send_file

statements_bp = Blueprint("statements", __name__)

STATEMENTS_DIR = os.path.join(os.path.dirname(__file__), "../../demo-statements")


# DEMO VULNERABILITY: path traversal via user-controlled file parameter (VULN-003)
# Do not fix — required for Semgrep SAST demo finding demo-bank-path-traversal
@statements_bp.route("/", methods=["GET"])
def statements():
    file = request.args.get("file")

    if not file:
        return jsonify(
            {
                "statements": [
                    {"name": "statement-jan-2024.pdf", "date": "2024-01-31"},
                    {"name": "statement-feb-2024.pdf", "date": "2024-02-29"},
                    {"name": "statement-mar-2024.pdf", "date": "2024-03-31"},
                ]
            }
        )

    file_path = os.path.join(STATEMENTS_DIR, file)
    if not os.path.exists(file_path):
        return jsonify({"error": "Statement file not found"}), 404

    return send_file(os.path.join(STATEMENTS_DIR, request.args.get("file")), as_attachment=True)
