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

const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await userModel
      .findByIdAndUpdate(userId, { role }, { new: true })
      .select("-password");

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

const updateWorkPostStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const { status } = req.body;

    const post = await workPostModel
      .findByIdAndUpdate(postId, { status }, { new: true })
      .populate("user", "fullname email");

    if (!post) {
      return res.status(404).json({
        error: true,
        message: "Work post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalWorkers = await userModel.countDocuments({ role: "worker" });
    const totalPosts = await workPostModel.countDocuments();
    const pendingPosts = await workPostModel.countDocuments({
      status: "pending",
    });
    const activePosts = await workPostModel.countDocuments({
      status: "accept",
    });

    res.status(200).json({
      totalUsers,
      totalWorkers,
      totalPosts,
      pendingPosts,
      activePosts,
    });
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
  updateUserStatus,
  updateWorkPostStatus,
  getDashboardStats,
};
