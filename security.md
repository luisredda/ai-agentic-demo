# Security

Security rules for this repository. Marked blocks are maintained by Harness remediation. Text outside those blocks is left as written.


<!-- harness-remediation:sec-html-escape -->
### sec-html-escape — Pass user data as template context

Routes render user-supplied values through Jinja templates with autoescape, never by concatenating request data into HTML strings.
<!-- /harness-remediation -->

<!-- harness-remediation:sec-shell-argv -->
### sec-shell-argv — No shell strings from request data

Commands run via subprocess with an argv list and shell=False, after the input is validated against an allowlist.
<!-- /harness-remediation -->

<!-- harness-remediation:sec-sql-bind -->
### sec-sql-bind — Bind SQL parameters

sqlite3 queries use qmark placeholders with a bound tuple; request values are never concatenated into SQL.
<!-- /harness-remediation -->

<!-- harness-remediation:sec-bind-host -->
### sec-bind-host — Configurable bind address

The server binds to 127.0.0.1 by default and reads BIND_HOST from the environment; container manifests set 0.0.0.0 explicitly.
<!-- /harness-remediation -->

<!-- harness-remediation:sec-csrf-token -->
### sec-csrf-token — CSRF token on HTML forms

State-changing forms carry a session-bound random token that the POST handler checks with hmac.compare_digest and rejects with 400 on mismatch.
<!-- /harness-remediation -->
