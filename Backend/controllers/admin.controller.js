const userModel = require("../models/user.model");
const workPostModel = require("../models/workpost.model");

const getUsers = async (req, res) => {
  try {
    const response = await userModel.find({}).select("-password");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

const getWorkPosts = async (req, res) => {
  try {
    const response = await workPostModel
      .find({})
      .populate("user", "fullname email");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

const getWorkers = async (req, res) => {
  try {
    const response = await userModel
      .find({ role: "worker" })
      .select("-password");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};
const getWorkPost = async (req, res) => {
  try {
    const response = await workPostModel
      .find({})
      .select("-password")
      .populate("user");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getUsers,
  getWorkPosts,
  getWorkers,
  getWorkPost,
};
