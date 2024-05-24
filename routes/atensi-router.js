import express from "express";
import {
  createAtensi,
  deleteAtensi,
  getAllAtensi,
  getAtensiById,
  getAtensiByUser,
  savePushToken,
  updateAtensi,
} from "../controller/atensi-controller.js";

const router = express.Router();

router.post("/", createAtensi);
router.get("/", getAllAtensi);
router.get("/:id", getAtensiById);
router.get("/user/:id", getAtensiByUser);
router.delete("/:id", deleteAtensi);
router.put("/:id", updateAtensi);
router.post("/save-token", savePushToken);

export default router;
