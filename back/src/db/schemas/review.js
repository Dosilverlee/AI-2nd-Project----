const { Schema, model } = require("mongoose");

const Review = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

const ReviewModel = model("review", Review);
export { ReviewModel };