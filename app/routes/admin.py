import re
import subprocess

from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin", __name__)


_HOST_RE = re.compile(r"^[A-Za-z0-9]([A-Za-z0-9.\-]{0,251}[A-Za-z0-9])?$|^[0-9A-Fa-f:]{2,45}$")


@admin_bp.route("/ping", methods=["GET"])
def ping():
    host = request.args.get("host", "localhost")

    # Allowlist the host and invoke without a shell (argv list).
    if not _HOST_RE.match(host):
        return jsonify({"error": "Invalid host"}), 400
    cmd = ["ping", "-c", "1", "-W", "2", host]
    try:
        stdout = subprocess.check_output(cmd, shell=False, text=True, timeout=5)
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
