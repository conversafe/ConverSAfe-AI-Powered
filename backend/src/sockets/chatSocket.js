const HISTORY_N_MSG = 30

export default async function registerChatSocket(io, socket) {
  socket.on("joinRoom", async ({ roomId }) => {
    const room = await ChatRoom.findById(roomId);
    if (!room) return socket.emit("chatError", "Room not found");

    const isMember = room.participants.includes(socket.user._id);
    if (!isMember) return socket.emit("chatError", "You are not member of this room");

    socket.join(roomId);
    console.log(`${socket.user.name} se unió a ${roomId}`);

    const messages = await Message.find({ chatRoom: roomId })
      .sort({ createdAt: -1 }) 
      .limit(HISTORY_N_MSG)
      .populate("sender", "name email")
      .lean();

    socket.emit("chatHistory", messages.reverse());
  });

  socket.on("sendMessage", async ({ roomId, content }) => {
    if (!roomId || !content?.trim()) {
      return socket.emit("chatError", "Invalid message payload");
    }

    const room = await ChatRoom.findById(roomId);
    if (!room) return socket.emit("chatError", "Room not found");

    const isMember = room.participants.includes(socket.user._id);
    if (!isMember) return socket.emit("chatError", "You are not member of this room");

    const message = await Message.create({
      chatRoom: roomId,
      sender: socket.user._id,
      content,
    });

    const populatedMsg = await Message.findById(message._id)
      .populate("sender", "name email");

    io.to(roomId).emit("newMessage", populatedMsg);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.user.name} disconnected`);
  });
}
