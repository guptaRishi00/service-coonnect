const userModel = require("../models/user.model");

module.exports.getUsers = async (req, res) => {
  try {
    const response = await userModel.find({});

    if (!response) {
      throw new Error("Something went wrong");
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};
