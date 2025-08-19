// backend/src/middleware/upload.js
import multer from "multer";
import path from "path";

// Настраиваем хранилище
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // сохраняем в папку uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // уникальное имя
  },
});

const upload = multer({ storage });

export default upload;
