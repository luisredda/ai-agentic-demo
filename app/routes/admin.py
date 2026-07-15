import shlex
import subprocess

from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin", __name__)


# Fixed: command injection via user-controlled host parameter (VULN-002)
# Remediated by Harness Security Agent - using parameterized subprocess without shell=True
@admin_bp.route("/ping", methods=["GET"])
def ping():
    host = request.args.get("host", "localhost")

    # Fixed: use subprocess without shell=True and properly quote the input
    try:
        stdout = subprocess.check_output(
            ["echo", f"Pinging: {host}"],
            text=True,
            timeout=5
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
