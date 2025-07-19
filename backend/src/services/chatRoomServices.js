import { v4 as uuidv4 } from "uuid";
import { ChatRoom } from "../models/chatRoomModel.js";
import { Message } from "../models/messageModel.js";

const HISTORY_N_MSG = 50

export const createRoom = async (name, user) => {
  const accessCode = uuidv4().split("-")[0];
  const room = await ChatRoom.create({
    name,
    admin: user._id,
    participants: [user._id],
    accessCode,
  });
  return room;
};

export const getRoomById = async (roomId) => {
  const room = await ChatRoom.findById(roomId)
    .populate("participants", "name email")
    .populate("admin", "name email");

  if (!room) return null;

  const messages = await Message.find({ chatRoom: roomId })
    .sort({ createdAt: -1 })
    .limit(HISTORY_N_MSG)
    .populate("sender", "name email role")
    .lean();

  // Map messages to frontend format
  const mappedMessages = messages.reverse().map((msg) => ({
    contenido: msg.content,
    autor: msg.sender?.name || "",
    autorId: msg.sender?._id?.toString() || "",
    hora: msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "",
    imagen: undefined, // No image field in User or Message
    rol: msg.sender?.role === "admin" ? "Administrador" : "Usuario",
  }));

  // Compose response in frontend format
  return {
    id: room._id.toString(),
    name: room.name,
    creador: room.admin?.name || "",
    creadorEmail: room.admin?.email || "",
    adminId: room.admin?._id?.toString() || "",
    messages: mappedMessages,
    participants: room.participants.map((p) => ({
      id: p._id?.toString() || p.toString(),
      name: p.name || "",
      email: p.email || "",
      rol: p.role === "admin" ? "Administrador" : "Usuario",
    })),
  };
};

export const joinRoomByCode = async (accessCode, user) => {
  const room = await ChatRoom.findById(accessCode);
  if (!room) return null;

  const alreadyInRoom = room.participants.includes(user._id);
  if (!alreadyInRoom) {
    room.participants.push(user._id);
    await room.save();
  }

  return room;
};

export const getRoomsByUser = async (userId) => {
  const rooms = await ChatRoom.find({
    $or: [
      { admin: userId },
      { participants: userId }
    ]
  })
    .populate("admin", "name email")
    .lean();

  return rooms;
};