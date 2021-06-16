const Server = require("./server/Server");
const mongooseLoader = require("./mongoose");
const config = require("../config");
const logger = require("./logger");

module.exports = async () => {
  //initialize db connection
  await mongooseLoader();
  logger.info("Connection to database established");

  //instantiate express server
  const server = new Server();
  logger.info("Server loaded successfully");

  //initialize server
  server.start();
  logger.info(`Server listening on port ${config.port}`);
};