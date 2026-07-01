# Security Demo Notes

## Intentional Vulnerabilities

This application contains intentional security vulnerabilities for SAST/Semgrep demonstration purposes.

**Do not deploy this application to production or any shared environment.**

| ID       | Vulnerability           | File                        | Semgrep Rule                   |
|----------|-------------------------|-----------------------------|-------------------------------|
| VULN-001 | SQL Injection           | src/routes/accounts.js      | demo-bank-sql-injection        |
| VULN-002 | Command Injection       | src/routes/admin.js         | demo-bank-command-injection    |
| VULN-003 | Path Traversal          | src/routes/statements.js    | demo-bank-path-traversal       |
| VULN-004 | SSRF                    | src/routes/fx.js            | demo-bank-ssrf                 |
| VULN-005 | Hardcoded Secret        | src/config.js               | demo-bank-hardcoded-secret     |
| VULN-006 | Reflected XSS           | src/app.js                  | demo-bank-reflected-xss        |
| VULN-007 | Insecure CORS Wildcard  | src/app.js                  | demo-bank-insecure-cors        |

## Running the Demo Semgrep Scan

```bash
npm run semgrep:demo
```

All 7 findings should appear deterministically.

## Safety Constraints

- All secrets are fake strings clearly marked as demo-only.
- No real banking API connections.
- No real customer data.
- Default binding is localhost only.
- The app should only be run locally or in an isolated demo environment.
