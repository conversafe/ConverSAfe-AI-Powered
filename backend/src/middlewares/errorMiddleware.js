import { HTTP } from "../utils/httpConstants.js";

export const errorMiddleware = (err, req, res, next) => {
  if (process.env.ENVIRONMENT !== 'production') {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || HTTP.STATUS.INTERNAL_ERROR;
  const response = {
    message: err.message || HTTP.MESSAGE.INTERNAL_ERROR,
    ...(err.details && { errors: err.details })
  }

  res.status(statusCode).json({ error: response })
}