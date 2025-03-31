const mongoose = require("mongoose");
const { Schema } = mongoose;

const workerApplicationSchema = new Schema(
  {
    worker_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    work_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "workpost",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    biddingPrice: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const WorkerApplication = mongoose.model(
  "WorkerApplication",
  workerApplicationSchema
);

module.exports = WorkerApplication;
