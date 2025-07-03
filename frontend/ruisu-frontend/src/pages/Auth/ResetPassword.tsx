// pages/ResetPassword.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Boton from "../../components/Boton";
import { FiLock } from "react-icons/fi";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    console.log("Nueva contraseña:", form.password);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF6FF] p-6 text-[#F9FAFB]">
      {/* Cuadro principal */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1020px] h-[526px] bg-[#F9FAFB] border border-[#103A86] rounded-[16px]
                   px-[74px] py-[37px] flex flex-col justify-center items-center gap-8 text-gray-800 shadow-md"
      >
        {/* Logo */}
        <img src="/Logotype.png" alt="Logo" className="w-40 h-auto" />

        {/* Título */}
        <h2
          className="text-[48px] font-bold leading-[130%] tracking-[0.002em] text-[#103A86] text-center"
          style={{ verticalAlign: "middle" }}
        >
          Restablecer tu contraseña
        </h2>

        {/* Inputs */}
        <div className="w-full max-w-md space-y-4">
          <Input
            value={form.password}
            onChange={handleChange}
            placeholder="Nueva contraseña"
            type="password"
            icon={<FiLock />}
            required
            error={error}
            inputName="password"
          />
          <Input
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar nueva contraseña"
            type="password"
            icon={<FiLock />}
            required
            error={error}
            inputName="confirmPassword"
          />
        </div>

        {/* Botón */}
        <div className="pt-2">
          <Boton
            texto="Guardar"
            tipo="submit"
            variant="primary"
            className="w-[154px] h-[50px] px-[40px] py-[16px]"
          />
        </div>
      </form>

      {/* Links inferiores */}
      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-[#103A86] font-medium">
        <a href="#" className="hover:underline">Necesito ayuda</a>
        <a href="#" className="hover:underline">Política de privacidad</a>
        <a href="#" className="hover:underline">Contacto</a>
      </div>
    </div>
  );
};

export default ResetPassword;
