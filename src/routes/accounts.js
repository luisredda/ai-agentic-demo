const express = require("express");
const router = express.Router();
const { getDb } = require("../db");

// DEMO VULNERABILITY: SQL injection via string concatenation (VULN-001)
// Do not fix — required for Semgrep SAST demo finding demo-bank-sql-injection
router.get("/:id", (req, res) => {
  const db = getDb();
  const query = "SELECT * FROM accounts WHERE id = '" + req.params.id + "'";
  db.get(query, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Account not found" });
    res.json(row);
  });
});

router.get("/", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM accounts", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
