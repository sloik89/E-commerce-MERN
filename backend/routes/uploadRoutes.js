import express from "express";
import path from "path";
import multer from "multer";
const router = express.Router();
// describe storage to the disk storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
function fileFilter(req, file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}
const upload = multer({
  storage,
  fileFilter,
});
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  console.log(req.files);
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  });
});
export default router;
