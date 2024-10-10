const { model, Schema, Types } = require("mongoose");

const reviewSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "Users", required: true },
    content: { type: String, required: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Review = model("Reviews", reviewSchema);

module.exports = Review;
