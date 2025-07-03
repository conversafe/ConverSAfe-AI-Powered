import { Link } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
  userImage?: string;
}

const Header = ({ isAuthenticated, userImage }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#154EB4] px-4 sm:px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/" className="text-white font-bold text-xl">
        <img src="/Logotype2.png" alt="Logo" className="h-8 sm:h-10" />
      </Link>

      {/* Navegación */}
      {isAuthenticated ? (
        <img
          src={userImage || "/avatar.png"}
          alt="Perfil"
          className="w-10 h-10 rounded-full object-cover border border-white"
        />
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/login"
            className="text-[#EFF6FF] text-sm sm:text-base font-medium hover:underline transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="bg-[#EFF6FF] text-[#154EB4] text-sm sm:text-base font-medium px-3 sm:px-4 py-2 rounded-[8px] hover:bg-white transition"
          >
            Crear cuenta
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
