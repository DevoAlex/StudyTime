const express = require("express");
const router = express.Router();
const {
    postReview,
    getReview,
    deleteReview
} = require('../controllers/reviewControllers')

router.post("/api", postReview);

router.get("/api/:teacherID", getReview);

router.delete("/:reviewID", deleteReview);
