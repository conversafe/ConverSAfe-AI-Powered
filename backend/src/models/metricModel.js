import mongoose from "mongoose";

const Schema = mongoose.Schema;

const metricSchema = new Schema(
  {
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    metrics: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export const Metric = mongoose.model("Metric", metricSchema);
