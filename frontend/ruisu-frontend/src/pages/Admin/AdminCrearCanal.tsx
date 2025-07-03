// pages/Admin/AdminCrearCanal.tsx
import { useNavigate } from "react-router-dom";
import Boton from "../../components/Boton";
import Input from "../../components/Input";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const AdminCrearCanal = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF6FF] p-6 text-[#F9FAFB]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (nombre.trim()) {
            console.log("Crear canal:", nombre);
            navigate("/admin/sala/123"); // ruta ficticia
          }
        }}
        className="w-full max-w-[1020px] h-[526px] bg-[#F9FAFB] border border-[#103A86] rounded-[16px]
                   px-[74px] py-[37px] flex flex-col justify-center gap-8 text-gray-800 shadow-md"
      >
        <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
          <img src="/Logotype.png" alt="Logo" className="w-40 h-auto" />

          <h2 className="text-[48px] font-bold leading-[130%] tracking-[0.002em] text-[#103A86] text-center">
            Cuéntanos de tu canal
          </h2>

          <p className="text-center text-gray-600 max-w-md">
            Para poder ayudarte a configurarlo a la medida que necesitas y entrenar a nuestra IA para que te ayude a administrar tu equipo de trabajo.
          </p>

          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del proyecto"
            icon={<FiEdit />}
            required
            inputName="nombre"
          />

          <Boton
            texto="Crear Canal"
            tipo="submit"
            variant="primary"
            className="w-full max-w-[600px]"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminCrearCanal;
