import subprocess

from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin", __name__)


# FIXED: Command injection - removed shell=True and use list format
@admin_bp.route("/ping", methods=["GET"])
def ping():
    host = request.args.get("host", "localhost")

    # Sanitized: use list format with shell=False (default) to prevent command injection
    try:
        stdout = subprocess.check_output(["echo", f"Pinging: {host}"], text=True)
    except subprocess.CalledProcessError:
        return jsonify({"error": "Ping failed"}), 500
    return jsonify({"result": stdout.strip(), "host": host})


@admin_bp.route("/status", methods=["GET"])
def status():
    return jsonify(
        {
            "status": "admin panel active",
            "warning": "DEMO ONLY — not a real admin panel",
        }
    )
