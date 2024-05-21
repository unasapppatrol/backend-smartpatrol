import express from "express";
import {
  deleteAbsen,
  getAllAbsen,
  getDetailAbsen,
  getLokasiAbsen,
  getUserAbsen,
  updateAbsen,
  absenMasuk,
  absenKeluar,
} from "../controller/absen-controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();
const fileStorage = multer.diskStorage({
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

// Create Absen
// router.post("/", upload.single("image"), createAbsen);
router.post("/absen_masuk", upload.single("image"), absenMasuk);
router.post("/absen_keluar", upload.single("image"), absenKeluar);

// Get all Absen
router.get("/", getAllAbsen);

// Get detail Absen
router.get("/detail/:id", getDetailAbsen);

// Get lokasi Absen
router.get("/lokasi", getLokasiAbsen);

// Get user Absen
router.get("/user/:id", getUserAbsen);

// Update Absen
router.put("/:id", updateAbsen);

// Delete Absen
router.delete("/:id", deleteAbsen);

export default router;
