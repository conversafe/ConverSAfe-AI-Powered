// src/utils/auth.ts

export function getAuth() {
  const stored = localStorage.getItem("auth");
  return stored ? JSON.parse(stored) : null;
}

export function getToken(): string | null {
  return getAuth()?.token || null;
}

export function getUser() {
  return getAuth()?.user || null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function isAdmin(): boolean {
  return getUser()?.role === "admin";
}

export function isUser(): boolean {
  return getUser()?.role === "user";
}

export function logout() {
  localStorage.removeItem("auth");
}
