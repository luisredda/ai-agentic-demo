const express = require("express");
const router = express.Router();

const STATEMENTS = [
  { name: "statement-jan-2024.pdf", date: "2024-01-31" },
  { name: "statement-feb-2024.pdf", date: "2024-02-29" },
  { name: "statement-mar-2024.pdf", date: "2024-03-31" },
];

function handleMissingStatement(res) {
  return (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ error: "Statement file not found" });
    }
  };
}

router.get("/", (req, res) => {
  const file = req.query.file;

  if (!file) {
    return res.json({ statements: STATEMENTS });
  }

  if (file === "statement-jan-2024.pdf") {
    return res.download(
      "demo-statements/statement-jan-2024.pdf",
      "statement-jan-2024.pdf",
      handleMissingStatement(res)
    );
  }

  if (file === "statement-feb-2024.pdf") {
    return res.download(
      "demo-statements/statement-feb-2024.pdf",
      "statement-feb-2024.pdf",
      handleMissingStatement(res)
    );
  }

  if (file === "statement-mar-2024.pdf") {
    return res.download(
      "demo-statements/statement-mar-2024.pdf",
      "statement-mar-2024.pdf",
      handleMissingStatement(res)
    );
  }

  return res.status(404).json({ error: "Statement file not found" });
});

module.exports = router;
