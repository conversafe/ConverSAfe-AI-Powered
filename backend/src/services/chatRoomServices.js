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
    .populate("sender", "name email")
    .lean();

  room.messages = messages.reverse();
  return room;
};

export const joinRoomByCode = async (accessCode, user) => {
  const room = await ChatRoom.findOne({ accessCode });
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