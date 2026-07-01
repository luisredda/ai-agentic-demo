const request = require("supertest");
const { initDb } = require("../src/db");

let app;

beforeAll(async () => {
  process.env.DB_PATH = ":memory:";
  await initDb();
  app = require("../src/app");
});

test("POST /api/transfers accepts a valid demo transfer", async () => {
  const res = await request(app)
    .post("/api/transfers")
    .send({ fromAccount: "DEMO-001", toAccount: "DEMO-002", amount: 100, memo: "Test" });
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.message).toMatch(/completed/i);
});

test("POST /api/transfers returns 400 when fields are missing", async () => {
  const res = await request(app)
    .post("/api/transfers")
    .send({ fromAccount: "DEMO-001" });
  expect(res.status).toBe(400);
});
