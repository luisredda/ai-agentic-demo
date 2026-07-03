# Changelog

## Unreleased

### Added

- Open-Meteo weather API integration client for retrieving weather forecasts (#13)
- Initial intentionally vulnerable demo banking application for AI SDLC demo.

### Fixed

- Fix dashboard quick action card alignment by replacing flex/transform layout with responsive grid (#16)
- Fix Kubernetes readiness probe path from /healthz to /health (#17)
- Replace malformed integrations.js with valid static integration metadata (#17)

### Security

- Fix command injection vulnerability in admin ping endpoint by removing shell execution and validating host input (#17)
- Fix path traversal vulnerability in statement downloads by restricting to allowlisted filenames (#17)
- Fix reflected XSS vulnerability in welcome page by rendering through escaped EJS template (#17)
- Add non-root container runtime controls in Docker and Kubernetes deployments (#17)
