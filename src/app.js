const express = require("express");
const path = require("path");
const cors = require("cors");
const { getDb } = require("./db");
const csrfProtection = require("./csrf");

const app = express();

// DEMO VULNERABILITY: insecure CORS wildcard (VULN-007)
// Do not fix — required for Semgrep SAST demo finding demo-bank-insecure-cors
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(csrfProtection);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/accounts", require("./routes/accounts"));
app.use("/api/transfers", require("./routes/transfers"));
app.use("/api/statements", require("./routes/statements"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/fx", require("./routes/fx"));

// Dashboard
app.get("/", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM accounts", [], (err, accounts) => {
    db.all(
      "SELECT * FROM transactions ORDER BY created_at DESC LIMIT 5",
      [],
      (err2, transactions) => {
        res.render("dashboard", {
          accounts: accounts || [],
          transactions: transactions || [],
          appName: "DemoBank AI SDLC",
        });
      }
    );
  });
});

// Transfer page
app.get("/transfer", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM accounts", [], (err, accounts) => {
    res.render("transfer", {
      accounts: accounts || [],
      appName: "DemoBank AI SDLC",
      error: null,
      success: null,
      csrfToken: req.csrfToken(),
    });
  });
});

// Bill payment page
app.get("/pay-bill", (req, res) => {
  res.render("pay-bill", { appName: "DemoBank AI SDLC" });
});

// Login page
app.get("/login", (req, res) => {
  res.render("login", {
    appName: "DemoBank AI SDLC",
    error: null,
    csrfToken: req.csrfToken(),
  });
});

app.post("/login", (req, res) => {
  // Demo: accept any credentials
  res.redirect("/");
});

app.get("/welcome", (req, res) => {
  const name = req.query.name || "Guest";
  res.render("welcome", { appName: "DemoBank AI SDLC", name });
});

// Health endpoint — correct path for liveness/readiness
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;
