import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input";
import Boton from "../../components/Boton";
import Dropdown from "../../components/Dropdown";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
// import { apiClient } from "../../utils/apiClient"; // ← Descomenta para usar el backend real

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { name: "", role: "", email: "", password: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Nombre requerido";
      valid = false;
    }

    if (!formData.role) {
      newErrors.role = "Rol requerido";
      valid = false;
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Correo no válido";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    // ✅ SIMULACIÓN usando localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    if (usuarios.some((u: any) => u.email === formData.email.trim())) {
      setErrors({ ...newErrors, email: "El correo ya está en uso" });
      return;
    }

    const nuevoUsuario = {
      _id: `u${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      role: formData.role,
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem(
      "auth",
      JSON.stringify({ token: "FAKE-TOKEN", user: nuevoUsuario })
    );

    if (nuevoUsuario.role === "admin") {
      navigate("/admin/inicio");
    } else {
      navigate("/user/inicio");
    }

    // 🟦 DESCOMENTA ESTE BLOQUE PARA USAR BACKEND REAL
    /*
    try {
      const data = await apiClient("/auth/register", {
        method: "POST",
        body: formData,
      });

      localStorage.setItem(
        "auth",
        JSON.stringify({ token: data.token, user: data.user })
      );

      if (data.user.role === "admin") {
        navigate("/admin/inicio");
      } else {
        navigate("/user/inicio");
      }
    } catch (err: any) {
      if (err.status === 409) {
        setErrors({ ...newErrors, email: "El correo ya está en uso" });
      } else {
        console.error("❌ Error:", err);
        alert("Error al registrar. Intenta nuevamente.");
      }
    }
    */
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[url('/Fondo2.png')] bg-no-repeat bg-center bg-contain bg-white">
        <div className="w-[400px] h-[400px]" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form onSubmit={handleRegister} className="w-full max-w-md space-y-6">
          <div className="md:hidden flex justify-center">
            <img
              src="/Fondo2.png"
              alt="Logo"
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
          </div>

          <div className="text-center mb-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              ¡Bienvenido!
            </h2>
            <p className="mt-1 text-gray-600">Nos alegra conocerte.</p>
          </div>

          <Input
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            icon={<FiUser />}
            required
            error={errors.name}
            inputName="name"
          />

          <Dropdown
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
          />

          <Input
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            icon={<FiMail />}
            type="email"
            required
            error={errors.email}
            inputName="email"
          />

          <Input
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            icon={<FiLock />}
            type="password"
            required
            error={errors.password}
            inputName="password"
          />

          <div className="text-right">
            <Link
              to="/recover"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div className="space-y-4 pt-2">
            <Boton
              texto="Registrarme"
              tipo="submit"
              variant="primary"
              iconoInicio={<FiMail />}
              className="w-full"
            />

            <p className="text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                Iniciar sesión
              </Link>
            </p>

            <Boton
              texto="Inicia con Google"
              variant="secondary"
              iconoInicio={<FcGoogle />}
              onClick={() => console.log("Google login")}
              className="w-full border border-gray-300"
            />

            <Boton
              texto="Iniciar con Apple"
              variant="secondary"
              iconoInicio={<FaApple />}
              onClick={() => console.log("Apple login")}
              className="w-full border border-gray-300"
            />

            <p className="text-center text-xs text-gray-500 mt-2">
              Al iniciar sesión, estás aceptando nuestros{" "}
              <span className="underline">términos y condiciones</span>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
