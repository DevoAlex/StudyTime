const express = require("express");
const { default: helmet } = require("helmet");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//Import routes
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next()
})

//Logger
app.use(morgan("dev"));

//Sanitize filter
mongoose.set("sanitizeFilter", true);

//Basic routes
app.get("/", (req, res) => {
  res.status(200).send("Homepage");
});

app.get("*", (req, res) => {
  res.status(404).json({ success: false, message: "404 not found" });
});

module.exports = app;
