const { model } = require("mongoose");

async function createdDefaultProfile(userId, profilePicture = null) {
  try {
    const user = await model("Users").findById(userId);
    if (!user) {
      throw new Error("Account does not exist");
    }

    const newProfile = await model("Profiles").create({
      user: userId,
      profile_picture_url: profilePicture,
    });
    return newProfile;
  } catch (err) {
    throw new Error("Error creating default profile");
  }
}

module.exports = createdDefaultProfile;
