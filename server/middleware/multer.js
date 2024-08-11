const multer = require("multer");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/image");
  },
  filename(req, file, cb, next) {
    const id = uuid();
    const extension = file.originalname.split(".").pop();
    const filename = `${id}.${extension}`;
    cb(null, filename);
  },
});

module.exports = multer({ storage }).single("image");
