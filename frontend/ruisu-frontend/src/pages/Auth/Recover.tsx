// pages/Recover.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../../components/Boton";
import Input from "../../components/Input";
import { FiMail, FiGift } from "react-icons/fi";

const Recover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Correo no válido");
      return;
    }
    console.log("Enviar código a:", email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF6FF] p-6 text-[#F9FAFB]">
      {/* Cuadro principal */}
      <form
        onSubmit={handleSend}
        className="w-full max-w-[1020px] h-[526px] bg-[#F9FAFB] border border-[#103A86] rounded-[16px]
                   px-[74px] py-[37px] flex flex-col justify-center gap-8 text-gray-800 shadow-md"
      >
        {/* Contenido centrado */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
          <img src="/Logotype.png" alt="Logo" className="w-40 h-auto" />

          <h2
            className="text-[48px] font-bold leading-[130%] tracking-[0.002em] text-[#103A86] text-center"
            style={{ verticalAlign: "middle" }}
          >
            Restablecer tu contraseña
          </h2>

          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Ingresa correo electrónico"
            type="email"
            icon={<FiMail />}
            required
            error={error}
            inputName="email"
          />

          {/* Botones alineados a la derecha */}
          <div className="flex justify-end w-full gap-4 pt-2">
            <Boton
              texto="Cancelar"
              onClick={() => navigate("/login")}
              variant="secondary"
              className="w-[154px] h-[50px] px-[40px] py-[16px] border-b border-[#103A86] text-[#103A86] bg-transparent"
            />

            <Boton
              texto="Enviar código"
              onClick={() => navigate("/code")}
              tipo="submit"
              variant="primary"
              iconoInicio={<FiGift />}
              className="w-[154px] h-[50px] px-[40px] py-[16px]"
            />
          </div>
        </div>
      </form>

      {/* Links de ayuda */}
      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-[#103A86] font-medium">
        <a href="#" className="hover:underline">Necesito ayuda</a>
        <a href="#" className="hover:underline">Política de privacidad</a>
        <a href="#" className="hover:underline">Contacto</a>
      </div>
    </div>
  );
};

export default Recover;
