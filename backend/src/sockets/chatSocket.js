import axios from "axios";
import { ChatRoom } from "../models/chatRoomModel.js";
import { Message } from "../models/messageModel.js";

export default async function registerChatSocket(io, socket) {
  socket.on("joinRoom", async ({ roomId }) => {
    console.log("WS: joinRoom");

    const room = await ChatRoom.findById(roomId);
    if (!room) return socket.emit("chatError", "Room not found");

    const isMember = room.participants.includes(socket.user._id);
    if (!isMember)
      return socket.emit("chatError", "You are not member of this room");

    socket.join(roomId);
    console.log(`${socket.user.name} se unió a ${roomId}`);
  });

  socket.on("sendMessage", async ({ roomId, content }) => {
    console.log("WS: sendMessage");
    
    if (!roomId || !content?.trim()) {
      return socket.emit("chatError", "Invalid message payload");
    }

    const room = await ChatRoom.findById(roomId);
    if (!room) return socket.emit("chatError", "Room not found");

    const isMember = room.participants.includes(socket.user._id);
    if (!isMember)
      return socket.emit("chatError", "You are not member of this room");

    const message = await Message.create({
      chatRoom: roomId,
      sender: socket.user._id,
      content,
    });

    const populatedMsg = await Message.findById(message._id).populate(
      "sender",
      "name email"
    );

    io.to(roomId).emit("newMessage", populatedMsg);

    //Enviar a la IA y guardar la métrica
    try {
      const response = await axios.post(
        `${process.env.AI_URL}/analizar_mensaje`,
        {
          usuario: socket.user.name,
          email: socket.user.email,
          roomId: roomId,
          texto: content,
          marca_de_tiempo: message.createdAt,
        }
      );

      await processMetrics(roomId, response.data);

    } catch (err) {
      console.error("Error with AI analysis:", err.message);
      socket.emit("chatError", "Error analysing conversation");
    }
  });

  socket.on("disconnect", () => {
    console.log("WS: disconnect");
    console.log(`${socket.user.name} disconnected`);
  });
}
