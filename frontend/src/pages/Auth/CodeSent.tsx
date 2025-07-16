// pages/CodeSent.tsx
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiMail } from "react-icons/fi";
import Boton from "../../components/Boton";

const CodeSent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF6FF] p-6 text-[#F9FAFB]">
      <div
        className="w-full max-w-[1020px] h-[526px] bg-[#F9FAFB] border border-[#103A86] rounded-[16px]
                   px-[74px] py-[37px] flex flex-col justify-center items-center gap-8 text-gray-800 shadow-md"
      >
        {/* Logo */}
        <img src="/Logotype.png" alt="Logo" className="w-40 h-auto" />

        {/* Confirmación */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-green-500 text-4xl" />
            <h2 className="text-[48px] font-bold leading-[130%] tracking-[0.002em] text-[#103A86]">
              ¡Enviado!
            </h2>
          </div>

          <p className="text-lg text-center max-w-xl">
            Te hemos enviado un email. ¡Revisa tu bandeja de entrada!
          </p>
          <p className="text-sm text-gray-600 max-w-xl">
            ¿No has recibido el email? Revisa tu carpeta de spam para asegurarte de que el mensaje no está ahí.
          </p>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4 pt-4">
          <Boton
            texto="Probar otro correo"
            variant="secondary"
            onClick={() => navigate("/recover")}
            className="w-[154px] h-[50px] px-[40px] py-[16px] border-b border-[#103A86] text-[#103A86] bg-transparent"
          />
          <Boton
            texto="Reenviar código"
            variant="primary"
            iconoInicio={<FiMail />}
            onClick={() => navigate("/reset")}
            className="w-[154px] h-[50px] px-[40px] py-[16px]"
          />
        </div>
      </div>

      {/* Links inferiores */}
      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-[#103A86] font-medium">
        <a href="#" className="hover:underline">Necesito ayuda</a>
        <a href="#" className="hover:underline">Política de privacidad</a>
        <a href="#" className="hover:underline">Contacto</a>
      </div>
    </div>
  );
};

export default CodeSent;
