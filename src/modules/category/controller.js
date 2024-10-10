const Category = require("./model");

async function listCategory(req, res, next) {
  try {
    const categories = await Category.find({});
    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
}

module.exports = listCategory;
