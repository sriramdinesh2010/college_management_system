const mongoose = require("mongoose");

const subjectschema = new mongoose.Schema(
  {
    program: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    coursename: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    part: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    subjectcode: {
      type: String,
      required: true,
      unique: true,
    },
    subjectname: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    courseincharge: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subject", subjectschema);
