# DemoBank AI SDLC — Demo Story

## Harness Demo Flow

```
PR Created
  ↓
CI: Checkout + Build + Unit Tests
  ↓
Worker Agent: Change Advisor
  ↓
STO/Semgrep Scan
  ↓
Worker Agent: Security Remediation Advisor
  ↓
Docker Build + Push
  ↓
Kubernetes Preview Deploy
  ↓
Rollout fails because readinessProbe points to /healthz
  ↓
Worker Agent: Manifest Remediator
  ↓
Manifest fix PR changes /healthz to /health
  ↓
Retry deployment succeeds
```

## Slack Demo Prompts

Copy these into the Slack thread to simulate user feedback:

```
The transfer button is broken on mobile. I can barely click it.
```

```
The dashboard cards look misaligned on my screen.
```

```
The transfer form accepted an invalid amount and still showed a success message.
```

## Cursor Slack Prompt

```
@Cursor please analyze this thread, inspect the HarnessBank demo repository, identify the user-facing issues being reported, propose the smallest safe fix, update tests and changelog if appropriate, and open a pull request.

Please include in the PR description:
- Slack feedback summary
- What changed
- Files modified
- Risk level
- How to validate manually
- Any security-related concerns found during code review
```

## Change Advisor Expected PR Comment

```markdown
# Harness AI Change Advisor

## User feedback addressed
This PR appears to address the reported mobile layout issue and transfer form validation behavior.

## What changed
- Updated responsive CSS for dashboard and transfer form.
- Improved validation for transfer amount.
- Added or updated tests for valid transfer behavior.
- Updated changelog.

## Change classification
- Type: UI fix + validation fix
- Risk level: Medium
- Reviewer focus: mobile behavior, validation correctness, regression risk

## Tests
Unit tests were available in the current context. Verify the Harness execution for final status.

## Documentation and changelog
Changelog update should be present if user-facing behavior changed.

## Recommendation
⚠️ Review with attention
```

## Security Remediation Advisor Expected Findings

After Semgrep scan, the Security Remediation Advisor should surface:

- SQL query uses string concatenation (`app/routes/accounts.py`)
- Diagnostic command uses dynamic execution (`app/routes/admin.py`)
- HTML response reflects query data (`app/app.py`)
- CORS allows all origins (`app/app.py`)

## Manifest Remediator Expected Behavior

When Kubernetes rollout fails, the Manifest Remediator should identify:

```
Readiness probe is calling /healthz, but the application exposes /health.
```

Expected fix in `k8s/deployment.yaml`:

```yaml
readinessProbe:
  httpGet:
    path: /health
    port: 3000
```
