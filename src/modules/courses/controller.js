const Course = require("./model");

async function listNewCourses(req, res, next) {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .populate("tutor", "fullname")
      .populate("review", "rating");

    res.status(200).json({
      data: {
        courses: courses.map((course) => {
          return {
            thumbnail: course.course_image_url,
            name: course.name,
            tutor: course.tutor.fullname,
            price: course.price,
            rating: course.review
              .map((rate) => rate.rating)
              .reduce((index, value) => index + value, 0),
          };
        }),
      },
    });
  } catch (err) {
    next(err);
  }
}

async function listPopularCourses(req, res, next) {
  try {
    const courses = await Course.find({})
      .populate("tutor", "fullname")
      .populate("review", "rating");

    res.status(200).json({
      data: {
        courses: courses.map((course) => {
          return {
            thumbnail: course.course_image_url,
            name: course.name,
            tutor: course.tutor.fullname,
            price: course.price,
            rating: course.review
              .map((rate) => rate.rating)
              .reduce((index, value) => index + value, 0),
          };
        }),
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getCourse(req, res, next) {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId)
      .populate("tutor", "fullname")
      .populate("review", "content rating");

    if (!course) {
      return res.status(404).json({ message: "Course does not exist" });
    }
    return res.status(200).json({ data: { course } });
  } catch (err) {
    next(err);
  }
}

module.exports = { listNewCourses, listPopularCourses, getCourse };
