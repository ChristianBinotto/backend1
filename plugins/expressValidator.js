const {
    Validator,
    ValidationError,
  } = require("express-json-validator-middleware");
  
  const joi = require('joi')
  
  const { validate } = new Validator();

  function validationErrorMiddleware(error, request, response, next) {
    if (error instanceof ValidationError) {
      // Handle the error
      response.status(400).send(error.validationErrors);
      next();
    } else {
      // Pass error on if not a validation error
      next(error);
    }
  }
  
  module.exports = {
    validator: validate,
    validationErrorMiddleware,
    joi
  }
  