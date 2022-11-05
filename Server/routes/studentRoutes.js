const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/studentControllers");

router.post("/signup", signup);

router.post("/login", login);

router.get('/login', (req, res) => {
    res.status(200).send('Login here')
})

module.exports = router;
