# Como conectarse al websocket del chat desde el Frontend

1. Conectarse al WebSocket con autenticación
2. Unirse a una sala
3. Escuchar nuevos mensajes
4. Enviar mensajes
5. Manejar errores

---

## ✅ 1. Instalación
```bash
npm install socket.io-client
```

Agregá la variable al archivo .env
```env
VITE_SOCKET_URL=http://localhost:3000
```

En Vite (o Create React App), todas las variables deben empezar con VITE_ (o REACT_APP_) para que se incluyan en el bundle del cliente.

---

## ✅ 2. Conexión con autenticación (token en el `handshake`)


```js
import { io } from "socket.io-client";

// Guardás el token de login
const token = localStorage.getItem("token"); // o donde lo tengas guardado

// Inicializás la conexión
const socket = io( import.meta.env.VITE_SOCKET_URL, {
  auth: { token }, // pasa el token en el handshake
});

// Manejo de errores en la conexión
socket.on("connect_error", (err) => {
  console.error("❌ Error de conexión:", err.message);
});
```

---

## ✅ 3. Unirse a una sala

```js
function joinRoom(roomId) {
  socket.emit("joinRoom", { roomId });
}
```

## ✅ 4. Recibir Historial del chat

```js
socket.on("chatHistory", (msgs) => {
  console.log("🕘 Historial:", msgs);
  // Setealo en el estado inicial de tus mensajes
  setMessages(msgs); // Si usás useState
});
```

---

## ✅ 5. Escuchar nuevos mensajes

```js
socket.on("newMessage", (msg) => {
  console.log("📩 Mensaje recibido:", msg);
  // Acá podrías hacer setMessages([...messages, msg]) o lo que uses
});
```

---

## ✅ 6. Enviar mensajes

```js
function sendMessage(roomId, content) {
  socket.emit("sendMessage", {
    roomId,
    content,
  });
}
```

---

## ✅ 7. Manejar errores desde el backend

```js
socket.on("chatError", (msg) => {
  console.warn("⚠️ Error desde el server:", msg);
  // Mostralo en la UI como toast, alert o mensaje en pantalla
});
```

---

## 🧪 Ejemplo completo (React-style)

```js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  auth: { token: localStorage.getItem("token") },
});

function Chat({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chatError", (msg) => alert(msg));

    return () => {
      socket.off("newMessage");
      socket.off("chatError");
    };
  }, [roomId]);

  const handleSend = () => {
    if (input.trim()) {
      socket.emit("sendMessage", { roomId, content: input });
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.sender?.name || "Anon"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribí un mensaje"
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
}
```
