// src/services/auth.ts
export interface RegistroData {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export async function registrarUsuario(data: RegistroData) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al registrar");
  }

  return await response.json();
}
