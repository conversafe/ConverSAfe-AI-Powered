// components/Boton.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface BotonProps {
  texto: string;
  variant?: "primary" | "secondary" | "disabled" | "active" | "press" | "inactive";
  iconoInicio?: ReactNode;
  iconoFin?: ReactNode;
  to?: string;
  onClick?: () => void;
  tipo?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const estilosPorVariante: Record<string, string> = {
  primary: "bg-[#1E54E4] text-white hover:bg-[#163DB0]",
  secondary: "bg-[#E8EEFF] text-[#1E54E4] hover:bg-[#d3ddff]",
  disabled: "bg-white text-[#A5A3A2] cursor-not-allowed",
  active: "bg-[#E8EEFF] text-[#1E54E4]",
  press: "bg-[#CFE0FF] text-[#A5A3A2]",
  inactive: "bg-[#F1F1F3] text-[#9E9E9E]",
};

const Boton = ({
  texto,
  variant = "secondary",
  iconoInicio,
  iconoFin,
  to,
  onClick,
  tipo = "button",
  className = "",
  disabled = false,
}: BotonProps) => {
  const baseClasses = `
    w-full h-12 px-4
    flex items-center justify-center gap-4
    rounded-md text-base font-medium
    transition-all duration-200 ease-in-out
  `;

  const finalClass = `
    ${baseClasses}
    ${estilosPorVariante[variant]}
    ${disabled || variant === "disabled" ? "pointer-events-none opacity-60" : ""}
    ${className}
  `.trim();

  const content = (
    <>
      {iconoInicio && <span className="text-xl">{iconoInicio}</span>}
      <span>{texto}</span>
      {iconoFin && <span className="text-xl">{iconoFin}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={finalClass}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={tipo}
      onClick={onClick}
      className={finalClass}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Boton;
