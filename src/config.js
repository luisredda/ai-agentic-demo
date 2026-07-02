// DEMO VULNERABILITY: hardcoded secrets for SAST demonstration (VULN-005)
// These are fake demo-only values. Do not use in production.
const JWT_SECRET = "demo-super-secret-jwt-key-not-for-production";
const API_KEY = "demo-api-key-12345-not-real";
const ACCESS_TOKEN = "demo-access-token-abcdef-not-real";

const config = {
  port: process.env.PORT || 3000,
  dbPath: process.env.DB_PATH || "./demobank.db",
  jwtSecret: JWT_SECRET,
  apiKey: API_KEY,
  accessToken: ACCESS_TOKEN,
  appName: "DemoBank AI SDLC",
  demoMode: true,
};

module.exports = config;
