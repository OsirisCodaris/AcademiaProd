/* eslint-disable no-unused-vars */
const appRoot = require('app-root-path')
const winston = require('winston')

// define the custom settings for each transport (file, console)
const options = {
  info: {
    level: 'info',
    filename: `../logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  error: {
    level: 'error',
    filename: `../logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  warning: {
    level: 'warn',
    filename: `../logs/warn.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
}

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.info),
    new winston.transports.File(options.error),
    new winston.transports.File(options.warning),

    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
})

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message)
  },
}

module.exports = logger
