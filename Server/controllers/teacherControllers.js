const Teacher = require("../models/teacherModel");

const signup = async (req, res) => {
  const teacher = new Teacher(req.body);
  try {
    await teacher.save();
    res.status(201).send({ success: true, data: teacher });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  try {
    const teacher = await Teacher.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(200).send(student);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { signup, login };
