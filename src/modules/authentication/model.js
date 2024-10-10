const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.isModified("password")) {
      next();
    }
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

const User = model("Users", userSchema);

module.exports = User;
