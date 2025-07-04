import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatRoomSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    admin: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    accessCode: { 
      type: String, 
      required: true, 
      unique: true 
    }, 
    participants: [{ 
      type: Schema.Types.ObjectId, 
      ref: "User" 
    }],
  },
  { timestamps: true }
);

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
