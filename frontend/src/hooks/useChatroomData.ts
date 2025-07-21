import { useEffect, useState } from "react";
import { apiClient } from "@/utils/apiClient";

interface Usuario {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
}

interface Mensaje {
  contenido: string;
  autor: string;
  autorId: string;
  hora: string;
  imagen?: string;
  rol: "Administrador" | "Usuario";
}

interface ChatroomResponse {
  id: string;
  name: string;
  creador: string;
  creadorEmail: string;
  adminId: string;
  messages: Mensaje[];
  participants: Usuario[];
}

export interface SidebarParticipant {
  id: string;
  nombre: string;
  rol: string;
  imagen?: string;
}

export interface UseChatroomDataReturn {
  room: ChatroomResponse | null;
  participants: SidebarParticipant[];
  messages: Mensaje[];
  loading: boolean;
  error: string | null;
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

        const data = await apiClient(`/chatrooms/${roomId}`, { auth: true });

        setRoom({
          id: data.id,
          name: data.name,
          creador: data.creador,
          creadorEmail: data.creadorEmail,
          adminId: data.adminId,
          messages: data.messages,
          participants: data.participants,
        });

        const allParticipants: Usuario[] = data.participants.map((p: any) => ({
          id: p.id,
          name: p.name,
          email: p.email,
          role: p.id === data.adminId ? "admin" : "user",
          avatar: p.id === data.adminId ? "/admin.png" : "/usuario1.png",
        }));

        setParticipants(allParticipants);

        const msgs: Mensaje[] = data.messages.map((m: any) => ({
          contenido: m.contenido,
          autor: m.autor,
          autorId: m.autorId,
          hora: new Date(m.hora).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          imagen: m.autorId === data.adminId ? "/admin.png" : "/usuario1.png",
          rol: m.autorId === data.adminId ? "Administrador" : "Usuario",
        }));

        setMessages(msgs);

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
      id: p.id,
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
