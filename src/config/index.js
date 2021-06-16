const dotenv = require("dotenv");
const foundEnv = dotenv.config();

!foundEnv && new Error("The .env file could not be found.");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: process.env.PORT,
  api: {
    prefix: "/api/v1", //prefix route of every endpoint
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  swagger: {
    path: "/docs", //documentation route
  },
  databaseURL: process.env.DATABASE_URL,
};