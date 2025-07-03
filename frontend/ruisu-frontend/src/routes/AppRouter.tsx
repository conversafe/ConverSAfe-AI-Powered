// routes/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AdminInicio from "../pages/Admin/AdminInicio";

import Welcome from "../pages/Welcome.tsx";
import Login from "../pages/Auth/Login.tsx";
import Register from "../pages/Auth/Register.tsx";
import Recover from "../pages/Auth/Recover.tsx";
import CodeSent from "../pages/Auth/CodeSent.tsx";
import ResetPassword from "../pages/Auth/ResetPassword.tsx";
import AdminCrearCanal from "../pages/Admin/AdminCrearCanal.tsx";
import AdminUnirseCanal from "../pages/Admin/AdminUnirseCanal.tsx";
import SalaAdmin from "../pages/Admin/SalaAdmin.tsx";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/code" element={<CodeSent />} />
      <Route path="/reset" element={<ResetPassword />} />

      {/* Rutas protegidas (se crearán después) */}
      <Route path="/admin/*" element={<div>Vista admin</div>} />
      <Route path="/admin/inicio" element={<AdminInicio />} />
      <Route path="/admin/sala/nueva" element={<AdminCrearCanal />} />
      <Route path="/admin/sala/unirse" element={<AdminUnirseCanal />} />
      <Route path="/admin/sala/:id" element={<SalaAdmin />} />

      <Route path="/user/*" element={<div>Vista usuario</div>} />
      <Route path="/dashboard" element={<PrivateRoute />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
