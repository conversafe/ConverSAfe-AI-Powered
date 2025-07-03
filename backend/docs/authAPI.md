# 📚 API – Autenticación y Usuarios

> Todos los endpoints usan JSON y retornan respuestas estandarizadas.
> Para rutas protegidas, se requiere el header:
> `Authorization: Bearer <token>`

---

## 🔐 POST `/auth/register`

### 🎯 Registrar nuevo usuario

#### 📤 Body:

```json
{
  "name": "Richi",
  "email": "richi@mail.com",
  "password": "securepassword123",
  "role": "user" // o "admin"
}
```

> `role` debe ser uno de: `"admin"` o `"user"`

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

* `201 Created`: Registro exitoso
* `400 Bad Request`: Faltan campos obligatorios
* `409 Conflict`: Ya existe un usuario con ese email

---

## 🔐 POST `/auth/login`

### 🎯 Iniciar sesión

#### 📤 Body:

```json
{
  "email": "richi@mail.com",
  "password": "securepassword123"
}
```

#### ✅ Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "660fcf0c23ae3644b86dd610",
    "name": "Richi",
    "email": "richi@mail.com",
    "role": "user",
    "createdAt": "2025-07-03T14:22:00.000Z",
    "updatedAt": "2025-07-03T14:22:00.000Z"
  }
}
```

#### 🔁 Status:

* `200 OK`: Login correcto
* `401 Unauthorized`: Email o contraseña incorrectos

---

## ⚠️ Errores comunes

| Código | Significado                     |
| ------ | ------------------------------- |
| 400    | Datos incompletos o malformados |
| 401    | Credenciales inválidas          |
| 409    | Usuario ya existente            |
| 500    | Error interno del servidor      |

---

## 🧪 Reglas de validación

* Email debe ser único y válido.
* Password debe ser segura (mínimo recomendado: 6 caracteres).
* Roles válidos: `"admin"` o `"user"`.

---

## 📌 Notas técnicas

* El token JWT expira en 24 horas.
* El password se guarda **hasheado** con bcrypt y sal.
* El frontend debe guardar el token y enviarlo en cada request protegida.
* El endpoint de login devuelve todos los datos necesarios del usuario, sin la contraseña.
