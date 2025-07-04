// 🧠 Servicio de chat simulado (compartido entre tabs, por sala)

const subsMensajes = new Map<string, ((msgs: any[]) => void)[]>();
const subsParticipantes = new Map<string, ((p: any[]) => void)[]>();

// Mensajes
export function getMensajes(roomId: string) {
  const data = localStorage.getItem(`mensajes-${roomId}`);
  return data ? JSON.parse(data) : [];
}

export function enviarMensaje(roomId: string, msg: any) {
  const actual = getMensajes(roomId);
  const nuevos = [...actual, msg];
  localStorage.setItem(`mensajes-${roomId}`, JSON.stringify(nuevos));
  subsMensajes.get(roomId)?.forEach((cb) => cb(nuevos));
}

export function suscribirse(roomId: string, cb: (msgs: any[]) => void) {
  if (!subsMensajes.has(roomId)) {
    subsMensajes.set(roomId, []);
  }
  subsMensajes.get(roomId)!.push(cb);

  const listener = () => cb(getMensajes(roomId));
  window.addEventListener("storage", listener);

  // Devolver función de limpieza opcional
  return () => {
    cancelarSuscripcion(roomId, cb);
    window.removeEventListener("storage", listener);
  };
}

export function cancelarSuscripcion(roomId: string, cb: (msgs: any[]) => void) {
  const subs = subsMensajes.get(roomId);
  if (subs) {
    subsMensajes.set(roomId, subs.filter((s) => s !== cb));
  }
}

// Participantes
export function getParticipantes(roomId: string) {
  const data = localStorage.getItem(`participantes-${roomId}`);
  return data ? JSON.parse(data) : [];
}

export function agregarParticipante(roomId: string, p: any) {
  const actuales = getParticipantes(roomId);
  const existe = actuales.some((x: any) => x.nombre === p.nombre);
  if (!existe) {
    const nuevos = [...actuales, p];
    localStorage.setItem(`participantes-${roomId}`, JSON.stringify(nuevos));
    subsParticipantes.get(roomId)?.forEach((cb) => cb(nuevos));
  }
}

export function suscribirseParticipantes(
  roomId: string,
  cb: (participantes: any[]) => void
) {
  if (!subsParticipantes.has(roomId)) {
    subsParticipantes.set(roomId, []);
  }
  subsParticipantes.get(roomId)!.push(cb);

  const listener = () => cb(getParticipantes(roomId));
  window.addEventListener("storage", listener);

  // Devolver función de limpieza opcional
  return () => {
    cancelarSuscripcionParticipantes(roomId, cb);
    window.removeEventListener("storage", listener);
  };
}

export function cancelarSuscripcionParticipantes(
  roomId: string,
  cb: (participantes: any[]) => void
) {
  const subs = subsParticipantes.get(roomId);
  if (subs) {
    subsParticipantes.set(roomId, subs.filter((s) => s !== cb));
  }
}

export function quitarParticipante(roomId: string, nombre: string) {
  const key = `participantes-${roomId}`;
  const actuales = getParticipantes(roomId);
  const nuevos = actuales.filter((p: any) => p.nombre !== nombre);
  localStorage.setItem(key, JSON.stringify(nuevos));
  subsParticipantes.get(roomId)?.forEach((cb) => cb(nuevos));

  // Notifica a otros tabs manualmente
  window.dispatchEvent(new StorageEvent("storage", { key }));
}
