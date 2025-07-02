import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import registerChatSocket from "./src/sockets/chatSocket.js";
import { connectDB } from "./src/config/db.config.js";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import authRouter from "./src/routes/authRoutes.js";
import passport from "passport";
import { initializePassport } from "./src/config/passport.config.js";
import userRouter from "./src/routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000"];

const app = express();
const httpServer = createServer(app);

// WebSocket Config
const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Socket.IO CORS: Origin not allowed"));
      }
    },
    methods: ["GET", "POST"],
  },
});

// Mongo Connection
connectDB();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS: Origin not allowed"));
      }
    },
    methods: ["GET", "POST"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initializePassport();
app.use(passport.initialize());

// Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);

// WebSocket Connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  registerChatSocket(io, socket);
});

app.use(errorMiddleware);

// HTTP Connection
httpServer.listen(PORT, () => {
  console.log(`Running server on ${HOST}:${PORT}`);
});
