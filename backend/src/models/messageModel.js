import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    chatRoom: { 
      type: Schema.Types.ObjectId, 
      ref: "ChatRoom", 
      required: true 
    },
    sender: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    type: {
      type: String,
      enum: ["text", "action", "system"],
      default: "text",
    }
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);