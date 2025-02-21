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
    type: String,
    ref: "Employer",
  },
  picture: {
    type: String,
    required: true,
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
