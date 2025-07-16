import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMensajes, enviarMensaje } from "@/services/chatSimulado";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface ParticipanteData {
  nombre: string;
  email: string;
  cantidad: number;
  porcentaje: number;
}

interface Mensaje {
  autor: string;
  contenido: string;
  hora: string;
  rol: "Administrador" | "Usuario" | "IA";
  imagen?: string;
  email?: string;
}

const sugerencias = [
  "Anima a que todos participen.",
  "Evita interrupciones frecuentes.",
  "Haz una síntesis del tema tratado.",
  "Modera el tiempo de respuesta.",
  "Revisa si el objetivo está claro.",
  "Considera incluir a quienes han hablado poco.",
  "Pide retroalimentación antes de cerrar el tema.",
];

const obtenerColorParticipacion = (porcentaje: number) => {
  if (porcentaje >= 50) return "bg-green-100 text-green-800";
  if (porcentaje >= 20) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const PanelAsistenteIA = () => {
  const { id: roomId } = useParams();
  const [participantes, setParticipantes] = useState<ParticipanteData[]>([]);
  const [totalMensajes, setTotalMensajes] = useState(0);
  const [sugerencia, setSugerencia] = useState("");

  useEffect(() => {
    if (!roomId) return;

    const mensajesRaw = getMensajes(roomId);
    const mensajes: Mensaje[] = Array.isArray(mensajesRaw)
      ? mensajesRaw.filter((msg: any) => msg && msg.rol !== "IA")
      : [];

    const total = mensajes.length;
    setTotalMensajes(total);

    const conteo: Record<
      string,
      { nombre: string; email: string; cantidad: number }
    > = {};

    mensajes.forEach((msg) => {
      const key = msg.autor + (msg.email || "");
      if (!conteo[key]) {
        conteo[key] = {
          nombre: msg.autor,
          email: msg.email || "sin-email",
          cantidad: 1,
        };
      } else {
        conteo[key].cantidad += 1;
      }
    });

    const resultado = Object.values(conteo).map((p) => ({
      ...p,
      porcentaje: total > 0 ? Math.round((p.cantidad / total) * 100) : 0,
    }));

    setParticipantes(resultado);

    // 📣 Sugerencia y mensaje IA
    const sugerenciaSeleccionada =
      sugerencias[Math.floor(Math.random() * sugerencias.length)];

    setSugerencia(sugerenciaSeleccionada);

    const mensajeIA: Mensaje = {
      autor: "Asistente IA",
      rol: "IA",
      contenido: sugerenciaSeleccionada,
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    enviarMensaje(roomId, mensajeIA);
  }, [roomId]);

  return (
    <Card className="bg-white border-none shadow-none rounded-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#154EB4]">
            <Sparkles className="w-5 h-5" />
            <CardTitle className="text-xl font-semibold">
              Asistente IA
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto px-2 pb-4 flex flex-col gap-4">
        <ScrollArea className="h-full pr-2">
          <div className="flex flex-col gap-4">
            {/* Tarjeta de métricas generales */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm font-semibold mb-1 text-gray-700">
                Total de mensajes:{" "}
                <span className="font-bold">{totalMensajes}</span>
              </p>
              <p className="text-sm italic text-gray-600">{sugerencia}</p>
            </div>

            {/* Participantes */}
            {participantes.map((p, index) => (
              <div
                key={index}
                className="rounded-lg bg-white shadow-sm px-4 py-3 border border-gray-200"
              >
                <p className="font-semibold text-gray-800 mb-1">{p.nombre}</p>
                <div className="text-sm space-y-1">
                  <p className="text-gray-600">
                    Correo: <span className="font-medium">{p.email}</span>
                  </p>
                  <p className="text-gray-600">
                    Mensajes enviados:{" "}
                    <Badge
                      variant="outline"
                      className="text-blue-700 border-gray-300"
                    >
                      {p.cantidad}
                    </Badge>
                  </p>
                  <p className="text-gray-600">
                    Participación:{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${obtenerColorParticipacion(
                        p.porcentaje
                      )}`}
                    >
                      {p.porcentaje}%
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PanelAsistenteIA;
