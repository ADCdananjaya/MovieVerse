const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "error",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.File({ filename: "logfile.log" })],
});

module.exports = logger;
