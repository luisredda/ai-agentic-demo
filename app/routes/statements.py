import os

from flask import Blueprint, jsonify, request, send_file

statements_bp = Blueprint("statements", __name__)

STATEMENTS_DIR = os.path.join(os.path.dirname(__file__), "../../demo-statements")


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

    # Resolve the path and verify it stays inside the allowed directory.
    base = os.path.realpath(STATEMENTS_DIR)
    file_path = os.path.realpath(os.path.join(base, file))
    if not file_path.startswith(base + os.sep):
        return jsonify({"error": "Invalid file path"}), 400
    if not os.path.exists(file_path):
        return jsonify({"error": "Statement file not found"}), 404

    return send_file(file_path, as_attachment=True)
