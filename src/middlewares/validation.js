function validateRequestSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details[0].message });
    }
    next();
  };
}

module.exports = validateRequestSchema;
