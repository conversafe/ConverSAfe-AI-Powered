import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Boton from "../components/Boton";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <Header isAuthenticated={false} />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen pt-20">
        {/* Sección izquierda */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="max-w-lg space-y-8">
            {/* Texto azul en bloque */}
            <div
              className="bg-[#E0EBFF] text-[#154EB4] font-medium text-base rounded-[8px]
              px-[40px] py-[16px]"
              style={{ maxWidth: "583px" }}
            >
              Enciende la chispa de la creatividad con tu socio creativo
            </div>

            {/* Título destacado */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
              Tu equipo, más <span className="text-[#154EB4]">conectado</span> que nunca
            </h1>

            {/* Descripción */}
            <p className="text-gray-600 text-base leading-relaxed">
              Optimiza el trabajo en equipo con un asistente de IA en tiempo real.
              Mejora la comunicación y potencia la productividad de tu equipo
              desde el primer mensaje.
            </p>

            {/* Botón */}
            <Boton
              texto="Comenzar"
              variant="primary"
              onClick={() => navigate("/login")}
              className="w-full max-w-xs"
            />
          </div>
        </div>

        {/* Imagen decorativa (solo visible en md o más grande) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[url('/Fondo3.png')] bg-no-repeat bg-center bg-contain">
          <div className="w-[400px] h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
