const request = require("supertest");
const { initDb } = require("../src/db");

let app;

beforeAll(async () => {
  process.env.DB_PATH = ":memory:";
  await initDb();
  app = require("../src/app");
});

async function getCsrfSession() {
  const res = await request(app).get("/transfer");
  const match = res.text.match(/name="_csrf" value="([^"]+)"/);

  return {
    cookie: res.headers["set-cookie"],
    token: match && match[1],
  };
}

test("POST /api/transfers accepts a valid demo transfer", async () => {
  const { cookie, token } = await getCsrfSession();

  const res = await request(app)
    .post("/api/transfers")
    .set("Cookie", cookie)
    .send({
      fromAccount: "DEMO-001",
      toAccount: "DEMO-002",
      amount: 100,
      memo: "Test",
      _csrf: token,
    });

  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.message).toMatch(/completed/i);
});

test("POST /api/transfers returns 400 when fields are missing", async () => {
  const { cookie, token } = await getCsrfSession();

  const res = await request(app)
    .post("/api/transfers")
    .set("Cookie", cookie)
    .send({ fromAccount: "DEMO-001", _csrf: token });

  expect(res.status).toBe(400);
});

test("POST /api/transfers rejects requests without a CSRF token", async () => {
  const res = await request(app)
    .post("/api/transfers")
    .send({ fromAccount: "DEMO-001", toAccount: "DEMO-002", amount: 100 });

  expect(res.status).toBe(403);
  expect(res.body.error).toBe("Invalid CSRF token");
});
