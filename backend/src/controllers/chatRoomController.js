import { HTTP } from "../utils/httpConstants.js";
import * as chatRoomServices from "../services/chatRoomServices.js";

export const createChatRoom = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      const error = new Error("Name is required");
      error.statusCode = HTTP.STATUS.BAD_REQUEST;
      throw error;
    }

    const room = await chatRoomServices.createRoom(name, req.user);

    res.status(201).json({
      message: "Room created",
      roomId: room._id,
      accessCode: room.accessCode,
    });
  } catch (err) {
    const error = new Error(`Error creating room: ${err.message}`);
    error.statusCode = HTTP.STATUS.INTERNAL_ERROR;
    return next(error);
  }
};

export const viewChatRoom = async (req, res, next) => {
  try {
    const room = await chatRoomServices.getRoomById(req.params.id);

    if (!room) {
      const error = new Error("Room not found");
      error.statusCode = HTTP.STATUS.NOT_FOUND;
      return next(error);
    }

    res.status(200).json(room);
  } catch (err) {
    const error = new Error(`Error fetching room: ${err.message}`);
    error.statusCode = HTTP.STATUS.INTERNAL_ERROR;
    return next(error);
  }
};

export const joinChatRoom = async (req, res, next) => {
  try {
    const { accessCode } = req.body;
    if (!accessCode) {
      const error = new Error("Access Code is required");
      error.statusCode = HTTP.STATUS.BAD_REQUEST;
      throw error;
    }

    const room = await chatRoomServices.joinRoomByCode(accessCode, req.user);

    if (!room) {
      const error = new Error("Room not found with that code");
      error.statusCode = HTTP.STATUS.NOT_FOUND;
      return next(error);
    }

    res.status(200).json({ message: "Joined room", roomId: room._id });
  } catch (err) {
    const error = new Error(`Error joining room: ${err.message}`);
    error.statusCode = HTTP.STATUS.INTERNAL_ERROR;
    return next(error);
  }
};
