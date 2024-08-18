const express = require("express");
const router = express.Router();
const newnoteController = require("../controllers/newnoteController");
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);
router
  .route("/")
  .get(newnoteController.getAllNotes)
  .post(newnoteController.createNewNotes)
  .delete(newnoteController.deleteNote);

module.exports = router;
