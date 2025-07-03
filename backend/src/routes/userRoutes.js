import express from "express";
import { deleteUser, getAllUsers, getUserById, userProfile } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import validate from "../middlewares/validate.js";
import { userIdValidation } from "../validators/userValidator.js";

const router = express.Router();

// Obtener perfil del usuario autenticado
router.get("/profile", authMiddleware, userProfile);

// Obtener todos los usuarios (solo admin)
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

// Obtener usuario por ID (solo admin)
router.get("/:userId", authMiddleware, roleMiddleware("admin"), userIdValidation, validate, getUserById);

// Eliminar usuario (solo admin)
router.delete("/:userId", authMiddleware, roleMiddleware("admin"), userIdValidation, validate, deleteUser);

export default router;
