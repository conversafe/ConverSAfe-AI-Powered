# 📚 API – Gestión de Usuarios

> Todos los endpoints usan JSON y retornan respuestas estandarizadas.
> Para rutas protegidas, se requiere el header:
> `Authorization: Bearer <token>`

---

## 👤 GET `/user/profile`

### 🎯 Obtener perfil del usuario autenticado

#### 🔐 Autenticación: Requerida

#### ✅ Response:

```json
{
  "_id": "660fcf0c23ae3644b86dd610",
  "name": "Richi",
  "email": "richi@mail.com",
  "role": "user",
  "createdAt": "2025-07-03T14:22:00.000Z",
  "updatedAt": "2025-07-03T14:22:00.000Z",
  "__v": 0
}
```

#### 🔁 Status:

- `200 OK`: Perfil obtenido exitosamente
- `401 Unauthorized`: Token inválido o ausente

---

## 👥 GET `/user/`

### 🎯 Obtener todos los usuarios

#### 🔐 Autenticación: Requerida (Solo Admin)

#### ✅ Response:

```json
[
  {
    "_id": "660fcf0c23ae3644b86dd610",
    "name": "Richi",
    "email": "richi@mail.com",
    "role": "user",
    "createdAt": "2025-07-03T14:22:00.000Z",
    "updatedAt": "2025-07-03T14:22:00.000Z",
    "__v": 0
  },
  {
    "_id": "660fcf0c23ae3644b86dd611",
    "name": "Ana",
    "email": "ana@mail.com",
    "role": "admin",
    "createdAt": "2025-07-03T14:25:00.000Z",
    "updatedAt": "2025-07-03T14:25:00.000Z",
    "__v": 0
  }
]
```

#### 🔁 Status:

- `200 OK`: Lista obtenida exitosamente
- `401 Unauthorized`: Token inválido o ausente
- `403 Forbidden`: Usuario no tiene permisos de admin

---

## 👤 GET `/user/:userId`

### 🎯 Obtener usuario por ID

#### 🔐 Autenticación: Requerida (Solo Admin)

#### 📤 Parámetros:

- `userId` (string): ID del usuario a obtener

#### ✅ Response:

```json
{
  "_id": "660fcf0c23ae3644b86dd610",
  "name": "Richi",
  "email": "richi@mail.com",
  "role": "user",
  "createdAt": "2025-07-03T14:22:00.000Z",
  "updatedAt": "2025-07-03T14:22:00.000Z",
  "__v": 0
}
```

#### 🔁 Status:

- `200 OK`: Usuario obtenido exitosamente
- `400 Bad Request`: ID de usuario inválido
- `401 Unauthorized`: Token inválido o ausente
- `403 Forbidden`: Usuario no tiene permisos de admin
- `404 Not Found`: Usuario no encontrado

---

## 🗑️ DELETE `/user/:userId`

### 🎯 Eliminar usuario

#### 🔐 Autenticación: Requerida (Solo Admin)

#### 📤 Parámetros:

- `userId` (string): ID del usuario a eliminar

#### ✅ Response:

```json
{
  "message": "User deleted successfully",
  "deletedUser": {
    "id": "660fcf0c23ae3644b86dd610",
    "name": "Richi",
    "email": "richi@mail.com"
  }
}
```

#### 🔁 Status:

- `200 OK`: Usuario eliminado exitosamente
- `400 Bad Request`: ID de usuario inválido o intento de auto-eliminación
- `401 Unauthorized`: Token inválido o ausente
- `403 Forbidden`: Usuario no tiene permisos de admin
- `404 Not Found`: Usuario no encontrado

---

## ⚠️ Errores comunes

| Código | Significado                     |
| ------ | ------------------------------- |
| 400    | Datos incompletos o malformados |
| 401    | Token inválido o ausente        |
| 403    | Permisos insuficientes          |
| 404    | Usuario no encontrado           |
| 500    | Error interno del servidor      |

---

## 🧪 Reglas de validación

- **userId**: Debe ser un ObjectId válido de MongoDB
- **Permisos**: Solo usuarios con rol `admin` pueden acceder a endpoints de gestión
- **Auto-eliminación**: Un admin no puede eliminarse a sí mismo

---

## 📌 Notas técnicas

- Todos los endpoints devuelven los datos del usuario **sin la contraseña**
- El endpoint de eliminación es irreversible
- Los tokens JWT deben ser válidos y no expirados
- La validación de permisos se realiza en el servidor

---

## 🔒 Seguridad

- **Autorización**: Middleware de roles verifica permisos
- **Validación**: Parámetros validados antes del procesamiento
- **Protección**: Los admins no pueden auto-eliminarse para evitar bloqueos del sistema
