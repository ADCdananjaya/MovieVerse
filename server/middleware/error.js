const logger = require("../utils/logger");

process.on("uncaughtException", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send("Something went wrong!");
};
