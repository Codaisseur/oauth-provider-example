const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { debugStream, winstonStream } = require('./utils/logging');
const favicon = require('serve-favicon');
const static = require('serve-static');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const flash = require('express-flash');
const models = require('./models');

const config = require('config');

const port = config.get('port');
const secret = config.get('secret');

// Controllers
const landingPagesController = require('./controllers/landingPages');
const userController = require('./controllers/user');

const app = express()

app
  // Help secure Express apps with various HTTP headers.
  // See: https://helmetjs.github.io/
  .use(helmet())
  .use(helmet.noCache())
  .use(helmet.hsts({
    maxAge: 31536000,
    includeSubdomains: true
  }))

  // Set up logging
  .use(morgan('dev', debugStream))
  .use(morgan('combined', winstonStream))

  // Static files
  .use(favicon('./public/favicon.ico'))
  .use(static('./public'))

  // Enable CORS for all routes and origins
  .use(cors(config.get('cors')))

  // Set up cookie and body parsers
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

  // Set session support
  .use(session(({ secret: secret, resave: true, saveUninitialized: true })))

  // Flash messages support
  .use(flash())

  // Use pug for the views
  .set('view engine', 'pug')

  .use(landingPagesController)
  .use(userController)

  .listen(port);
