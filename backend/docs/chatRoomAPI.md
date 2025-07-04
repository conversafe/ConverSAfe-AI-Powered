## 📚 API – ChatRooms

### 🔒 Todos los endpoints requieren autenticación por token (`Authorization: Bearer <token>`).

---

## 🛠 POST `/chatrooms/`

### 🎯 Crear una nueva sala de chat

**Solo usuarios con rol `admin`.**

#### 🔐 Middleware:

* `authMiddleware`
* `roleMiddleware("admin")`

#### 📤 Body:

```json
{
  "name": "Sprint Planning"
}
```

#### ✅ Response:

```json
{
  "message": "Room created",
  "roomId": "660fcf2923ae3644b86dd611",
  "accessCode": "3e4a12bd"
}
```

#### 🔁 Status:

* `201 Created`: Sala creada
* `400 Bad Request`: Falta el nombre
* `403 Forbidden`: El usuario no es admin
* `500 Internal Server Error`: Fallo del servidor

---

## 🔍 GET `/chatrooms/:id`

### 🎯 Obtener datos de una sala por su ID

**Debe ser miembro de la sala o admin.**

#### 📥 Params:

* `id`: ID de la sala (`Mongo ObjectId`)

#### ✅ Response:

```json
{
  "_id": "660fcf2923ae3644b86dd611",
  "name": "Sprint Planning",
  "admin": {
    "_id": "660fcf0c23ae3644b86dd610",
    "name": "Richi",
    "email": "richi@mail.com"
  },
  "participants": [
    {
      "_id": "660fcf0c23ae3644b86dd610",
      "name": "Richi",
      "email": "richi@mail.com"
    },
    {
      "_id": "6610aa1c45f56a44cd9e11f7",
      "name": "Anita",
      "email": "anita@equipo.com"
    }
  ],
  "accessCode": "3e4a12bd",
  "messages": [
    {
      "_id": "6610f92bfa4c22337d8f70c1",
      "sender": {
        "_id": "660fcf0c23ae3644b86dd610",
        "name": "Richi",
        "email": "richi@mail.com"
      },
      "content": "Arrancamos el sprint?",
      "createdAt": "2025-07-03T19:15:45.123Z"
    },
    {
      "_id": "6610f92dfa4c22337d8f70c2",
      "sender": {
        "_id": "6610aa1c45f56a44cd9e11f7",
        "name": "Anita",
        "email": "anita@equipo.com"
      },
      "content": "Sí, tengo todo listo.",
      "createdAt": "2025-07-03T19:16:01.000Z"
    }
  ],
  "createdAt": "2025-07-03T14:28:00.000Z"
}
```

#### 🔁 Status:

* `200 OK`: Sala encontrada
* `404 Not Found`: ID inválido o sala no existe
* `500 Internal Server Error`: Error al buscar

---

## 🤝 POST `/chatrooms/join`

### 🎯 Unirse a una sala mediante `accessCode`

**Cualquier usuario autenticado.**

#### 📤 Body:

```json
{
  "accessCode": "3e4a12bd"
}
```

#### ✅ Response:

```json
{
  "message": "Joined room",
  "roomId": "660fcf2923ae3644b86dd611"
}
```

#### 🔁 Status:

* `200 OK`: Te uniste correctamente
* `400 Bad Request`: Falta el código
* `404 Not Found`: Código inválido o sala no existe
* `500 Internal Server Error`: Error general

---

## 🔥 GET `/chatrooms/member`

### 🎯 Obtener todas las salas donde el usuario autenticado es participante o admin

#### 🔐 Middleware:

* `authMiddleware`

#### ✅ Response:

```json
[
  {
    "_id": "660fcf2923ae3644b86dd611",
    "name": "Sprint Planning",
    "admin": {
      "_id": "660fcf0c23ae3644b86dd610",
      "name": "Richi",
      "email": "richi@mail.com"
    },
    "accessCode": "3e4a12bd",
    "createdAt": "2025-07-03T14:28:00.000Z"
  }
]
```

#### 🔁 Status:

* `200 OK`: Listado correcto
* `500 Internal Server Error`: Fallo al buscar las salas

---


## 📌 Notas técnicas

* El campo `accessCode` es un UUID corto, generado automáticamente al crear la sala.
* El creador (`admin`) es automáticamente agregado como participante.
* El acceso al endpoint `GET /chatrooms/:id` debería incluir lógica en el service para validar si el usuario es **admin o miembro** (esto aún no está en tu código, pero es recomendable agregarlo si querés restringirlo).

---

