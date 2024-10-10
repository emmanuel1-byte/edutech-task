const express = require("express");
const listCategory = require("./controller");
const category = express.Router();

category.get("/", listCategory);

module.exports = category;
