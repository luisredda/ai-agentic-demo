const fs = require("fs");
const path = require("path");

const styles = fs.readFileSync(
  path.join(__dirname, "../src/public/styles.css"),
  "utf8"
);

function getCssRule(selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = styles.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));
  return match ? match[1] : "";
}

test("transaction status badges remain in the table cell flow", () => {
  const statusBadgeRule = getCssRule(".status-badge");

  expect(statusBadgeRule).toContain("display: inline-flex");
  expect(statusBadgeRule).not.toMatch(/position\s*:\s*absolute\b/);
  expect(statusBadgeRule).not.toMatch(/margin-left\s*:\s*-/);
  expect(statusBadgeRule).not.toMatch(/z-index\s*:/);
});

test("dashboard quick action buttons use an aligned responsive layout", () => {
  const quickActionsRule = getCssRule(".quick-actions");
  const actionCardRule = getCssRule(".action-card");
  const actionButtonRule = getCssRule(".action-btn");

  expect(quickActionsRule).toContain("display: grid");
  expect(quickActionsRule).toContain("grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))");
  expect(quickActionsRule).not.toMatch(/position\s*:\s*relative\b/);
  expect(quickActionsRule).not.toMatch(/margin-bottom\s*:\s*120px\b/);

  expect(actionCardRule).toContain("display: flex");
  expect(actionCardRule).toContain("flex-direction: column");
  expect(actionCardRule).toContain("align-items: center");
  expect(actionButtonRule).toContain("margin-top: auto");
  expect(styles).not.toMatch(/\.action-card:nth-child\([^)]*\)\s*\{[^}]*transform\s*:/);
});

test("form action buttons remain inside the form card", () => {
  const formActionsRule = getCssRule(".form-actions");
  const applyTransferRule = getCssRule(".apply-transfer-btn");

  expect(formActionsRule).toContain("margin-top: 24px");
  expect(formActionsRule).not.toMatch(/margin-left\s*:/);
  expect(applyTransferRule).toContain("width: 100%");
  expect(applyTransferRule).toContain("min-width: 0");
});
