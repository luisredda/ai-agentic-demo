#!/bin/bash
# Smoke test script — hit key endpoints after local startup
set -e

BASE_URL="${BASE_URL:-http://localhost:3000}"

echo "Running smoke tests against $BASE_URL"

check() {
  local label="$1"
  local url="$2"
  local expected="$3"
  local result
  result=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$result" = "$expected" ]; then
    echo "  PASS  $label ($result)"
  else
    echo "  FAIL  $label (expected $expected, got $result)"
    exit 1
  fi
}

check "health endpoint"     "$BASE_URL/health"    "200"
check "dashboard"           "$BASE_URL/"          "200"
check "transfer page"       "$BASE_URL/transfer"  "200"
check "login page"          "$BASE_URL/login"     "200"
check "fx api"              "$BASE_URL/api/fx"    "200"
check "statements api"      "$BASE_URL/api/statements" "200"

echo "All smoke tests passed."
