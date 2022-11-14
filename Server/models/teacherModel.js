const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Name must contain only letters");
        }
      },
    },
    lastName: {
      type: String,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Name must contain only letters");
        }
      },
    },
    email: {
      type: String,
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
    subjects: {
      type: String,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Subjects must contain only letters");
        }
      },
    },
    daysOfAvailability: {
      type: String,
      default: "",
    },
    pricePerHour: {
      type: String,
      default: '0',
      validate(value) {
        if (!validator.isNumeric(value)) {
          throw new Error("Price must contain only numbers");
        }
      },
    },
    introduction: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "not set",
      validate(value) {
        if (!validator.isIn(value, ["male", "female", "not set"])) {
          throw new Error("Gender must be 'male', 'female' or 'not set'");
        }
      },
    },
    city: {
      type: String,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("City field must contain only letters");
        }
      },
    },
    availableForHomeworksHelp: {
      type: String,
      validate(value) {
        if (!validator.isBoolean(value)) {
          throw new Error("Availability must have value true or false");
        }
      },
    },
    availableForExamPreparation: {
      type: String,
      validate(value) {
        if (!validator.isBoolean(value)) {
          throw new Error("Availability must have value true or false");
        }
      },
    },
    availableForStudyHelp: {
      type: String,
      validate(value) {
        if (!validator.isBoolean(value)) {
          throw new Error("Availability must have value true or false");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

teacherSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

teacherSchema.methods.removeSensitiveFields = async function () {
  const teacher = this;
  const teacherObject = teacher.toObject();
  delete teacherObject.password;

  return teacherObject;
};

teacherSchema.statics.findByCredentials = async (email, password) => {
  const teacher = await Teacher.findOne({ email });
  if (!teacher.email) {
    throw new Error("Incorrect email or password");
  }
  const isValid = await bcrypt.compare(password, teacher.password);
  if (!isValid) {
    throw new Error("Incorrect email or password");
  }
  return teacher.removeSensitiveFields();
};

module.exports = Teacher = mongoose.model("Teacher", teacherSchema);
