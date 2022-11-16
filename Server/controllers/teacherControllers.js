const Teacher = require("../models/teacherModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const teacher = new Teacher({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    subjects: req.body.subjects,
    availableDays: req.body.availableDays,
    gender: req.body.gender,
    pricePerHour: req.body.pricePerHour,
    introduction: req.body.introduction,
    availableFor: req.body.availableFor,
    city: req.body.city
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

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ success: true, data: teachers });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
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

module.exports = { signup, login, getTeachers, getSingleTeacher };
