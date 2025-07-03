import { HTTP } from "../utils/httpConstants.js";
import * as metricsServices from "../services/metricsServices.js";

export const roomMetrics = async (req, res, next) => {
  try {
    const roomId = req.params.id
    const userId = req.user._id
    const metrics = await metricsServices.getRoomMetrics(roomId, userId)

    res.status(200).json(metrics);
  } catch (err) {
    const error = new Error(`Error getting room metrics: ${err.message}`);
    error.statusCode = err.statusCode || HTTP.STATUS.INTERNAL_ERROR;
    next(error);
  }
};
