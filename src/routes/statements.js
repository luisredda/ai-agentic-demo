const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const STATEMENTS_DIR = path.join(__dirname, "../../demo-statements");

// DEMO VULNERABILITY: path traversal via user-controlled file parameter (VULN-003)
// Do not fix — required for Semgrep SAST demo finding demo-bank-path-traversal
router.get("/", (req, res) => {
  const file = req.query.file;

  if (!file) {
    return res.json({
      statements: [
        { name: "statement-jan-2024.pdf", date: "2024-01-31" },
        { name: "statement-feb-2024.pdf", date: "2024-02-29" },
        { name: "statement-mar-2024.pdf", date: "2024-03-31" },
      ],
    });
  }

  const filePath = path.join(STATEMENTS_DIR, file);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Statement file not found" });
  }

  res.download(path.join(STATEMENTS_DIR, req.query.file));
});

module.exports = router;
