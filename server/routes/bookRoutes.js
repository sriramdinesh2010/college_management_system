const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const uploadFile = require("../middleware/multer");
// const verifyJWT = require("../middleware/verifyJWT");
// router.use(verifyJWT);
router.use(uploadFile);
router
  .route("/")
  .get(bookController.getAllBook)
  .post(bookController.bookRegistration)
  .delete(bookController.deleteBook);

router.route("/singlebook/:accessnumber").get(bookController.getSingleBook);

module.exports = router;
