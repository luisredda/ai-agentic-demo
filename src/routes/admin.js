const express = require("express");
const router = express.Router();

const HOST_PATTERN = /^[a-zA-Z0-9.-]{1,253}$/;

router.get("/ping", (req, res) => {
  const host = req.query.host || "localhost";

  if (!HOST_PATTERN.test(host)) {
    return res.status(400).json({ error: "Invalid host" });
  }

  res.json({ result: `Pinging: ${host}`, host });
});

router.get("/status", (req, res) => {
  res.json({
    status: "admin panel active",
    warning: "DEMO ONLY — not a real admin panel",
  });
});

module.exports = router;
