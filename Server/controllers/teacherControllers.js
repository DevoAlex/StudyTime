const Teacher = require("../models/teacherModel");

const signup = async (req, res, next) => {
  console.log(req.file);
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
    profileImage: req.file.path,
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
    res.status(200).send(teacher);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { signup, login };
