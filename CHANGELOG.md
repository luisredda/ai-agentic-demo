# Changelog

## Unreleased

### Changed
- Migrated application from Node.js/Express to Python 3.12/Flask while preserving all demo functionality and intentional vulnerabilities (#27)
- Runtime commands updated to Python toolchain: `pip install`, `pytest`, `python -m app.server` (#27)
- Semgrep rules rewritten for Python while maintaining deterministic detection of all 7 demo vulnerabilities (#27)
- Test suite migrated from Jest/Supertest to pytest/Flask test client (#27)

### Added
- JUnit XML test report generation (`test-results/junit.xml`) for Harness Test Intelligence integration (#27)
- CSS regression test for status badge positioning (#23)

### Fixed
- Transaction status badge no longer overlays adjacent table columns (#23)
- Kubernetes readiness probe path corrected from /healthz to /health (#23)

### Initial
- Initial intentionally vulnerable demo banking application for AI SDLC demo.
