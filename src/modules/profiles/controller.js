const Profile = require("./model");

async function myProfile(req, res, next) {
  try {
    const profile = await Profile.findOne({ user: req.userId }).populate(
      "user",
      "fullname"
    );
    res.status(200).json({ data: { profile } });
  } catch (err) {
    next(err);
  }
}

module.exports = myProfile;
