import Header from "../../components/Header";
import ParticipantesPanel from "../../components/chat/SidebarParticipantes";
import ChatPanel from "../../components/chat/ChatMensajes";
import IAAssistantPanel from "../../components/chat/PanelAsistenteIA";

const SalaAdmin = () => {
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

        {/* Chat - siempre visible */}
        <div className="w-full md:w-2/4 border-r-2 border-gray-300 bg-[#E5E7EB] flex flex-col">
          {/* Título fijo */}
          <div className="px-4 py-2 border-b border-gray-300 bg-[#E5E7EB] sticky top-0 z-10 pt-8">
            <h2 className="text-xl font-semibold text-[#154EB4]">
              # Equipo Sprint 5
            </h2>
          </div>

          {/* Chat */}
          <ChatPanel />
        </div>

        {/* IA Assistant - visible solo en md+ */}
        <div className="hidden md:block md:w-1/4 bg-white overflow-y-auto p-4">
          <IAAssistantPanel />
        </div>
      </div>
    </div>
  );
};

export default SalaAdmin;
