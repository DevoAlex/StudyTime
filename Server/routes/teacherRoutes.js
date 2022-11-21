const express = require("express");
const router = express.Router();
const cors = require('cors')
const {
  signup,
  login,
  getSingleTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher
} = require("../controllers/teacherControllers");

// * routes
router.options('/signup', cors())
router.post("/signup", signup);

router.get("/signup", (req, res) => {
  res.status(200).send("Teacher signup here");
});

router.post("/login", login);

router.get("/login", (req, res) => {
  res.status(200).send("Teacher login here");
});

router.options('/:studentID', cors())
router.patch('/:teacherID', updateTeacher);

router.delete('/:teacherID', deleteTeacher)

router.get("/api", getTeachers);

router.get("/api/:teacherID", getSingleTeacher);

module.exports = router;
