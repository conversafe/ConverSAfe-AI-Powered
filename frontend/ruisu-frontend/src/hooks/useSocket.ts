import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  newMessage: (msg: any) => void;
  participantsUpdated: (users: any[]) => void;
  chatError: (msg: string) => void;
}

interface ClientToServerEvents {
  joinRoom: (data: { roomId: string }) => void;
  sendMessage: (data: { roomId: string; content: string }) => void;
}

export const useSocket = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth") || "{}")?.token;

    if (!token) {
      console.warn("🔒 No hay token. No se conecta al WebSocket.");
      return;
    }

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Conectado al WebSocket");
      setIsConnected(true);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión al WebSocket:", err.message);
      setIsConnected(false);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Desconectado del WebSocket");
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
  };
};
