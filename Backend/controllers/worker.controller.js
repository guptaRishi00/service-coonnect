const userModel = require("../models/user.model");
const workerService = require("../services/worker.service");
const { validationResult } = require("express-validator");

module.exports.registerWorker = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, phone, address, profession, image } =
    req.body;

  const isWorkerAlreadyExists = await userModel.findOne({ email });

  if (isWorkerAlreadyExists) {
    return res.status(400).json({ message: "Worker Already exists" });
  }

  const hashPassword = await userModel.hashPassword(password);

  const worker = await workerService.createWorker({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    phone,
    role: "worker",
    street: address.street,
    city: address.city,
    state: address.state,
    zipcode: address.zipcode,
    country: address.country,
    profession,
    image,
  });

  const token = await worker.generateAuthToken();

  res.status(200).json({ token, worker });
};

module.exports.workerLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const worker = await userModel.findOne({ email }).select("+password");

  if (!worker) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await worker.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await worker.generateAuthToken();

  res.status(200).json({ token, worker });
};
