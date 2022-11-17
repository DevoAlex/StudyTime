const express = require("express");
const router = express.Router();
const cors = require('cors')
const {
  signup,
  login,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentControllers");

router.options('/signup', cors())
router.post("/signup", signup);

router.get("/signup", (req, res) => {
  res.status(200).send("Student signup here");
});

router.post("/login", login);

router.get("/login", (req, res) => {
  res.status(200).send("Student login here");
});

router.patch('/:studentID', updateStudent);

router.delete('/:studentID', deleteStudent);

router.get("/api/:studentID", getSingleStudent);

module.exports = router;
