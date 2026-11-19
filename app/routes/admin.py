import subprocess

from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin", __name__)

# Allow-list of hosts that may be pinged. Rejects all shell metacharacters
# and limits targets to known internal addresses.
_ALLOWED_HOSTS = {"localhost", "127.0.0.1", "healthcheck.internal"}


@admin_bp.route("/ping", methods=["GET"])
def ping():
    host = request.args.get("host", "localhost")

    if host not in _ALLOWED_HOSTS:
        return jsonify({"error": "Host not permitted"}), 403

    # Safe: shell=False (default) + args as a list; no shell expansion possible.
    try:
        result = subprocess.run(
            ["ping", "-c", "1", host],
            capture_output=True,
            text=True,
            timeout=5,
        )
        stdout = result.stdout
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Ping timed out"}), 504
    except FileNotFoundError:
        return jsonify({"error": "ping binary not found"}), 500
    return jsonify({"result": stdout.strip(), "host": host})


@admin_bp.route("/status", methods=["GET"])
def status():
    return jsonify(
        {
            "status": "admin panel active",
            "warning": "DEMO ONLY — not a real admin panel",
        }
    )
