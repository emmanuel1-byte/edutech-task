const express = require("express");
const authenticateUser = require("../../middlewares/authenticateUser");
const createReview = require("./controller");
const review = express.Router();

review.post("/:courseId", authenticateUser, createReview);

module.exports = review;
