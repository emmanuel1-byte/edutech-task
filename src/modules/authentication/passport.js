require("dotenv").config();
const { model } = require("mongoose");
const passport = require("passport");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../helpers/token");
const createdDefaultProfile = require("../../helpers/defaultProfile");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
  process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const existingUser = await model("Users").findOne({
          email: profile.emails[0].value,
        });
        if (existingUser) {
          const accessToken = generateAccessToken(existingUser._id);
          const refreshToken = generateRefreshToken(existingUser._id);
          return cb(null, { accessToken, refreshToken });
        }

        const newUser = await model("Users").create({
          fullname: profile.displayName,
          email: profile.emails[0].value,
        });
        await createdDefaultProfile(newUser._id, profile.photos[0].value);

        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        cb(null, { accessToken, refreshToken });
      } catch (err) {
        console.error(err);
        cb(err, null);
      }
    }
  )
);

module.exports = passport;
