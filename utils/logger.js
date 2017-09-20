const winston = require('winston');
const Debug = require('debug');
const loggingEnv = process.env.NODE_ENV || 'development';
const isProduction = loggingEnv === 'production';
const config = require('config');

const logger = new winston.Logger({
  transports: [
    new (winston.transports.File)({
      filename: `log/${loggingEnv}.log`
    }),
    new (winston.transports.Console)(Object.assign({
      timestamp: isProduction,
      handleExceptions: isProduction,
      json: isProduction,
      colorize: !isProduction,
    }, config.get('logger.console')))
  ],
  exitOnError: false
});

const stream = (streamFunction) => ({
  'stream': streamFunction
})

const write = (writeFunction) => ({
  write: (message) => writeFunction(message)
})

/**
 * Winston logger stream for the morgan plugin
 */
const winstonStream = stream(write(logger.info))

// Configure the debug module
process.env.DEBUG = config.debug
const debug = Debug('app:oauth:response')

/**
 * Debug stream for the morgan plugin
 */
const debugStream = stream(write(debug))

/**
 * Exports a wrapper for all the loggers we use in this configuration
 */
const format = (scope, message) => `[${scope}] ${message}`

const parse = (args) => (args.length > 0) ? args : ''

const Logger = (scope) => {
  const fullScope = `app:oauth:${scope || config.context || 'general'}`
  const scopeDebug = Debug(fullScope)
  return {
    debug: (message, args) => {
      if (isProduction) {
        logger.debug(format(fullScope, message), parse(args))
      }
      scopeDebug(message, parse(args))
    },
    verbose: (message, args) => logger.verbose(format(fullScope, message), parse(args)),
    silly: (message, args) => logger.silly(format(fullScope, message), parse(args)),
    info: (message, args) => logger.info(format(fullScope, message), parse(args)),
    warn: (message, args) => logger.warn(format(fullScope, message), parse(args)),
    error: (message, args) => logger.error(format(fullScope, message), parse(args))
  }
}

module.exports = Logger;
