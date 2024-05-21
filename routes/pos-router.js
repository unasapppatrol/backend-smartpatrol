import express from "express";
import {
  createPosCollection,
  deletePosCollection,
  getPosByInstansi,
  getsPosCollection,
} from "../controller/pos-controller.js";

const router = express.Router();

router.post("/", createPosCollection);
router.get("/", getsPosCollection);
router.get("/lokasi", getPosByInstansi);

router.delete("/:id", deletePosCollection);

export default router;
