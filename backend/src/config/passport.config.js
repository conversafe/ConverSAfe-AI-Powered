import passport from "passport";
import jwt from "passport-jwt";
import { User } from "../models/userModel.js";

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

export const initializePassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          console.log(process.env.JWT_SECRET);
          console.log(jwt_payload);
          
          const user = await User.findById(jwt_payload._id);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
