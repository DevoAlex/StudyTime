const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getSingleTeacher,
  getTeachers,
} = require("../controllers/teacherControllers");

// * routes
router.post("/signup", signup);

router.get("/signup", (req, res) => {
  res.status(200).send("Signup here");
});

router.post("/login", login);

router.get("/login", (req, res) => {
  res.status(200).send("Login here");
});

router.get("/api/teachers", getTeachers);

router.get("/api/teachers/:teacherID", getSingleTeacher);

module.exports = router;
