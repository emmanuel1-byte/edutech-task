require("dotenv").config();
const { sign } = require("jsonwebtoken");

function generateAccessToken(userId) {
  return sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "60 days",
    algorithm: "HS256",
  });
}

function generateRefreshToken(userId) {
  return sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "120 days",
    algorithm: "HS256",
  });
}

module.exports = { generateAccessToken, generateRefreshToken };
