const Joi = require('joi');

class Validation {
  static registerValidation = Joi.object({
    user_name: Joi.string().required(),
    email_id: Joi.string().email().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().min(1).max(10).required(),
    role: Joi.string().valid('admin').optional(),
  });

  static loginValidation = Joi.object({
    email_id: Joi.string().email().required(),
    password: Joi.string().min(1).max(10).required(),
  });

  static forgetPasswordValidation = Joi.object({
    email_id: Joi.string().email().required(),
  });

  static resetPasswordValidation = Joi.object({
    password: Joi.string().min(1).max(10).required(),
  });

  static updateProfileValidation = Joi.object({
    email_id: Joi.string().email().required(),
  });
}

module.exports = Validation;

