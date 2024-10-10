const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../helpers/token");
const User = require("./model");
const createdDefaultProfile = require("../../helpers/defaultProfile");

async function signup(req, res, next) {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Account already exist" });
    }

    const newUser = await User.create({ fullname, email, password });
    await createdDefaultProfile(newUser._id);

    return res.status(201).json({ message: "Account created" });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account does not exist" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return res.status(200).json({
      message: "Login succesfull",
      data: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
}

async function google(req, res, next) {
  try {
    const { accessToken, refreshToken } = req.user;
    res.status(200).json({
      message: "Login succesfull",
      data: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login, google };
