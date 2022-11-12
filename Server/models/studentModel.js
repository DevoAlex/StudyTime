const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      //required: [true, "Please include a first name"],
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Name must contain only letters");
        }
      },
    },
    lastName: {
      type: String,
      //required: [true, "Please include a last name"],
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Name must contain only letters");
        }
      },
    },
    email: {
      type: String,
      //required: [true, "Please include an email"],
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please insert a valid email");
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password must be minimum 8 charachters and must contain one uppercase letter, one number and one symbol"
          );
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

studentSchema.methods.removeSensitiveFields = async function () {
  const student = this;
  const studentObject = student.toObject();
  delete studentObject.password;

  return studentObject;
};

studentSchema.statics.findByCredentials = async (email, password) => {
  const student = await Student.findOne({ email });
  if (!student.email) {
    throw new Error("Incorrect email or password");
  }
  const isValid = await bcrypt.compare(password, student.password);
  if (!isValid) {
    throw new Error("Incorrect email or password");
  }
  return student.removeSensitiveFields();
};

module.exports = Student = mongoose.model("Student", studentSchema);
