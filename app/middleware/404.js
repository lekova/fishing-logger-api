'use strict';

const HttpError = require(require('path').resolve('lib', 'wiring', 'http-error'));

const notFound = (request, response, next) => {
  next(new HttpError(404));
};

module.exports = notFound;
