const fs = require("fs");
const path = require("path");

const stylesPath = path.join(__dirname, "../src/public/styles.css");

function readStyles() {
  return fs.readFileSync(stylesPath, "utf8");
}

test("quick action buttons use a stable aligned layout", () => {
  const styles = readStyles();

  expect(styles).toMatch(/\.quick-actions\s*\{[^}]*display:\s*grid;/s);
  expect(styles).toMatch(/\.action-btn\s*\{[^}]*margin-top:\s*auto;/s);
  expect(styles).not.toMatch(/\.action-card:nth-child\([^)]*\)\s*\{[^}]*transform:/s);
});

test("transfer form actions are not pushed outside the form card", () => {
  const styles = readStyles();

  expect(styles).toMatch(/\.form-actions\s*\{[^}]*margin-top:\s*24px;/s);
  expect(styles).not.toMatch(/\.form-actions\s*\{[^}]*margin-left:/s);
});
