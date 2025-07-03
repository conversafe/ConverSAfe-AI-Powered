import { ChatRoom } from "../models/chatRoomModel.js";
import { Message } from "../models/messageModel.js";
import { HTTP } from "../utils/httpConstants.js";

export const getRoomMetrics = async (roomId, userId) => {
  const room = await ChatRoom.findById(roomId)
    .populate("participants", "name email")
    .populate("admin", "name email")
    .lean();

  if (!room) {
    const error = new Error("Room not found");
    error.statusCode = HTTP.STATUS.NOT_FOUND;
    throw error;
  }
  if (room.admin._id !== userId) {
    const error = new Error(
      "You must be admin of this room to see the metrics"
    );
    error.statusCode = HTTP.STATUS.FORBIDDEN;
    throw error;
  }

  const messages = await Message.find({ chatRoom: roomId })
    .populate("sender", "name email")
    .lean();

  const totalMessages = messages.length;

  const messageCountByUser = {};
  for (const msg of messages) {
    const senderId = msg.sender._id.toString();
    if (!messageCountByUser[senderId]) {
      messageCountByUser[senderId] = {
        count: 0,
        name: msg.sender.name,
        email: msg.sender.email,
      };
    }
    messageCountByUser[senderId].count += 1;
  }

  const participantMetrics = room.participants.map((user) => {
    const userId = user._id.toString();
    const count = messageCountByUser[userId]?.count || 0;
    const percentage =
      totalMessages > 0 ? ((count / totalMessages) * 100).toFixed(2) : "0.00";

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      messagesSent: count,
      participation: `${percentage}%`,
    };
  });

  return {
    roomId: room._id,
    roomName: room.name,
    admin: room.admin,
    totalMessages,
    participants: participantMetrics,
  };
};
