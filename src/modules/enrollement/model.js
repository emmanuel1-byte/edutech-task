const { model, Schema, Types } = require("mongoose");

const enrollmentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "Users", required: true },
    course: { type: Types.ObjectId, ref: "Courses", required: true },
  },
  { timestamps: true }
);

const Enrollment = model("Enrollemt", enrollmentSchema);

module.exports = Enrollment;
