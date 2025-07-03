import { HTTP } from "../utils/httpConstants.js";

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error("User not authenticated");
      error.statusCode = HTTP.STATUS.UNAUTHORIZED;
      return next(error);
    }
    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error("Access denied: insufficient permissions");
      error.statusCode = HTTP.STATUS.FORBIDDEN;
      return next(error);
    }
    next();
  };
};