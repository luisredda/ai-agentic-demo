import os
import re

ROOT = os.path.dirname(os.path.dirname(__file__))


def _read(rel):
    with open(os.path.join(ROOT, rel), "r", encoding="utf-8") as f:
        return f.read()


def test_readiness_probe_uses_application_health_endpoint():
    manifest = _read("k8s/deployment.yaml")
    assert re.search(r"readinessProbe:\s+httpGet:\s+path: /health\b", manifest)


def test_deployment_rolls_pods_on_every_harness_execution():
    manifest = _read("k8s/deployment.yaml")
    values = _read("k8s/values.yaml")

    assert "rolloutId: <+pipeline.executionId>" in values
    assert 'harness.io/rollout-id: "{{ .Values.rolloutId }}"' in manifest
    assert "imagePullPolicy: Always" in manifest
