const mongoose = require("mongoose");

const noteschema = new mongoose.Schema(
  {
    noteId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    viewfor: {
      type: String,
      required: true,
    },
    publishdate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notes", noteschema);
