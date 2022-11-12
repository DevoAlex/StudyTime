const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getSingleStudent,
} = require("../controllers/studentControllers");
const Student = require("../models/studentModel");

router.post("/signup", signup);

router.get("/signup", (req, res) => {
  res.status(200).send("Signup here");
});

router.post("/login", login);

router.get("/login", (req, res) => {
  res.status(200).send("Login here");
});

router.get("/api/:studentID", getSingleStudent);

module.exports = router;
