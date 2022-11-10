const Teacher = require("../models/teacherModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const teacher = new Teacher({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    subjects: req.body.subjects,
    daysOfAvailability: req.body.daysOfAvailability,
    pricePerHour: req.body.pricePerHour,
    introduction: req.body.introduction,
    availableForHomeworksHelp: req.body.availableForHomeworksHelp,
    availableForExamPreparation: req.body.availableForExamPreparation,
    availableForStudyHelp: req.body.availableForStudyHelp,
    gender: req.body.gender,
  });
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

    const key = process.env.PRIVATE_KEY;

    const token = jwt.sign(
      {
        teacherId: teacher._id,
        teacherEmail: teacher.email,
      },
      key,
      { expiresIn: "24h" }
    );
    res.status(200).send({
      message: "Login successful",
      email: teacher.email,
      token,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getSingleTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherID);
    if (!teacher) {
      return res.status(404).json("Error 404. User not found");
    }
    res.status(200).json({ success: true, data: teacher });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

module.exports = { signup, login, getSingleTeacher };
