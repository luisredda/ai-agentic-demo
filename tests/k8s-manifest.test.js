const fs = require("fs");
const path = require("path");

test("Kubernetes readiness probe uses the application health endpoint", () => {
  const manifest = fs.readFileSync(
    path.join(__dirname, "../k8s/deployment.yaml"),
    "utf8"
  );

  expect(manifest).toMatch(/readinessProbe:\s+httpGet:\s+path: \/health\b/);
});
