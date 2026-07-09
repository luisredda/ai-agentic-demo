# Security Demo Notes

## Intentional Vulnerabilities

This application contains intentional security vulnerabilities for SAST/Semgrep demonstration purposes.

**Do not deploy this application to production or any shared environment.**

| ID       | Vulnerability           | File                        | Semgrep Rule                   |
|----------|-------------------------|-----------------------------|-------------------------------|
| VULN-001 | SQL Injection           | app/routes/accounts.py      | demo-bank-sql-injection        |
| VULN-002 | Command Injection       | app/routes/admin.py         | demo-bank-command-injection    |
| VULN-003 | Path Traversal          | app/routes/statements.py    | demo-bank-path-traversal       |
| VULN-004 | SSRF                    | app/routes/fx.py            | demo-bank-ssrf                 |
| VULN-005 | Hardcoded Secret        | app/config.py               | demo-bank-hardcoded-secret     |
| VULN-006 | Reflected XSS           | app/app.py                  | demo-bank-reflected-xss        |
| VULN-007 | Insecure CORS Wildcard  | app/app.py                  | demo-bank-insecure-cors        |

## Running the Demo Semgrep Scan

```bash
semgrep scan --config .semgrep.yml app/
```

All 7 findings should appear deterministically.

## Safety Constraints

- All secrets are fake strings clearly marked as demo-only.
- No real banking API connections.
- No real customer data.
- Default binding is localhost only.
- The app should only be run locally or in an isolated demo environment.
