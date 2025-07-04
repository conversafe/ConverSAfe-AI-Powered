import express from "express";
import { createChatRoom, getUserChatRooms, joinChatRoom, viewChatRoom } from "../controllers/chatRoomController.js";
import { roomMetrics } from "../controllers/metricsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Crear sala
router.post("/", authMiddleware, roleMiddleware("admin"), createChatRoom);

// ✅ RUTAS ESPECÍFICAS PRIMERO
// Unirse a sala con accessCode
router.post("/join", authMiddleware, joinChatRoom);

// ChatRooms de un usuario
router.get("/member", authMiddleware, getUserChatRooms);

// ✅ RUTAS PARAMETRIZADAS DESPUÉS
// Obtener info de una sala
router.get("/:id", authMiddleware, viewChatRoom);

// Metricas
// router.get("/:id/metrics", authMiddleware, roleMiddleware("admin"), roomMetrics);
router.get("/:id/metrics", authMiddleware, roomMetrics);

export default router;
