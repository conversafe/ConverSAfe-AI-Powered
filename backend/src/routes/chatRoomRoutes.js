import express from "express";
import { createChatRoom, viewChatRoom, joinChatRoom, getUserChatRooms } from "../controllers/chatRoomController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Crear sala
router.post("/", authMiddleware, roleMiddleware("admin"), createChatRoom);

// Obtener info de una sala
router.get("/:id", authMiddleware, viewChatRoom);

// Unirse a sala con accessCode
router.post("/join", authMiddleware, joinChatRoom);

// ChatRooms de un usuario
router.get("/member", authMiddleware, getUserChatRooms);

export default router;
