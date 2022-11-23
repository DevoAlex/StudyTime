const mongoose = require("mongoose");
const validator = require("validator");

const reviewSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    rating: {
      type: String,
      validate(value) {
        if (!validator.isNumber(value)) {
          throw new Error("Rating must contain only number");
        }
      },
    },
    content: {
      type: String,
      default: ''
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Review = mongoose.model("Review", reviewSchema);