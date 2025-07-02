import express from "express";
import { userProfile } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, userProfile);

export default router;
