import { useNavigate } from "react-router-dom";
import Boton from "../../components/Boton";

const UsuarioInicio = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF6FF] p-6 text-[#F9FAFB]">
      {/* Cuadro principal */}
      <div
        className="w-full max-w-[1020px] h-[526px] bg-[#F9FAFB] border border-[#103A86] rounded-[16px]
                   px-[74px] py-[37px] flex flex-col justify-center gap-8 text-gray-800 shadow-md"
      >
        <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
          {/* Logo */}
          <img src="/Logotype.png" alt="Logo" className="w-40 h-auto" />

          {/* Título */}
          <h2 className="text-[48px] font-bold leading-[130%] tracking-[0.002em] text-[#103A86] text-center">
            Únete a un canal
          </h2>

          {/* Descripción */}
          <p className="text-gray-600 text-center max-w-md">
            Encuentra el canal que necesitas y comienza a colaborar con tu equipo y la asistencia de IA.
          </p>

          {/* Botón único */}
          <div className="w-full max-w-[600px] pt-2">
            <Boton
              texto="Únete a un canal"
              variant="secondary"
              className="w-full h-[50px] border-b border-[#103A86] text-[#154EB4] bg-[#E0EBFF]"
              onClick={() => navigate("/usuario/sala/unirse")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioInicio;
