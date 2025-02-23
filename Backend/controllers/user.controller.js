const userModel = require("../models/user.model");
const workPostModel = require("../models/workpost.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const { uploadOnCloudinary } = require("../utils/cloudinary");

module.exports.userRegister = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, phone, address } = req.body;

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

module.exports.updateProfile = async (req, res) => {
  try {
    const { fullname, phone, address } = req.body;
    const user = req.user;

    // Check if user exists in the request (authentication must be successful)
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    // Handle profile image upload
    let profileImage = null;
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (!uploadResult) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      profileImage = uploadResult.secure_url;
    }

    // Update user profile
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          image: profileImage,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or update failed" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports.postWork = async (req, res) => {
  const { title, description, serviceType, location, budget } = req.body;

  const user = req.user;

  if (user.role != "user") {
    return res.status(403).json({ message: "you are not a valid user" });
  }

  const workLocalPath = req.file?.path;

  if (!workLocalPath) {
    return res.status(400).json({ error: "Work path is required" });
  }

  const workPicture = await uploadOnCloudinary(workLocalPath);

  if (!workPicture) {
    return res
      .status(400)
      .json({ error: "Failed to upload work to Cloudinary" });
  }

  try {
    const userid = req.user._id;

    const work = await workPostModel.create({
      title,
      description,
      serviceType,
      location,
      budget,
      user: userid,

      picture: workPicture.secure_url,
    });

    await work.save();
    res.status(201).json(work);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.myWorks = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({ message: "Invalid User" });
  }

  try {
    const work = await workPostModel.find({ user: user._id });

    if (!work) {
      return res.status(404).json({ message: "No resource found" });
    }

    res.status(200).json({ work });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
