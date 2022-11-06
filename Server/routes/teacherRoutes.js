const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/teacherControllers");
const Teacher = require("../models/teacherModel");
const multer = require("multer");

// * Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/images/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// * routes
router.post("/signup", upload.single("profileImage"), signup);

router.post("/login", login);

router.get("/login", (req, res) => {
  res.status(200).send("Login here");
});

module.exports = router;
