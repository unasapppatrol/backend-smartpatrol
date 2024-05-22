import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth-router.js";
import patrolRouter from "./routes/patrol-router.js";
import usersRouter from "./routes/user-router.js";
import absenRouter from "./routes/absen-router.js";
import posRouter from "./routes/pos-router.js";
import activityRouter from "./routes/activity-router.js";
import atensiRouter from "./routes/atensi-router.js";

const app = express();
const PORT = process.env.PORT || 8083;
dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/patrol", patrolRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/absensi", absenRouter);
app.use("/api/v1/pos", posRouter);
app.use("/api/v1/aktivitas", activityRouter);
app.use("/api/v1/atensi", atensiRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running on port : ", PORT);
    });
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("Cannot connect to mongodb : ", err);
  });

export default app;
