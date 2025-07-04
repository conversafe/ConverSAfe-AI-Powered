import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AdminInicio from "../pages/Admin/AdminInicio";
import UsuarioInicio from "../pages/User/UsuarioInicio";
import UsuarioUnirseCanal from "../pages/User/UsuarioUnirseCanal";
import ChatroomAdmin from "../pages/Admin/ChatroomAdmin.tsx";
import ChatroomUsuario from "../pages/User/ChatroomUsuario.tsx";

import Welcome from "../pages/Welcome.tsx";
import Login from "../pages/Auth/Login.tsx";
import Register from "../pages/Auth/Register.tsx";
import Recover from "../pages/Auth/Recover.tsx";
import CodeSent from "../pages/Auth/CodeSent.tsx";
import ResetPassword from "../pages/Auth/ResetPassword.tsx";
import AdminCrearCanal from "../pages/Admin/AdminCrearCanal.tsx";
import AdminUnirseCanal from "../pages/Admin/AdminUnirseCanal.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/code" element={<CodeSent />} />
      <Route path="/reset" element={<ResetPassword />} />

      {/* Rutas ADMIN */}
      <Route path="/admin/inicio" element={<AdminInicio />} />
      <Route path="/admin/sala/nueva" element={<AdminCrearCanal />} />
      <Route path="/admin/sala/unirse" element={<AdminUnirseCanal />} />
      <Route path="/admin/chatroom/:id" element={<ChatroomAdmin />} />

      {/* Rutas USUARIO */}
      <Route path="/user/inicio" element={<UsuarioInicio />} />
      <Route path="/usuario/sala/unirse" element={<UsuarioUnirseCanal />} />
      <Route path="/user/chatroom/:id" element={<ChatroomUsuario />} />

      {/* Ruta protegida de ejemplo */}
      <Route path="/dashboard" element={<PrivateRoute />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
