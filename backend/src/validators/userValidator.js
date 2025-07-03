import { param } from "express-validator";
import mongoose from "mongoose";

export const userIdValidation = [
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid user ID format");
      }
      return true;
    }),
];
