const fs = require("fs");
const path = require("path");
const request = require("supertest");
const { initDb } = require("../src/db");

let app;

beforeAll(async () => {
  process.env.DB_PATH = ":memory:";
  await initDb();
  app = require("../src/app");
});

test("admin ping rejects shell metacharacters", async () => {
  const res = await request(app)
    .get("/api/admin/ping")
    .query({ host: "localhost; whoami" });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe("Invalid host");
});

test("statement downloads are limited to known statement names", async () => {
  const res = await request(app)
    .get("/api/statements")
    .query({ file: "../../package.json" });

  expect(res.status).toBe(404);
});

test("welcome page escapes reflected query text", async () => {
  const res = await request(app)
    .get("/welcome")
    .query({ name: '<script>alert("xss")</script>' });

  expect(res.status).toBe(200);
  expect(res.text).toContain("&lt;script&gt;");
  expect(res.text).not.toContain('<script>alert("xss")</script>');
});

test("transfer form includes a CSRF token", async () => {
  const res = await request(app).get("/transfer");

  expect(res.status).toBe(200);
  expect(res.text).toMatch(/name="_csrf" value="[a-f0-9]{64}"/);
  expect(res.headers["set-cookie"].join(";")).toContain("csrfToken=");
});

test("Docker image declares a non-root runtime user", () => {
  const dockerfile = fs.readFileSync(
    path.join(__dirname, "../Dockerfile"),
    "utf8"
  );

  expect(dockerfile).toMatch(/^USER node$/m);
});

test("unused layout template does not render raw HTML body content", () => {
  const layout = fs.readFileSync(
    path.join(__dirname, "../src/views/layout.ejs"),
    "utf8"
  );

  expect(layout).not.toContain("<%- body %>");
  expect(layout).toContain("<%= body || \"\" %>");
});
