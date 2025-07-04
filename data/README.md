# 🧠 Servicio de Análisis de Conversaciones con FastAPI y Gemini

Este repositorio contiene un servicio web desarrollado con **FastAPI** que utiliza el modelo de lenguaje **Gemini 1.5 Flash** para analizar conversaciones de equipos de desarrollo.
El objetivo es identificar y extraer información clave como:

- 🧱 Bloqueadores técnicos
- ⏳ Cuellos de botella
- ⚠️ Riesgos del proyecto
- 🗂️ Otros conceptos relevantes para la gestión de proyectos

---

## 📌 Descripción

La aplicación expone un endpoint `POST` que recibe una conversación en formato JSON.
El flujo es el siguiente:

1. El servicio procesa la conversación.
2. La envía a la API de Gemini junto con un prompt especializado.
3. Devuelve un JSON estructurado con el resultado del análisis.

Este resultado incluye:

- Métricas sobre la participación de los usuarios.
- Estado general del equipo.
- Decisiones pendientes.
- Conceptos relevantes detectados.

---

## ✨ Características

- **Análisis de Conversaciones**: Utiliza IA para extraer información clave desde chats de equipo.
- **Detección de Conceptos Clave**: Identifica bloqueadores, riesgos, decisiones, hitos, etc.
- **Métricas de Usuario y Equipo**: Datos sobre participación individual y salud del equipo (colaboración, actividad, rendimiento).
- **Formato de Salida Estructurado**: Resultados en JSON de fácil consumo.
- **Integración con Gemini API**: Potencia del modelo `gemini-1.5-flash`.
- **Basado en FastAPI**: API moderna, rápida y con documentación automática (Swagger UI / ReDoc).

---

## ⚙️ Configuración

Para ejecutar este servicio necesitarás:

- Python 3.9+
- Una clave de API de Google Gemini

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

### 2. Instalar Dependencias

```bash
pip install -r requirements.txt
```
