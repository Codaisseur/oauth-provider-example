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
module.exports.winstonStream = winstonStream;

// Configure the debug module
process.env.DEBUG = config.debug
const debug = Debug('app:oauth:response')

/**
 * Debug stream for the morgan plugin
 */
const debugStream = stream(write(debug))
module.exports.debugStream = debugStream;

/**
 * Exports a wrapper for all the loggers we use in this configuration
 */
const format = (scope, message) => `[${scope}] ${message}`

const parse = (args) => (typeof(args) === 'array' && args.length > 1) ? args.slice(1) : ''

module.exports.Logger = (scope) => {
  const fullScope = `app:oauth:${scope || config.context || 'general'}`
  const scopeDebug = Debug(fullScope)
  return {
    debug: (message) => {
      if (isProduction) {
        logger.debug(format(fullScope, message), parse(arguments))
      }
      scopeDebug(message, parse(arguments))
    },
    verbose: (message) => logger.verbose(format(fullScope, message), parse(arguments)),
    silly: (message) => logger.silly(format(fullScope, message), parse(arguments)),
    info: (message) => logger.info(format(fullScope, message), parse(arguments)),
    warn: (message) => logger.warn(format(fullScope, message), parse(arguments)),
    error: (message) => logger.error(format(fullScope, message), parse(arguments))
  }
}
