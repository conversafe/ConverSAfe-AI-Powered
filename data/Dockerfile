# Dockerfile para servicio Python (data)
FROM python:3.10
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["uvicorn", "chat_analyzer_api.chat_insights_api:app", "--host", "0.0.0.0", "--port", "8000"] 