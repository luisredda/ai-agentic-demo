const express = require("express");
const router = express.Router();
const axios = require("axios");

const DEMO_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.36,
};

// DEMO VULNERABILITY: SSRF via user-controlled URL (VULN-004)
// Do not fix — required for Semgrep SAST demo finding demo-bank-ssrf
router.get("/", async (req, res) => {
  if (req.query.url) {
    // Intentionally passes user-controlled URL directly to axios
    try {
      const response = await axios.get(req.query.url);
      return res.json({ source: "external", data: response.data });
    } catch (err) {
      return res.status(502).json({ error: "Failed to fetch external rate" });
    }
  }

  res.json({
    source: "demo",
    base: "USD",
    rates: DEMO_RATES,
    updated: "2024-01-15T12:00:00Z",
    disclaimer: "DEMO ONLY — not real exchange rates",
  });
});

module.exports = router;
