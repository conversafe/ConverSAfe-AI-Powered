import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../validators/authValidator.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post("/login", loginValidation, validate, loginUser);
router.post("/register", registerValidation, validate, registerUser);

export default router;
