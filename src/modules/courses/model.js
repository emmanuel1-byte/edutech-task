const { model, Schema, Types } = require("mongoose");

const courseSchema = new Schema(
  {
    tutor: { type: Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    course_image_url: { type: String, required: true },
    language: { type: String, required: true },
    level: { type: String, required: true },
    skills_you_will_gain: [{ type: String, required: true }],
    syllabus: [
      {
        week: { type: String, required: true },
        title: { type: String, required: true },
        video_url: { type: String, required: true },
      },
    ],
    review: [{ type: Types.ObjectId, ref: "Reviews", default: null }],
  },
  { timestamps: true }
);

const Course = model("Courses", courseSchema);

module.exports = Course;
