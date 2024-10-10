const validateRequestSchema = require("../../middlewares/validation");
const passport = require("./passport");
const express = require("express");
const { signupSchema, loginSchema } = require("./schema");
const { signup, login, google } = require("./controller");
const auth = express.Router();

auth.post("/signup", validateRequestSchema(signupSchema), signup);

auth.post("/login", validateRequestSchema(loginSchema), login);

auth.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

auth.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  }),
  google
);

module.exports = auth;
