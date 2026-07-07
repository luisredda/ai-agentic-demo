# Changelog

## Unreleased

### Fixed
- Transaction status badge no longer overlays adjacent table columns (#23)
- Kubernetes readiness probe path corrected from /healthz to /health (#23)

### Security
- Docker container now runs as non-root user (node) to address CWE-250 security finding (#24)

### Added
- CSS regression test for status badge positioning (#23)

### Initial
- Initial intentionally vulnerable demo banking application for AI SDLC demo.
