# 📊 API – Métricas de ChatRoom

### 🔐 Requiere autenticación (`Authorization: Bearer <token>`)

---

## 📌 GET `/chatrooms/:id/metrics`

### 🎯 Devuelve métricas de participación de una sala específica.

---

### 🔒 Requisitos:

* El usuario autenticado debe ser el **admin de la sala**.
* Si no lo es, devuelve **403 Forbidden**.

---

### 🧾 Request:

```http
GET /chatrooms/660fcf2923ae3644b86dd611/metrics
Authorization: Bearer <JWT>
```

---

### ✅ Response `200 OK`:

```json
{
  "roomId": "660fcf2923ae3644b86dd611",
  "roomName": "Sprint Planning",
  "admin": {
    "_id": "660fcf0c23ae3644b86dd610",
    "name": "Richi",
    "email": "richi@mail.com"
  },
  "totalMessages": 20,
  "participants": [
    {
      "_id": "660fcf0c23ae3644b86dd610",
      "name": "Richi",
      "email": "richi@mail.com",
      "messagesSent": 12,
      "participation": "60.00%"
    },
    {
      "_id": "6610aa1c45f56a44cd9e11f7",
      "name": "Anita",
      "email": "anita@equipo.com",
      "messagesSent": 8,
      "participation": "40.00%"
    }
  ]
}
```

---

### ❌ Posibles errores:

| Código | Causa                                           | Ejemplo de mensaje                                |
| ------ | ----------------------------------------------- | ------------------------------------------------- |
| 404    | Sala no encontrada                              | `"Room not found"`                                |
| 403    | Usuario no es el admin de la sala               | `"You must be admin of this room to see metrics"` |
| 500    | Error interno del servidor al calcular métricas | `"Internal error during getting metrics: ..."`    |

---

### 🧠 Detalles técnicos:

* Calcula la cantidad total de mensajes en la sala.
* Para cada participante:

  * Muestra nombre, email, cantidad de mensajes enviados y porcentaje de participación.
* Los porcentajes se calculan sobre el total de mensajes.
* No se incluye el historial de mensajes.
