import {
  createActivity,
  deleteActivity,
  getActivity,
  getAllActivities,
  getUserActivity,
  updateAktivitas,
  savePushToken,
} from "../controller/activity-controller.js";
import express from "express";
import path from "path";
import multer from "multer";

const Router = express.Router();

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
const upload = multer({ storage: fileStorage, limits: { files: 6 } });

Router.post("/", upload.array("image", 6), createActivity);
Router.get("/detail/:id", getActivity);
Router.get("/instansi", getAllActivities);
Router.get("/user/:id", getUserActivity);
Router.put("/:id", updateAktivitas);
Router.delete("/:id", deleteActivity);
Router.post("/save-token", savePushToken);

export default Router;
