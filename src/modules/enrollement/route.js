const express = require("express");
const authenticateUser = require("../../middlewares/authenticateUser");
const enroll = require("./controller");
const enrollment = express.Router();

enrollment.post("/:courseId", authenticateUser, enroll);

module.exports = enrollment;
