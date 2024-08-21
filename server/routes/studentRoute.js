const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const uploadFile = require("../middleware/multer");
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);
router.use(uploadFile);
router
  .route("/")
  .get(studentController.getAllStudents)
  .post(studentController.studentRegistration)
  .delete(studentController.deleteStudent);

router.route("/singlestudent").post(studentController.getSingleStudent);

module.exports = router;
