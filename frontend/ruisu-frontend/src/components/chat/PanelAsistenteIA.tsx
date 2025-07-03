import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const PanelAsistenteIA = () => {
  const dataSimulada = [
    {
      nombre: "Carlos Ruiz",
      participacion: "Alta",
      enfoque: "Bueno",
      respuestas: "Rápidas",
    },
    {
      nombre: "Ana Torres",
      participacion: "Moderada",
      enfoque: "Disperso",
      respuestas: "Ocasionales",
    },
    {
      nombre: "IA",
      analisis:
        "Se detectó un posible malentendido entre usuarios a las 09:10.",
    },
  ];

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

      <CardContent className="flex-1 overflow-y-auto px-2 pb-4">
        <ScrollArea className="h-full pr-2 space-y-4">
          {dataSimulada.map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-white shadow-sm px-4 py-3 border border-gray-200"
            >
              <p className="font-semibold text-gray-800 mb-1">{item.nombre}</p>

              {"analisis" in item ? (
                <p className="text-gray-600 italic">{item.analisis}</p>
              ) : (
                <div className="text-sm space-y-1">
                  <p>
                    Participación:{" "}
                    <Badge
                      variant="outline"
                      className="text-blue-700 border-gray-300"
                    >
                      {item.participacion}
                    </Badge>
                  </p>
                  <p>
                    Enfoque:{" "}
                    <Badge
                      variant="outline"
                      className="text-blue-700 border-gray-300"
                    >
                      {item.enfoque}
                    </Badge>
                  </p>
                  <p>
                    Respuestas:{" "}
                    <Badge
                      variant="outline"
                      className="text-blue-700 border-gray-300"
                    >
                      {item.respuestas}
                    </Badge>
                  </p>
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PanelAsistenteIA;
