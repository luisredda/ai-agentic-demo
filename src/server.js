const { initDb } = require("./db");
const config = require("./config");

initDb()
  .then(() => {
    const app = require("./app");
    app.listen(config.port, () => {
      console.log(`DemoBank AI SDLC running on http://localhost:${config.port}`);
      console.log("WARNING: This app is intentionally vulnerable. DEMO USE ONLY.");
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
