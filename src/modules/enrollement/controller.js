const { model } = require("mongoose");
const Enrollment = require("./model");

async function enroll(req, res, next) {
  const courseId = req.params.courseId;

  try {
    const course = await model("Courses").findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course does not exist" });
    }

    const enrollment = await Enrollment.create({
      user: req.userId,
      course: courseId,
    });

    await model("Profiles").findOneAndUpdate(
      { user: req.userId },
      { $push: { "course_enrollment.0.in_progress": enrollment._id } },
      { upsert: true, new: true }
    );
    return res.status(201).json({ data: { enrollment } });
  } catch (err) {
    next(err);
  }
}

module.exports = enroll;
