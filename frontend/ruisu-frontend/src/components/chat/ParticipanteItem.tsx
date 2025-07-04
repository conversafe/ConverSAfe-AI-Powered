import { FaCrown, FaUser } from "react-icons/fa";

interface Props {
  nombre: string;
  rol: "Administrador" | "Usuario";
  imagen?: string;
}

const ParticipanteItem = ({ nombre, rol, imagen }: Props) => {
  const Icon = rol === "Administrador" ? FaCrown : FaUser;
  const iconColor = rol === "Administrador" ? "#F59E0B" : "#6B7280"; // amarillo para admin, gris para user

  return (
    <div className="flex items-center gap-3 bg-[#F9FAFB] p-2 rounded-lg hover:bg-blue-50 transition">
      <img
        src={imagen || "/avatar.png"}
        alt={nombre}
        className="w-10 h-10 rounded-full object-cover border border-gray-300"
      />
      <div className="flex flex-col">
        <p className="font-semibold text-gray-800 leading-tight">{nombre}</p>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Icon size={14} color={iconColor} />
          <span>{rol}</span>
        </div>
      </div>
    </div>
  );
};

export default ParticipanteItem;
