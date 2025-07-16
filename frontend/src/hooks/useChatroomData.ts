import { useEffect, useState } from "react";
// import axios from "axios"; // 👉 descomenta cuando conectes al backend

interface Usuario {
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
}

interface Mensaje {
  contenido: string;
  autor: string;
  hora: string;
  imagen?: string;
  rol: "Administrador" | "Usuario";
}

interface ChatroomResponse {
  id: string;
  name: string;
  creador: string;
  creadorEmail: string;
}

export const useChatroomData = (roomId: string) => {
  const [room, setRoom] = useState<ChatroomResponse | null>(null);
  const [participants, setParticipants] = useState<Usuario[]>([]);
  const [messages, setMessages] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Simulación con localStorage
        const canales: ChatroomResponse[] = JSON.parse(localStorage.getItem("canales") || "[]");
        const canal = canales.find((c) => c.id === roomId);
        if (!canal) {
          setError("Canal no encontrado.");
          return;
        }
        setRoom(canal);

        // Participantes simulados
        const auth = JSON.parse(localStorage.getItem("auth") || "{}");
        const user: Usuario = {
          name: auth?.user?.name,
          email: auth?.user?.email,
          avatar: auth?.user?.role === "admin" ? "/admin.png" : "/usuario1.png",
          role: auth?.user?.role,
        };

        setParticipants([
          {
            ...user,
            name: canal.creador,
            avatar: "/admin.png",
            role: "admin",
          },
        ]);

        // Mensajes simulados
        const mensajesGuardados = JSON.parse(localStorage.getItem(`mensajes-${roomId}`) || "[]");
        setMessages(mensajesGuardados);

        // --- BACKEND REAL ---
        /*
        const token = localStorage.getItem("token");
        const { data } = await axios.get<ChatroomResponse>(`https://tu-api.com/chatrooms/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoom(data);

        // Aquí iría la lógica para setParticipants y setMessages desde la API
        */

      } catch (e) {
        setError("Error al obtener la sala.");
      } finally {
        setLoading(false);
      }
    };

    if (roomId) fetchData();
  }, [roomId]);

  return {
    room,
    participants: participants.map((p) => ({
      nombre: p.name,
      rol: p.role === "admin" ? "Administrador" : "Usuario",
      imagen: p.avatar,
    })),
    messages: messages.map((msg) => ({
      ...msg,
    })),
    loading,
    error,
  };
};
