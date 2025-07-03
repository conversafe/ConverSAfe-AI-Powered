import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const USER_ROLES = ["admin", "user"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: USER_ROLES,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
