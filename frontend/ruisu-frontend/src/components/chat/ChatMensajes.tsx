import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { BotMessageSquare } from "lucide-react";
import clsx from "clsx";
// import { useSocket } from "../../hooks/useSocket"; // 👉 Descomentar cuando se use backend
import {
  getMensajes,
  enviarMensaje,
  suscribirse,
  cancelarSuscripcion,
} from "../../services/chatSimulado"; // ✅ Simulación local

interface Mensaje {
  autor: string;
  rol: "Administrador" | "Usuario" | "IA";
  contenido: string;
  hora: string;
  imagen?: string;
}

const ChatMensajes = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const { id: roomId } = useParams(); // 👉 roomId dinámico desde la URL
  const user = JSON.parse(localStorage.getItem("auth") || "{}")?.user;

  const handleEnviar = () => {
    if (!nuevoMensaje.trim() || !roomId) return;

    const nuevo: Mensaje = {
      autor: user?.name || "Tú",
      rol: user?.role === "admin" ? "Administrador" : "Usuario",
      contenido: nuevoMensaje,
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      imagen: user?.role === "admin" ? "/admin.png" : "/usuario1.png",
    };

    enviarMensaje(roomId, nuevo);
    setNuevoMensaje("");
  };

  // Auto scroll
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes]);

  // Simulación con localStorage
  useEffect(() => {
    if (!roomId) return;

    setMensajes(getMensajes(roomId));

    const actualizar = (nuevos: Mensaje[]) => setMensajes(nuevos);
    suscribirse(roomId, actualizar);

    return () => cancelarSuscripcion(roomId, actualizar); 
  }, [roomId]);

  return (
    <div className="h-full flex flex-col bg-[#E5E7EB] p-4 rounded-none">
      {/* Mensajes */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 pt-4 space-y-4 scrollbar-hide"
      >
        {mensajes.map((msg, i) =>
          msg.rol === "IA" ? (
            <div
              key={i}
              className="bg-yellow-50 border border-yellow-200 text-gray-800 p-4 rounded-lg shadow-sm max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-2 mb-2">
                <BotMessageSquare className="text-yellow-500" size={20} />
                <span className="font-semibold text-sm">AI Assistant</span>
                <span className="text-xs text-gray-500">{msg.hora}</span>
              </div>
              <div className="text-sm">{msg.contenido}</div>
            </div>
          ) : (
            <div
              key={i}
              className={clsx(
                "flex gap-3 items-start max-w-2xl px-2",
                msg.autor === user?.name
                  ? "ml-auto flex-row-reverse"
                  : "mr-auto"
              )}
            >
              {msg.imagen && (
                <img
                  src={msg.imagen}
                  alt={msg.autor}
                  className="w-10 h-10 rounded-full object-cover border"
                />
              )}
              <div
                className={clsx(
                  "rounded-xl p-3 shadow max-w-full break-words",
                  msg.autor === user?.name
                    ? "bg-blue-100 text-right"
                    : "bg-white text-left"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-700">
                    {msg.autor}
                  </span>
                  <span className="text-xs text-gray-500">{msg.hora}</span>
                </div>
                <div className="text-sm text-gray-800">{msg.contenido}</div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Barra de mensaje */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEnviar();
        }}
        className="bg-[#F9FAFB] border-2 border-gray-300 px-4 py-4 flex items-center gap-3 shadow-sm"
      >
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition"
          aria-label="Enviar mensaje"
        >
          <FiSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatMensajes;
