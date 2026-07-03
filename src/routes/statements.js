const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const STATEMENTS_DIR = path.join(__dirname, "../../demo-statements");
const STATEMENTS = [
  { name: "statement-jan-2024.pdf", date: "2024-01-31" },
  { name: "statement-feb-2024.pdf", date: "2024-02-29" },
  { name: "statement-mar-2024.pdf", date: "2024-03-31" },
];
const STATEMENTS_BY_NAME = new Map(
  STATEMENTS.map((statement) => [statement.name, statement])
);

router.get("/", (req, res) => {
  const file = req.query.file;

  if (!file) {
    return res.json({ statements: STATEMENTS });
  }

  const statement = STATEMENTS_BY_NAME.get(file);
  if (!statement) {
    return res.status(404).json({ error: "Statement file not found" });
  }

  const filePath = path.join(STATEMENTS_DIR, statement.name);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Statement file not found" });
  }

  res.download(filePath);
});

module.exports = router;
