const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const studentRoutes = require("./routes/studentRoutes");

require("dotenv").config();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

mongoose.set("sanitizeFilter", true);

app.use("/api/users", studentRoutes);

module.exports = app;
