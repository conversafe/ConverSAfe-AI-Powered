# Data (FastAPI + Gemini)

Este servicio expone una API para analizar conversaciones usando FastAPI y el modelo Gemini de Google.

## 🚀 Desarrollo con Compose

La forma recomendada de trabajar es levantar MongoDB y el backend con Docker Compose, y ejecutar el servicio de data en modo desarrollo local para aprovechar el hot reload.

### 1. Levanta los servicios auxiliares con Compose

Desde la raíz del proyecto, ejecuta:

```bash
docker compose -f compose.backend.yml up -d
```

Esto levantará MongoDB y el backend en contenedores.

### 2. Ejecuta el servicio de data en local

En otra terminal:

```bash
cd data
pip install -r requirements.txt
GEMINI_API_KEY=tu_clave uvicorn chat_analyzer_api.main:app --host 0.0.0.0 --port 8000 --reload
```

La API estará disponible en [http://localhost:8000/docs](http://localhost:8000/docs) y el backend levantado por Compose podrá conectarse a este servicio.

## ⚙️ Variables de entorno

- `GEMINI_API_KEY`: Clave de API de Google Gemini

## 📝 Notas

- Puedes personalizar el archivo Compose para tu flujo de trabajo.
- Si quieres levantar todo el stack en contenedores, usa `compose.full.yml`.
