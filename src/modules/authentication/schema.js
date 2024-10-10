const Joi = require("joi");

const signupSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(256).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(256).required(),
});

module.exports = { signupSchema, loginSchema };
