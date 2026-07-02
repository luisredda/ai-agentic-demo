const request = require("supertest");
const { initDb } = require("../src/db");

let app;

beforeAll(async () => {
  process.env.DB_PATH = ":memory:";
  await initDb();
  app = require("../src/app");
});

test("GET / returns 200", async () => {
  const res = await request(app).get("/");
  expect(res.status).toBe(200);
});

test("GET /transfer returns 200", async () => {
  const res = await request(app).get("/transfer");
  expect(res.status).toBe(200);
});

test("dashboard pay bill action links to the bill payment page", async () => {
  const res = await request(app).get("/");
  expect(res.text).toContain('href="/pay-bill"');
  expect(res.text).toContain("Pay Bill");
});

test("GET /pay-bill returns 200", async () => {
  const res = await request(app).get("/pay-bill");
  expect(res.status).toBe(200);
  expect(res.text).toContain("Pay Bill");
});

test("GET /login returns 200", async () => {
  const res = await request(app).get("/login");
  expect(res.status).toBe(200);
});
