import * as userServices from "../services/userServices.js";
import { HTTP } from "../utils/httpConstants.js";

export const userProfile = async (req, res, next) => {
  try {
    const { password, ...userData } = req.user;
    return res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUser(userId, req.user);
    return res.status(HTTP.STATUS.OK).json(result);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userServices.getUserById(userId);
    return res.status(HTTP.STATUS.OK).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userServices.getAllUsers(req.user);
    return res.status(HTTP.STATUS.OK).json(users);
  } catch (err) {
    next(err);
  }
};
