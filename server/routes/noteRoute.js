const express = require("express");
const router = express.Router();
const newnoteController = require("../controllers/newnoteController");

router
  .route("/")
  .get(newnoteController.getAllNotes)
  .post(newnoteController.createNewNotes)
  .delete(newnoteController.deleteNote);

module.exports = router;
