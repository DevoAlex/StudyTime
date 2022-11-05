const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/studentControllers");
const multer = require("multer");
const upload = multer({ dest: "../../client/images/uploads" });

router.post("/signup", upload.single(""), signup);

router.post("/login", login);

router.get("/login", (req, res) => {
  res.status(200).send("Login here");
});

module.exports = router;
