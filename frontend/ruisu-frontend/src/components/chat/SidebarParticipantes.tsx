import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParticipanteItem from "./ParticipanteItem";
import { Users } from "lucide-react";
// import { useSocket } from "../../hooks/useSocket"; // 👉 Descomentar para WebSocket real

import {
//  getParticipantes,

  quitarParticipante,
  suscribirseParticipantes,
  cancelarSuscripcionParticipantes,
} from "../../services/chatSimulado"; // ✅ Simulación local

interface Participante {
  nombre: string;
  rol: "Administrador" | "Usuario";
  imagen?: string;
}

const SidebarParticipantes = () => {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const user = JSON.parse(localStorage.getItem("auth") || "{}")?.user;
  const { id: roomId } = useParams(); // 👈 Extrae roomId desde la URL dinámica

useEffect(() => {
  if (!roomId || !user) return;



  // 👉 Solo SUSCRIBIRSE una vez, no setear manualmente el estado inicial
  const actualizar = (nuevos: Participante[]) => {
    setParticipantes(nuevos);
  };
  suscribirseParticipantes(roomId, actualizar);

  return () => {
    cancelarSuscripcionParticipantes(roomId, actualizar);
    quitarParticipante(roomId, user.name);
  };
}, [roomId, user]);


  return (
    <aside className="h-full w-full p-4 space-y-4 bg-[#E5E7EB] border-none rounded-none">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-[#154EB4]">
          <Users className="w-5 h-5" />
          <h3 className="text-xl font-semibold">Participantes</h3>
        </div>
        <span className="text-sm text-gray-600">{participantes.length}</span>
      </div>

      <div className="border-b border-gray-300 mb-2" />

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-150px)] pr-2">
        {participantes.map((p, i) => (
          <ParticipanteItem
            key={i}
            nombre={p.nombre}
            rol={p.rol}
            imagen={p.imagen}
          />
        ))}
      </div>
    </aside>
  );
};

export default SidebarParticipantes;
