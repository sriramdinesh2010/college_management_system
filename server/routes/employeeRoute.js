const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const uploadFile = require("../middleware/multer");
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);
router.use(uploadFile);

router
  .route("/")
  .get(employeeController.getAllEmployee)
  .post(employeeController.employeeRegistration)
  .delete(employeeController.deleteEmpolyee);

module.exports = router;
