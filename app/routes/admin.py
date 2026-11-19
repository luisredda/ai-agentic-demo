import subprocess

from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin", __name__)

# Allow-list of valid hostnames/IPs the ping endpoint may target.
_ALLOWED_HOSTS = {"localhost", "127.0.0.1", "::1"}


@admin_bp.route("/ping", methods=["GET"])
def ping():
    host = request.args.get("host", "localhost")

    if host not in _ALLOWED_HOSTS:
        return jsonify({"error": "Host not allowed"}), 400

    try:
        stdout = subprocess.check_output(
            ["echo", f"Pinging: {host}"],
            shell=False,
            text=True,
        )
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
