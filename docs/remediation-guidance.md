# Remediation Guidance

This document describes how each intentional vulnerability in DemoBank AI SDLC should be fixed
after the Security Remediation Advisor generates its PR.

## VULN-001: SQL Injection (app/routes/accounts.py)

**Fix:** Use parameterized queries.

```python
# Before (vulnerable)
query = "SELECT * FROM accounts WHERE id = '" + id + "'"
row = db.execute(query).fetchone()

# After (safe)
row = db.execute("SELECT * FROM accounts WHERE id = ?", [id]).fetchone()
```

## VULN-002: Command Injection (app/routes/admin.py)

**Fix:** Remove the dynamic shell execution or use a strict allowlist.

```python
# Before (vulnerable)
cmd = "echo 'Pinging: " + host + "'"
stdout = subprocess.check_output(cmd, shell=True, text=True)

# After (safe — no user input in shell command)
allowed = ["localhost", "127.0.0.1"]
if host not in allowed:
    return jsonify({"error": "Invalid host"}), 400
return jsonify({"result": "Pinging: " + host, "host": host})
```

## VULN-006: Reflected XSS (app/app.py)

**Fix:** Escape user input before reflecting in HTML, or use a template engine (Jinja2 auto-escapes).

```python
from markupsafe import escape

name = escape(request.args.get("name", "Guest"))
return f"<html><body><h1>Welcome, {name}!</h1></body></html>"
```

## VULN-007: Insecure CORS (app/app.py)

**Fix:** Restrict origins to known trusted domains.

```python
CORS(app, origins=["https://your-domain.com"])
```
