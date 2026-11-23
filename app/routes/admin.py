import subprocess

from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin", __name__)

ALLOWED_HOSTS = {"localhost", "127.0.0.1", "::1"}


@admin_bp.route("/ping", methods=["GET"])
def ping():
    host = request.args.get("host", "localhost")

    if host not in ALLOWED_HOSTS:
        return jsonify({"error": "Host not allowed"}), 400

    try:
        result = subprocess.run(
            ["echo", "Pinging:", host],
            shell=False,
            capture_output=True,
            text=True,
            timeout=5,
        )
        stdout = result.stdout
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Ping timed out"}), 500
    return jsonify({"result": stdout.strip(), "host": host})


@admin_bp.route("/status", methods=["GET"])
def status():
    return jsonify(
        {
            "status": "admin panel active",
            "warning": "DEMO ONLY — not a real admin panel",
        }
    )
