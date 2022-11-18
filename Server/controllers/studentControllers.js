const Student = require("../models/studentModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    res.status(201).json({ success: true, data: student });
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
    const key = process.env.PRIVATE_KEY;

    const token = jwt.sign(
      {
        studentId: student._id,
        studentEmail: student.email,
      },
      key,
      { expiresIn: "24h" }
    );
    res.status(200).send({
      message: "Login successful",
      email: student.email,
      token,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getSingleStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentID);
    if (!student) {
      return res.status(404).json("Error 404. User not found");
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.updateOne(
      { _id: req.params.studentID },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { upsert: true }
    );
    res.status(200).json({
      success: true,
      message: `Student with ID ${req.params.studentID} updated`,
      data: updatedStudent,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteStudent = async ( req, res) => {
  try {
    const deletedStudent = await Student.remove({_id: req.params.studentID});
    res.status(200).json({
      success: true,
      message: `Student with ID ${req.params.teacherID} removed`,
      data: deletedStudent
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { signup, login, getSingleStudent, updateStudent, deleteStudent };
