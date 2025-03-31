const mongoose = require("mongoose");
const { Schema } = mongoose;

const workPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  budget: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  picture: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["accept", "pending", "rejected"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("workpost", workPostSchema);
