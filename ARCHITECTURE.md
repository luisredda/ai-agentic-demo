# Architecture

## Overview

This is an intentionally vulnerable demo banking application designed for AI SDLC demonstrations. The application runs as a Node.js Express web service with security controls for containerized deployment.

## Components

- **Web Application** (src/app.js) — Express.js application serving the demo banking interface with intentional security vulnerabilities for demonstration purposes.
- **Admin Routes** (src/routes/admin.js) — Administrative endpoints including ping/status checks with host validation.
- **Statements API** (src/routes/statements.js) — Secure statement download endpoint with allowlist-based access control.
- **View Templates** (src/views/) — EJS templates for server-side rendering with XSS protection through output escaping (welcome.ejs, layout.ejs).
- **Weather Integration** (integrations.js) — Static integration metadata module listing available external integrations.

## Data Flow

User requests → Express.js routes → Business logic/validation → Response rendering via EJS templates or JSON API responses.

## Dependencies

### External Dependencies

- **Open-Meteo API** (https://open-meteo.com) — Public weather forecast API used for retrieving current weather conditions and forecasts. No API key required. Accessed via the geocoding and forecast endpoints.

## Deployment / Infrastructure

The application is containerized using Docker and deployed to Kubernetes with the following security controls:

- **Non-root runtime**: Container runs as user `node` (UID 1000) in both Docker and Kubernetes
- **Security contexts**: Pod-level and container-level security contexts enforce `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, and drop all Linux capabilities
- **Health checks**: Liveness probe at `/health` (port 3000) with 10s initial delay; readiness probe at `/health` with 5s initial delay
- **Resource limits**: Configured via Kubernetes deployment manifest

## Decisions and Trade-offs

- **Open-Meteo API** was selected as the weather data provider as it provides a free, public API without requiring API key registration, simplifying integration for demo purposes.
- **Non-root container runtime** enforced to follow security best practices and reduce attack surface in containerized environments. **Why:** Mitigates privilege escalation risks. **How to apply:** All container deployments must specify a non-root user.
- **EJS template escaping** used for user-controlled content rendering to prevent XSS attacks. **Why:** Output escaping (`<%= %>`) automatically HTML-encodes user input, blocking script injection. **How to apply:** Use `<%= %>` for all user-provided data in templates; never use `<%- %>` (raw output) for untrusted input.
- **Allowlist-based file access** implemented for statement downloads instead of user-controlled path construction. **Why:** Prevents path traversal attacks. **How to apply:** Define allowed resources in a static allowlist and validate requests against it before file access.
