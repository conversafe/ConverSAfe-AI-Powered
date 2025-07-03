// routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  if (!auth || !auth.token) {
    return <Navigate to="/login" />;
  }

  // Redirigir según rol
  if (auth.role === "admin") {
    return <Navigate to="/admin/inicio" />;
  } else if (auth.role === "user") {
    return <Navigate to="/user/chat" />;
  }

  return <Navigate to="/" />;
};

export default PrivateRoute;
