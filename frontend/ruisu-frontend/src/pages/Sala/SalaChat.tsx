import Header from "../../components/Header";
import SidebarParticipantes from "../../components/chat/SidebarParticipantes";
import ChatMensajes from "../../components/chat/ChatMensajes";
import PanelAsistenteIA from "../../components/chat/PanelAsistenteIA";

const SalaChat = () => {
  return (
    <div className="flex flex-col h-screen bg-[#EFF6FF]">
      {/* Header fijo */}
      <Header isAuthenticated={true} />

      {/* Contenido principal dividido en 3 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_300px] h-[calc(100vh-64px)]">
        {/* Participantes */}
        <div className="bg-[#E5E7EB] h-full border-r-2 border-gray-300 p-4">
          <SidebarParticipantes />
        </div>

        {/* Chat */}
        <div className="bg-[#E5E7EB] h-full border-r-2 border-gray-300 p-4">
          <ChatMensajes />
        </div>

        {/* Asistente IA */}
        <div className="bg-white h-full p-4">
          <PanelAsistenteIA />
        </div>
      </div>
    </div>
  );
};

export default SalaChat;
