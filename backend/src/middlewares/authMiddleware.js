import passport from "passport";
import { HTTP } from "../utils/httpConstants.js";

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log(err);
    
    if (err) return next(err);
    if (!user) {
      const error = new Error("Missing or invalid token");
      error.statusCode = HTTP.STATUS.UNAUTHORIZED;
      return next(error);
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authMiddleware;
