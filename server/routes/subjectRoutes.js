const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);

router
  .route("/")
  .get(subjectController.getAllSubject)
  .post(subjectController.CreateSubject)
  .delete(subjectController.deleteSubject);

router.route("/singlestudent").post(subjectController.getSingleSubject);

module.exports = router;
