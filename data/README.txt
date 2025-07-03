Servicio de Análisis de Conversaciones con FastAPI y Gemini
Este repositorio contiene un servicio web desarrollado con FastAPI que utiliza el modelo de lenguaje Gemini 1.5 Flash para analizar conversaciones de equipos de desarrollo. El servicio está diseñado para identificar y extraer información clave como bloqueadores técnicos, cuellos de botella, riesgos del proyecto y otros conceptos relevantes para la gestión de proyectos.

Descripción
La aplicación expone un endpoint POST que recibe una conversación en formato JSON. El servicio procesa esta conversación, la envía a la API de Gemini con un prompt específico para análisis, y devuelve un JSON estructurado con el resultado del análisis. Este resultado incluye métricas sobre la participación de los usuarios, el estado del equipo, decisiones pendientes y conceptos detectados.

Características
Análisis de Conversaciones: Utiliza IA para extraer información relevante de chats de equipo.

Detección de Conceptos Clave: Identifica bloqueadores, riesgos, decisiones, hitos, etc.

Métricas de Usuario y Equipo: Proporciona datos sobre la participación individual y el estado general del equipo (colaboración, rendimiento, actividad).

Formato de Salida Estructurado: Devuelve los resultados en un formato JSON fácil de consumir.

Integración con Gemini API: Aprovecha las capacidades avanzadas del modelo gemini-1.5-flash.

Basado en FastAPI: Ofrece una API moderna, rápida y con documentación automática (Swagger UI/ReDoc).

Configuración
Para ejecutar este servicio, necesitarás Python 3.9+ y una clave de API de Google Gemini.

1. Clonar el Repositorio
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>

2. Instalar Dependencias
pip install -r requirements.txt
