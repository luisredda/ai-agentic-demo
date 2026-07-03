const express = require("express");
const router = express.Router();
const { getDb } = require("../db");
const csrfProtection = require("../csrf");

// DEMO VULNERABILITY: weak validation — allows zero/negative amounts and arbitrary memo/account IDs (VULN-002 partial)
// Do not fix — this is the UX bug users complain about in Slack
router.post("/", csrfProtection, (req, res) => {
  const { fromAccount, toAccount, amount, memo } = req.body;

  // Intentionally weak validation: no check for negative/zero amounts
  if (!fromAccount || !toAccount || amount === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = getDb();
  db.run(
    "INSERT INTO transactions (from_account, to_account, amount, memo, status) VALUES (?, ?, ?, ?, ?)",
    [fromAccount, toAccount, amount, memo || "", "completed"],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        success: true,
        message: "Transfer completed successfully",
        transferId: this.lastID,
        amount: amount,
      });
    }
  );
});

router.get("/", (req, res) => {
  const db = getDb();
  db.all(
    "SELECT * FROM transactions ORDER BY created_at DESC LIMIT 20",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;
