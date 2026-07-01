# Remediation Guidance

This document describes how each intentional vulnerability in DemoBank AI SDLC should be fixed
after the Security Remediation Advisor generates its PR.

## VULN-001: SQL Injection (src/routes/accounts.js)

**Fix:** Use parameterized queries.

```js
// Before (vulnerable)
const query = "SELECT * FROM accounts WHERE id = '" + req.params.id + "'";
db.get(query, [], callback);

// After (safe)
db.get("SELECT * FROM accounts WHERE id = ?", [req.params.id], callback);
```

## VULN-002: Command Injection (src/routes/admin.js)

**Fix:** Remove the dynamic exec or use a strict allowlist.

```js
// Before (vulnerable)
const cmd = "echo 'Pinging: " + host + "'";
exec(cmd, callback);

// After (safe — no user input in shell command)
const allowed = ["localhost", "127.0.0.1"];
if (!allowed.includes(host)) return res.status(400).json({ error: "Invalid host" });
res.json({ result: "Pinging: " + host, host });
```

## VULN-003: Path Traversal (src/routes/statements.js)

**Fix:** Normalize the path and verify it stays inside the allowed directory.

```js
const filePath = path.resolve(STATEMENTS_DIR, file);
if (!filePath.startsWith(path.resolve(STATEMENTS_DIR))) {
  return res.status(400).json({ error: "Invalid file path" });
}
res.download(filePath);
```

## VULN-004: SSRF (src/routes/fx.js)

**Fix:** Remove the user-controlled URL parameter; use only internal/static rate data.

```js
// Remove the req.query.url branch entirely and return only DEMO_RATES
```

## VULN-005: Hardcoded Secret (src/config.js)

**Fix:** Load secrets from environment variables or a secrets manager.

```js
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is required");
```

## VULN-006: Reflected XSS (src/app.js)

**Fix:** Sanitize or encode user input before reflecting in HTML, or use a template engine.

```js
const name = (req.query.name || "Guest").replace(/[<>"'&]/g, "");
res.send(`<html><body><h1>Welcome, ${name}!</h1></body></html>`);
```

## VULN-007: Insecure CORS (src/app.js)

**Fix:** Restrict origins to known trusted domains.

```js
app.use(cors({ origin: "https://your-domain.com" }));
```
