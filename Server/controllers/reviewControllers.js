const Review = require("../models/reviewModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

const postReview = async (req, res) => {
    try {
      const studentFound = await Student.findById(req.body.student);
      const teacherFound = await Teacher.findById(req.body.teacher);
      if (!studentFound) {
        return res.status(400).json({ message: "Student not found" });
      } else if (!teacherFound) {
        return res.status(400).json({ message: "Teacher not found" });
      } else {
        const review = new Review({
          student: req.body.student,
          teacher: req.body.teacher,
          rating: req.body.rating,
          content: req.body.content,
        });
        const savedReview = await review.save();
        res.status(201).json({ data: savedReview });
      }
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  const getReview = async (req, res) => {
    try {
      const filteredReviews = await Review.find({ teacher: req.params.teacherID })
        .populate("teacher")
        .populate("student");
      if (filteredReviews.length === 0) {
        return res
          .status(404)
          .json({
            error: `No reviews for this teacher yet.`,
          });
      }
      res.status(200).json({ data: filteredReviews });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  const deleteReview = async (req, res) => {
    try {
      const removedReview = await Review.deleteOne({ _id: req.params.reviewID });
      res
        .status(200)
        .json({
          message: `Review with ID ${req.params.reviewID} deleted`,
          data: removedReview,
        });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  module.exports = {
    postReview,
    getReview,
    deleteReview
  }