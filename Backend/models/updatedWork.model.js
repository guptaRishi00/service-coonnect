const mongoose = require("mongoose");
const { Schema } = mongoose;

const updatedWork = new Schema({
  worker_id: {
    type: String,
    ref: "User",
  },
  user_id: {
    type: String,
    ref: "User",
  },
  work_id: {
    type: String,
    ref: "workpost",
  },
});

const updatedWorkModel = mongoose.model("updatedWork", updatedWork);

module.exports = updatedWorkModel;
