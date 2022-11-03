const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const studentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please include a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please include a last name"],
  },
  email: {
    type: String,
    required: [true, "Please include an email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
