import express from "express";
import {
  createPatrol,
  deletePatrol,
  getAllPatrol,
  getDetailPatrol,
  getPatrolByInstansi,
  getUserPatrol,
  savePushToken,
  updatePatrol,
} from "../controller/patrol-controller.js";
const router = express.Router();
import multer from "multer";
import path from "path";

// Create
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
const upload = multer({ storage: fileStorage, limits: { files: 4 } });

// Create patrol
router.post("/", upload.array("image", 4), createPatrol);

// Get all patrols
router.get("/", getAllPatrol);

// Get patrol by Instansi
router.get("/instansi", getPatrolByInstansi);

// Get detail of a specific patrol by ID
router.get("/:id", getDetailPatrol);

// Get user's patrols by ID
router.get("/user/:id", getUserPatrol);

// Update a patrol by ID
router.put("/:id", updatePatrol);

// Delete a patrol by ID
router.delete("/:id", deletePatrol);

// Store token
router.post("/save-token", savePushToken);

export default router;
