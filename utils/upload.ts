const multer = require("multer");
const path = require("path");
const fs = require("fs");

const checkIfFolderExisting = () => {
  const folderPath = path.resolve(__dirname, "../uploads");
  try {
    fs.readdirSync(folderPath);
  } catch (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync(folderPath);
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { checkIfFolderExisting, upload };
