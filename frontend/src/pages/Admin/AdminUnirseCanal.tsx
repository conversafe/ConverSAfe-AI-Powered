// pages/Admin/AdminUnirseCanal.tsx
import { useNavigate } from "react-router-dom";
import Boton from "../../components/Boton";
import Input from "../../components/Input";
import { useState } from "react";
import { FiHash } from "react-icons/fi";

const AdminUnirseCanal = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF6FF] p-6 text-[#F9FAFB]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (codigo.trim()) {
            console.log("Unirse al canal con código:", codigo);
            navigate(`/admin/chatroom/${codigo}`);
          }
        }}
        className="w-full max-w-[1020px] h-[526px] bg-[#F9FAFB] border border-[#103A86] rounded-[16px]
                   px-[74px] py-[37px] flex flex-col justify-center gap-8 text-gray-800 shadow-md"
      >
        <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
          <img src="/Logotype.png" alt="Logo" className="w-40 h-auto" />

          <h2 className="text-[48px] font-bold leading-[130%] tracking-[0.002em] text-[#103A86] text-center">
            Ingresa el código del canal
          </h2>

          <p className="text-center text-gray-600 max-w-md">
            Sé parte de tu equipo y trabaja eficientemente junto con la IA.
          </p>

          <Input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código"
            icon={<FiHash />}
            required
            inputName="codigo"
          />

          <Boton
            texto="Ingresar al canal"
            tipo="submit"
            variant="primary"
            className="w-full max-w-[600px]"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminUnirseCanal;
