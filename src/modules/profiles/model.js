const { model, Schema, Types } = require("mongoose");

const profileSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "Users", required: true },
    profile_picture_url: { type: String, default: null },
    cover_picture_url: { type: String, default: null },
    course_enrollment: [
      {
        taken: [{ type: String, default: null }],
        in_progress: [{ type: String, default: null }],
      },
    ],
  },
  { timestamps: true }
);

const Profile = model("Profiles", profileSchema);

module.exports = Profile;
