const express = require("express");
const router = express.Router();
const dashHomeController = require("../controllers/dashHomeController");

const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);

router.route("/").get(dashHomeController.getAllData);

module.exports = router;
