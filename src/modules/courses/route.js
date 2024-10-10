const express = require("express");
const authenticateUser = require("../../middlewares/authenticateUser");
const {
  getCourse,
  listNewCourses,
  listPopularCourses,
} = require("./controller");
const course = express.Router();

course.get("/new-courses", listNewCourses);

course.get("/popular-courses", listPopularCourses);

course.get("/:id", authenticateUser, getCourse);

module.exports = course;
