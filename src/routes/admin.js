const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

// DEMO VULNERABILITY: command injection via user-controlled host parameter (VULN-002)
// Do not fix — required for Semgrep SAST demo finding demo-bank-command-injection
router.get("/ping", (req, res) => {
  const host = req.query.host || "localhost";

  // Intentionally unsafe: user-controlled input passed directly to exec
  const cmd = "echo 'Pinging: " + host + "'";
  exec(cmd, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: "Ping failed" });
    res.json({ result: stdout.trim(), host });
  });
});

router.get("/status", (req, res) => {
  res.json({
    status: "admin panel active",
    warning: "DEMO ONLY — not a real admin panel",
  });
});

module.exports = router;
