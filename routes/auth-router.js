import express from "express";
import { login } from "../controller/auth-controller.js";

const router = express.Router();

router.post("/", login);

export default router;
