import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { HTTP } from "../utils/httpConstants.js";

const JWT_SECRET = process.env.JWT_SECRET || "Secret Key";

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = HTTP.STATUS.UNAUTHORIZED;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const error = new Error("Invalid email or password");
    error.statusCode = HTTP.STATUS.UNAUTHORIZED;
    throw error;
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "24h" });
  const { password: _, ...userData } = user.toObject();

  return {
    token,
    user: userData,
  };
};

export const register = async data => {
  const { email } = data;
  const exists = await User.findOne({ email });
  if (exists) {
    const error = new Error("User already exists");
    error.statusCode = HTTP.STATUS.CONFLICT;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user = await User.create({ ...data, password: hashedPassword });

  const { password: _, ...userData } = user.toObject();

  return userData;
};
