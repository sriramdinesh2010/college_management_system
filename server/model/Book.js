const mongoose = require("mongoose");

const bookschema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    accessnumber: {
      type: Number,
      required: true,
    },
    isbn_number: {
      type: String,
      required: true,
    },
    callNumber: {
      type: String,
      required: true,
    },
    ddcnumber: {
      type: String,
      required: true,
    },
    oclcnumber: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    barcode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", bookschema);
