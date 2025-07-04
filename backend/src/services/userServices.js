import { User } from "../models/userModel.js";
import { HTTP } from "../utils/httpConstants.js";

export const deleteUser = async (userId, requestingUser) => {
  // Verificar que el usuario que hace la petición sea admin
  if (requestingUser.role !== "admin") {
    const error = new Error("Access denied: only admin can delete users");
    error.statusCode = HTTP.STATUS.FORBIDDEN;
    throw error;
  }

  // Buscar el usuario a eliminar
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = HTTP.STATUS.NOT_FOUND;
    throw error;
  }

  // Eliminar el usuario
  await User.findByIdAndDelete(userId);

  return {
    message: "User deleted successfully",
    deletedUser: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export const getUserById = async userId => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = HTTP.STATUS.NOT_FOUND;
    throw error;
  }

  const { password, ...userData } = user.toObject();
  return userData;
};

export const getAllUsers = async requestingUser => {
  // Solo admin puede ver todos los usuarios
  if (requestingUser.role !== "admin") {
    const error = new Error("Access denied: only admin can view all users");
    error.statusCode = HTTP.STATUS.FORBIDDEN;
    throw error;
  }

  const users = await User.find({}, { password: 0 });
  return users;
};
