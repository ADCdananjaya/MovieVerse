const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".").pop();
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + `${suffix}.${extension}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
