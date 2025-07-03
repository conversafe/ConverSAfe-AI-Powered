# -*- coding: utf-8 -*-
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import json
from typing import List
import os

# Inicialización de FastAPI
app = FastAPI()


# Configuración segura de la API de Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

# Modelos de entrada en snake_case
class Mensaje(BaseModel):
    usuario: str
    texto: str
    marca_de_tiempo: str

class Conversacion(BaseModel):
    mensajes: List[Mensaje]

@app.get("/")
def read_root():
    return {"status": "Chat Analysis Service is running"}

@app.post("/analizar_conversacion")
def analizar_conversacion(conversacion: Conversacion):
    try:
        # Preparar conversación en formato texto
        mensajes_json = [mensaje.dict() for mensaje in conversacion.mensajes]

        data_de_mensaje = ""
        for msg in mensajes_json:
            data_de_mensaje += f"[{msg['usuario']}]: {msg['texto']} ({msg['marca_de_tiempo']})\n"


        prompt = f"""
        Eres un asistente de IA que analiza la comunicación en equipos de desarrollo.

        Conceptos a detectar:
        1. Bloqueadores técnicos.
        2. Cuellos de botella.
        3. Riesgos del proyecto.
        4. Decisiones clave.
        5. Requisitos cambiantes.
        6. Hitos y plazos.
        7. Necesidades de recursos.
        8. Dependencias entre tareas.

        Restricciones:
        - No inventes información.
        - No des opiniones.
        - Arrays vacíos deben ser [].
        - Usa snake_case.
        - No uses saltos de línea innecesarios.
        - Responde SOLO con el JSON, sin texto adicional.
        - El resumen general no debe exceder 50 palabras.
        - Feedback breve: una oración por concepto.

        Para cada usuario:
        - nombre: nombre del usuario.
        - participacion: porcentaje de participación como número entero (ej: 30).
        - eficacia_comunicacion: "alta", "media" o "baja".
        - comentario_eficacia: breve (ej: "Alex es moderadamente claro.").
        - enfoque_conversacion: "enfocado" o "desviado".
        - comentario_enfoque: breve (ej: "Se ciñe al tema cuando participa.").

        Para el equipo:
        - nivel_conflicto_colaboracion: porcentaje numérico (ej: 75 para 75% colaboración).
        - estado_actual: "conflictivo" o "colaborador".
        - rendimiento_laboral: porcentaje numérico (ej: 80).
        - valoracion_rendimiento: "Bajo", "Medio" o "Alto".
        - actividad:
            - miembros_activos: cantidad de usuarios que participaron.
            - mensajes_de_hoy: cantidad total de mensajes.
            - valoracion_actividad: "Actividad baja", "Actividad media", "Actividad alta".

        Decisiones pendientes:
        - Lista con decisiones mencionadas pero no resueltas.
        - Ejemplos: "Confirmación de la línea de tiempo", "Cuello de botella en la entrega de paquetes", "Asignar a un responsable para el frontend".

        Formato de respuesta:
        ```json
        {{
            "usuarios": [
                {{
                    "nombre": "string",
                    "participacion": 0,
                    "eficacia_comunicacion": "string",
                    "comentario_eficacia": "string",
                    "enfoque_conversacion": "string",
                    "comentario_enfoque": "string"
                }}
            ],
            "equipo": {{
                "nivel_conflicto_colaboracion": 0,
                "estado_actual": "string",
                "rendimiento_laboral": 0,
                "valoracion_rendimiento": "string",
                "actividad": {{
                    "miembros_activos": 0,
                    "mensajes_de_hoy": 0,
                    "valoracion_actividad": "string"
                }}
            }},
            "decisiones_pendientes": [
                "string"
            ],
            "conceptos_detectados": {{
                "bloqueadores_tecnicos": ["string"],
                "cuellos_de_botella": ["string"],
                "riesgos_proyecto": ["string"],
                "decisiones_clave": ["string"],
                "requisitos_cambiantes": ["string"],
                "hitos_plazos": ["string"],
                "necesidades_recursos": ["string"],
                "dependencias_tareas": ["string"]
            }},
            "feedback_asistente": [
                {{
                    "tipo_concepto": "string",
                    "mensaje": "string"
                }}
            ],
            "resumen_general": "string"
        }}
        ```

        Conversación a analizar:
        {conversation_text}
        """

        # Llamada a Gemini
        response = model.generate_content(prompt)
        response_text = response.text.strip()

        # Extracción del JSON
        if "```json" in response_text:
            start_idx = response_text.find("```json") + len("```json")
            end_idx = response_text.rfind("```")
            json_str = response_text[start_idx:end_idx].strip()
        else:
            # Si no hay delimitadores, la respuesta entera es el JSON
            json_str = response_text

        # Validación básica de formato JSON
        try:
            resultado_analisis = json.loads(json_str)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="El modelo no devolvió un JSON válido.")

        # NOTA PARA BACKEND:
        #    Guardar el resultado en base de datos.
        #     conexión:
        #       - Atributos de Usuarios y equipo
        #       - Conceptos para la lista del dashboard
        #       - Conceptos para el feedback
        #    Los datos Importantes están escritos en español

        return resultado_analisis

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar la conversación: {str(e)}")
