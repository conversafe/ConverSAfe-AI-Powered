// components/Input.tsx
import type { ReactNode } from "react";
import { FiAlertCircle, FiCheck } from "react-icons/fi";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: ReactNode;
  type?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  inputName?: string;
}

const Input = ({
  value,
  onChange,
  placeholder = "",
  icon,
  type = "text",
  required = false,
  error = "",
  success = false,
  disabled = false,
  inputName = "",
}: InputProps) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={inputName}
          name={inputName}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={type === "password" ? "current-password" : "email"}
          className={`
            w-full px-4 py-3
            ${icon ? 'pl-10' : 'pl-4'}
            border-b border-gray-300
            focus:outline-none focus:border-blue-500
            text-gray-800
            transition-colors duration-200
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
            ${error ? 'border-red-500' : ''}
            ${success ? 'border-green-500' : ''}
          `}
        />

        {success && (
          <div className="absolute right-3 text-green-500">
            <FiCheck className="w-5 h-5" />
          </div>
        )}
        {error && (
          <div className="absolute right-3 text-red-500">
            <FiAlertCircle className="w-5 h-5" />
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center text-sm text-red-500 space-x-2">
          <FiAlertCircle className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
