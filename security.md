# Security

Security rules for this repository. Marked blocks are maintained by Harness remediation. Text outside those blocks is left as written.


<!-- harness-remediation:sec-dom-textcontent -->
### sec-dom-textcontent — Render API data with textContent

Values returned by fetch calls in client JS are set through textContent or DOM construction, never concatenated into innerHTML.
<!-- /harness-remediation -->

<!-- harness-remediation:sec-cors-allowlist -->
### sec-cors-allowlist — Restrict CORS to an explicit allowlist

CORS is enabled only for origins listed in CORS_ALLOWED_ORIGINS; wildcards are dropped and the default is same-origin.
<!-- /harness-remediation -->

<!-- harness-remediation:sec-file-toctou -->
### sec-file-toctou — Avoid check-then-use on file paths

Attempt the file operation once and handle FileNotFoundError instead of calling os.path.exists() first.
<!-- /harness-remediation -->
