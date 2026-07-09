# Security Demo Notes

## Intentional Vulnerabilities

This application contains intentional security vulnerabilities for SAST/Semgrep demonstration purposes.

**Do not deploy this application to production or any shared environment.**

| ID       | Vulnerability           | Severity | File                        | Semgrep Rule                   |
|----------|-------------------------|----------|-----------------------------|-------------------------------|
| VULN-001 | SQL Injection           | ERROR    | app/routes/accounts.py      | demo-bank-sql-injection        |
| VULN-002 | Command Injection       | ERROR    | app/routes/admin.py         | demo-bank-command-injection    |
| VULN-006 | Reflected XSS           | WARNING  | app/app.py                  | demo-bank-reflected-xss        |
| VULN-007 | Insecure CORS Wildcard  | WARNING  | app/app.py                  | demo-bank-insecure-cors        |

## Running the Demo Semgrep Scan

```bash
semgrep scan --config .semgrep.yml app/
```

All 4 findings should appear deterministically (2 ERROR, 2 WARNING).

## Safety Constraints

- Secrets are loaded from environment variables, with demo-only fallbacks.
- No real banking API connections.
- No real customer data.
- Default binding is localhost only.
- The app should only be run locally or in an isolated demo environment.
