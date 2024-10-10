const Joi = require("joi");

const reviewSchema = Joi.object({
  content: Joi.string().required(),
  rating: Joi.number().default(0),
});

module.exports = reviewSchema;
