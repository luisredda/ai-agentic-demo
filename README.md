# DemoBank AI SDLC

> **WARNING: This application is intentionally vulnerable. It must only be used in a local or isolated demo environment. Do not deploy to production. Do not connect to real banks, payment systems, or customer data.**

A demo banking application built to showcase an AI-native SDLC using Cursor, Claude Code, Slack feedback, Harness Pipelines, Harness Worker Agents, Semgrep/SAST, and Kubernetes deployment remediation.

## What is this?

DemoBank AI SDLC is a deliberately imperfect Node.js banking app that supports a live demo story:

1. Users report UX bugs in Slack.
2. Cursor analyzes the thread and opens a PR.
3. Harness runs CI and a Worker Agent (Change Advisor) reviews the PR.
4. Semgrep/SAST detects intentional vulnerabilities.
5. A Security Remediation Advisor proposes fixes.
6. The app deploys to Kubernetes — but the readiness probe is intentionally wrong.
7. A Manifest Remediator Agent fixes the probe and the retry succeeds.

See `docs/demo-story.md` for the full flow.

## Running Locally

```bash
npm install
npm run seed
npm run dev
```

The app starts on http://localhost:3000.

## Running Tests

```bash
npm test
```

## Running the Demo Semgrep Scan

Requires [Semgrep](https://semgrep.dev/docs/getting-started/) to be installed.

```bash
npm run semgrep:demo
```

Expected findings: SQL injection, command injection, path traversal, SSRF, hardcoded secret, reflected XSS, insecure CORS.

## Building the Docker Image

```bash
docker build -t harnessbank-demo:latest .
docker run -p 3000:3000 harnessbank-demo:latest
```

## Deploying to Kubernetes

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Note: The initial deployment will fail because the readiness probe points to `/healthz` instead of `/health`. This is intentional — the Manifest Remediator Agent demonstrates the fix.

## Project Structure

```
.
├── src/
│   ├── app.js            # Express app, routes, CORS
│   ├── server.js         # Entry point
│   ├── db.js             # SQLite setup
│   ├── config.js         # App config (intentional hardcoded secrets)
│   ├── routes/           # accounts, transfers, statements, admin, fx
│   ├── views/            # EJS templates
│   └── public/           # CSS and client JS
├── tests/                # Jest + Supertest tests
├── scripts/              # seed.js, smoke-test.sh
├── k8s/                  # Kubernetes manifests
├── docs/                 # Demo story, security notes, remediation guidance
├── .semgrep.yml          # Deterministic demo Semgrep rules
├── Dockerfile
└── CHANGELOG.md
```

## Intentional Vulnerabilities

| ID       | Type                  | Location                   |
|----------|-----------------------|----------------------------|
| VULN-001 | SQL Injection         | src/routes/accounts.js     |
| VULN-002 | Command Injection     | src/routes/admin.js        |
| VULN-003 | Path Traversal        | src/routes/statements.js   |
| VULN-004 | SSRF                  | src/routes/fx.js           |
| VULN-005 | Hardcoded Secret      | src/config.js              |
| VULN-006 | Reflected XSS         | src/app.js                 |
| VULN-007 | Insecure CORS         | src/app.js                 |

These vulnerabilities exist for SAST demonstration purposes only. See `docs/security-demo-notes.md` and `docs/remediation-guidance.md`.

## License

MIT
