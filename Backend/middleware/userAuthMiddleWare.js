const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.userAuthMiddleWare = async (req, res, next) => {
  let token = req.headers["authorization"] || req.cookies.token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (req.headers.cookie) {
    token = req.headers.cookie.split("=")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );

    req.user = user;
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
