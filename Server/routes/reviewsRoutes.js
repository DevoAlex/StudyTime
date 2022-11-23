const express = require("express");
const router = express.Router();
const cors = require('cors')
const {
    postReview,
    getReview,
    deleteReview
} = require('../controllers/reviewControllers')

router.options('/api', cors())
router.post("/api", postReview);

router.get("/api/:teacherID", getReview);

router.delete("/:reviewID", deleteReview);

module.exports = router;
