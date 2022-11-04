const Student = require("../models/studentModel");

const signup = async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    res.status(201).send({ success: true, data: student });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  try {
    const student = await Student.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(200).send(student);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { signup, login };
