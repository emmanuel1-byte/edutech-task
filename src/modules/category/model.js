const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Category = model("Categories", categorySchema);

module.exports = Category;
