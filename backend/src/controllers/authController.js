import * as authServices from "../services/authServices.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authServices.login(email, password);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const user = await authServices.register(req.body);
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
