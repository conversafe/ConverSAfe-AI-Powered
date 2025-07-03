import ParticipanteItem from "./ParticipanteItem";
import { Users } from "lucide-react";

const SidebarParticipantes = () => {
  const participantes = [
    { nombre: "Ana Torres", rol: "Administrador", imagen: "/admin.png" },
    { nombre: "Carlos Ruiz", rol: "Usuario", imagen: "/usuario1.png" },
    { nombre: "Lucía Gómez", rol: "Usuario" },
    { nombre: "Daniel Rivas", rol: "Usuario" },
    { nombre: "Verónica Luna", rol: "Usuario" },
  ];

  return (
    <aside className="h-full w-full p-4 space-y-4 bg-[#E5E7EB] border-none rounded-none">
      <div className="flex items-center justify-between mb-2">
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
            rol={p.rol as "Administrador" | "Usuario"}
            imagen={p.imagen}
          />
        ))}
      </div>
    </aside>
  );
};

export default SidebarParticipantes;
