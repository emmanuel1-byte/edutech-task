const { model } = require("mongoose");
const Review = require("./model");

async function createReview(req, res, next) {
  const courseId = req.params.courseId;
  const { content, rating } = req.body;

  try {
    const course = await model("Courses").findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course does not exist" });
    }

    const review = await Review.create({ user: req.userId, content, rating });
    await model("Courses").findByIdAndUpdate(courseId, {
      $push: { review: review._id },
    });

    return res.status(201).json({ data: { review } });
  } catch (err) {
    next(err);
  }
}

module.exports = createReview;
