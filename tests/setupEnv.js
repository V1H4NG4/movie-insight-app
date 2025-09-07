// Ensure NODE_ENV and load test env
process.env.NODE_ENV = "test";
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const testEnv = path.join(process.cwd(), ".env.test");
if (fs.existsSync(testEnv)) {
  dotenv.config({ path: testEnv });
} else {
  // fallback to .env.local for now
  const localEnv = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(localEnv)) {
    dotenv.config({ path: localEnv });
  }
}
