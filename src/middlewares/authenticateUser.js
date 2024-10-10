require("dotenv").config();
const { verify } = require("jsonwebtoken");
const { model } = require("mongoose");

async function authenticateUser(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res.status(400).json({ message: "Access token required!" });
  }

  try {
    const payload = verify(accessToken, process.env.JWT_SECRET);

    const user = await model("Users").findById(payload.sub);
    if (!user) {
      return res.status(401).json({
        message: "Account associated with this Access token does not exist",
      });
    }
    req.userId = user._id;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticateUser;
