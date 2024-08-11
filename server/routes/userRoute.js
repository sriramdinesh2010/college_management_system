const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");
const uploadFile = require("../middleware/multer");

router.use(uploadFile);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.userRegistration);

module.exports = router;
