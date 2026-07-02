const fs = require("fs");
const path = require("path");

test("Kubernetes readiness probe uses the application health endpoint", () => {
  const manifest = fs.readFileSync(
    path.join(__dirname, "../k8s/deployment.yaml"),
    "utf8"
  );

  expect(manifest).toMatch(/readinessProbe:\s+httpGet:\s+path: \/health\b/);
});

test("Kubernetes deployment refreshes pods for mutable image tags", () => {
  const deployment = fs.readFileSync(
    path.join(__dirname, "../k8s/deployment.yaml"),
    "utf8"
  );
  const values = fs.readFileSync(path.join(__dirname, "../k8s/values.yaml"), "utf8");

  expect(deployment).toContain('harness.io/rollout-id: "{{ .Values.rolloutId }}"');
  expect(deployment).toMatch(/imagePullPolicy:\s+Always\b/);
  expect(values).toContain("rolloutId: <+pipeline.executionId>");
});
