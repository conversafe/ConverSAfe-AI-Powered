import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (token: string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
    });

    socket.on("connect", () => {
      console.log("✅ Conectado al WebSocket");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión:", err.message);
    });
  }

  return socket;
};

export const getSocket = () => socket;
