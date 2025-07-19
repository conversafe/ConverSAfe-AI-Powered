import { useNavigate } from "react-router-dom";
import Boton from "../../components/Boton";
import Input from "../../components/Input";
import { useState } from "react";
import { FiHash } from "react-icons/fi";
import { apiClient } from "@/utils/apiClient";

const UsuarioUnirseCanal = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF6FF] p-6 text-[#F9FAFB]">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          if (codigo.trim()) {
            try {
              const res = await apiClient("/chatrooms/join", {
                method: "POST",
                body: { accessCode: codigo },
                auth: true,
              });
              if (res && res.roomId) {
                navigate(`/user/chatroom/${res.roomId}`);
              } else {
                setError("No se pudo unir a la sala. Verifica el código.");
              }
            } catch (err) {
              setError("No se pudo unir a la sala. Verifica el código.");
            }
          }
        }}
        className="w-full max-w-[1020px] h-[526px] bg-[#F9FAFB] border border-[#103A86] rounded-[16px]
                   px-[74px] py-[37px] flex flex-col justify-center gap-8 text-gray-800 shadow-md"
      >
        <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
          <img src="/Logotype.png" alt="Logo" className="w-40 h-auto" />

          <h2 className="text-[48px] font-bold leading-[130%] tracking-[0.002em] text-[#103A86] text-center">
            Únete a un canal
          </h2>

          <p className="text-center text-gray-600 max-w-md">
            Ingresa el código que recibiste para colaborar con tu equipo y acceder a métricas en tiempo real.
          </p>

          <Input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código"
            icon={<FiHash />}
            required
            inputName="codigo"
          />

          {error && (
            <div className="text-red-600 font-semibold text-center">{error}</div>
          )}

          <Boton
            texto="Unirse"
            tipo="submit"
            variant="primary"
            className="w-full max-w-[600px]"
          />
        </div>
      </form>
    </div>
  );
};

export default UsuarioUnirseCanal;
