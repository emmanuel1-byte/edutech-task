const express = require("express");
const authenticateUser = require("../../middlewares/authenticateUser");
const myProfile = require("./controller");
const profile = express.Router();

profile.get("/me", authenticateUser, myProfile);

module.exports = profile;
