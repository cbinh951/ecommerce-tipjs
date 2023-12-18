require('dotenv').config();
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();

// init middlewares

// dung de log cac request
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();
// init routes

// handle error

app.get('/', (req, res, next) => {
  const strCompress = 'Hello Binh Pham';
  return res.status(200).json({
    message: 'Welcome to our API',
    metadata: strCompress.repeat(100000),
  });
});
module.exports = app;
