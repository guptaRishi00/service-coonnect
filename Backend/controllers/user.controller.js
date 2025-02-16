const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.userRegister = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, phone, address, image } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User Already exists" });
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.registerUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    role: "user",
    phone,
    street: address.street,
    city: address.city,
    state: address.state,
    zipcode: address.zipcode,
    country: address.country,
    image,
  });

  const token = await user.generateAuthToken();

  res.status(200).json({ token, user });
};

module.exports.userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

module.exports.userProfile = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "No User Found" });
  }

  try {
    const response = await userModel.findOne({ _id: user._id });

    if (!response) {
      return res.status(401).json({ message: "No User Found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
