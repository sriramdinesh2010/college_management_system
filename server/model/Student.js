const mongoose = require("mongoose");

const studentschema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    registernumber: {
      type: Number,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    fathername: {
      type: String,
      required: true,
    },
    mothername: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    currentsemester: {
      type: String,
      required: true,
    },
    joiningdate: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentschema);
