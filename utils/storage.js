const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    let folder = "public/files";

    callback(null, folder);
  },

  // generate unique filename
  filename: (_req, file, callback) => {
    const fileName = Date.now() + path.extname(file.originalname);
    callback(null, fileName);
  },
});

const upload = multer({
  storage: storage,

  //error handling
  onError: (err, next) => {
    console.log(err);
  },
});

module.exports = upload;
