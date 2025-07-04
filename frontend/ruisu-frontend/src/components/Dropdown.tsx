// components/Dropdown.tsx
import type { ChangeEvent, ReactNode } from "react";
import { FiBriefcase, FiAlertCircle, FiCheck } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  icon?: ReactNode;
  name?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
}

const Dropdown = ({
  value,
  onChange,
  icon = <FiBriefcase />,
  name = "role",
  error = "",
  success = false,
  disabled = false,
}: DropdownProps) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="relative flex items-center">
        {/* Icono izquierdo */}
        {icon && (
          <div className="absolute left-3 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Select */}
        <select
          name={name}
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
          className={`
            w-full px-4 py-3
            ${icon ? 'pl-10' : 'pl-4'}
            border-b border-gray-300
            focus:outline-none focus:border-blue-500
            text-gray-800 bg-transparent
            transition-colors duration-200 appearance-none
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
            ${error ? 'border-red-500' : ''}
            ${success ? 'border-green-500' : ''}
          `}
        >
          <option value="" hidden>Rol</option>
          <option value="admin">Administrador</option>
          <option value="usuario">Usuario</option>
        </select>

        {/* Icono derecho */}
        {success && (
          <div className="absolute right-3 text-green-500 pointer-events-none">
            <FiCheck className="w-5 h-5" />
          </div>
        )}
        {error && (
          <div className="absolute right-3 text-red-500 pointer-events-none">
            <FiAlertCircle className="w-5 h-5" />
          </div>
        )}
        {!error && !success && (
          <div className="absolute right-3 text-gray-400 pointer-events-none">
            <FaChevronDown className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="flex items-center text-sm text-red-500 space-x-2">
          <FiAlertCircle className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
