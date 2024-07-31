const Joi = require('joi');

class ErrorHandler {
  static errorHandler(err, request, h) {
    console.error(err);
    return h.response({
      statusCode: 500,
      error: 'Internal Server Error',
      message: err.message,
    }).code(500);
  }

  static Errorhandler(err, request, h) {
    if (err instanceof Joi.ValidationError) {
      return h.response({
        statusCode: 400,
        error: 'Bad Request',
        details: err.details[0].message,
      }).code(400);
    } else {
      console.error(err);
      return h.response({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Internal server error',
      }).code(500);
    }
  }
}

module.exports = ErrorHandler;
