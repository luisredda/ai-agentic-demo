const sqlite3 = require("sqlite3").verbose();
const config = require("./config");

let db;

function getDb() {
  if (!db) {
    db = new sqlite3.Database(config.dbPath, (err) => {
      if (err) console.error("DB connection error:", err.message);
    });
  }
  return db;
}

function initDb() {
  return new Promise((resolve, reject) => {
    const database = getDb();
    database.serialize(() => {
      database.run(`
        CREATE TABLE IF NOT EXISTS accounts (
          id TEXT PRIMARY KEY,
          owner TEXT NOT NULL,
          balance REAL NOT NULL DEFAULT 0,
          type TEXT NOT NULL DEFAULT 'checking'
        )
      `);
      database.run(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          from_account TEXT,
          to_account TEXT,
          amount REAL NOT NULL,
          memo TEXT,
          status TEXT DEFAULT 'completed',
          created_at TEXT DEFAULT (datetime('now'))
        )
      `, (err) => {
        if (err) reject(err);
        else resolve(database);
      });
    });
  });
}

module.exports = { getDb, initDb };
