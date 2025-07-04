// utils/apiClient.ts

export interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  auth?: boolean; // para incluir automáticamente el token
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export const apiClient = async (
  path: string,
  options: ApiOptions = {}
): Promise<any> => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const url = `${baseUrl}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (options.auth) {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (auth.token) {
      headers["Authorization"] = `Bearer ${auth.token}`;
    }
  }

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.message || "Error en la solicitud", res.status, data);
  }

  return data;
};
