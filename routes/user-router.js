import express from "express";
import {
  getUser,
  getAllUser,
  deleteUser,
  createUser,
  updateUser,
} from "../controller/user-controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profil");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        "-" +
        file.originalname
    );
  },
});
const upload = multer({ storage: fileStorage });

router.post("/register_user", upload.single("image"), createUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;
