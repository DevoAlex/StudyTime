const express = require("express");
const router = express.Router();
const cors = require('cors')
const {
  signup,
  login,
  getSingleStudent,
} = require("../controllers/studentControllers");

router.options('/signup', cors())
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
