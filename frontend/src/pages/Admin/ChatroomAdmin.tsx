import { useState } from "react";
import Header from "../../components/Header";
import ParticipantesPanel from "../../components/chat/SidebarParticipantes";
import ChatPanel from "../../components/chat/ChatMensajes";
import IAAssistantPanel from "../../components/chat/PanelAsistenteIA";
import Boton from "../../components/Boton";
import { Users, Sparkles } from "lucide-react";

import { useParams } from "react-router-dom";
import { useChatroomData } from "../../hooks/useChatroomData";

const ChatroomAdmin = () => {
  const [verParticipantes, setVerParticipantes] = useState(false);
  const [verIA, setVerIA] = useState(false);
  const { id } = useParams();
  const { room } = useChatroomData(id!);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header isAuthenticated={true} />

      {/* Cuerpo del chat */}
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Participantes - visible solo en md+ */}
        <div className="hidden md:block md:w-1/4 border-r-2 border-gray-300 bg-[#E5E7EB] shadow-sm overflow-y-auto p-4">
          <ParticipantesPanel />
        </div>

        {/* Chat principal */}
        <div className="w-full md:w-2/4 border-r-2 border-gray-300 bg-[#E5E7EB] flex flex-col">
          {/* Título fijo + botones en móvil */}
          <div className="px-4 py-2 border-b border-gray-300 bg-[#E5E7EB] sticky top-0 z-10 pt-8 space-y-3">
            <h2 className="text-xl font-semibold text-[#154EB4]">
              # {room?.name || "Equipo"}
            </h2>

            {/* Botones en mobile */}
            <div className="flex md:hidden gap-2">
              <Boton
                texto="Participantes"
                iconoInicio={<Users size={18} />}
                onClick={() => setVerParticipantes(true)}
                variant="secondary"
              />
              <Boton
                texto="IA"
                iconoInicio={<Sparkles size={18} />}
                onClick={() => setVerIA(true)}
                variant="secondary"
              />
            </div>
          </div>

          {/* Chat */}
          <ChatPanel messages={room?.messages || []} />
        </div>

        {/* Asistente IA - solo md+ */}
        <div className="hidden md:block md:w-1/4 bg-white overflow-y-auto p-4">
          <IAAssistantPanel />
        </div>
      </div>

      {/* Modal de Participantes - solo visible en mobile */}
      {verParticipantes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center md:hidden">
          <div className="bg-white w-full h-full p-4 overflow-y-auto">
            <div className="mb-4">
              <Boton
                texto="← Volver"
                onClick={() => setVerParticipantes(false)}
                variant="secondary"
              />
            </div>
            <ParticipantesPanel />
          </div>
        </div>
      )}

      {/* Modal de IA - solo visible en mobile */}
      {verIA && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center md:hidden">
          <div className="bg-white w-full h-full p-4 overflow-y-auto">
            <div className="mb-4">
              <Boton
                texto="← Volver"
                onClick={() => setVerIA(false)}
                variant="secondary"
              />
            </div>
            <IAAssistantPanel />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatroomAdmin;
