const userModel = require("../models/user.model");
const workpostModel = require("../models/workpost.model");
const workerService = require("../services/worker.service");
const WorkerApplication = require("../models/wokerApplication.model");

const { validationResult } = require("express-validator");

module.exports.registerWorker = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, phone, address, profession } = req.body;

  const isWorkerAlreadyExists = await userModel.findOne({ email });

  if (isWorkerAlreadyExists) {
    return res.status(400).json({ message: "Worker Already exists" });
  }

  const hashPassword = await userModel.hashPassword(password);

  const worker = await workerService.createWorker(
    fullname.firstname,
    fullname.lastname,
    email,
    hashPassword,
    phone,
    "worker",
    address.street,
    address.city,
    address.state,
    address.zipcode,
    address.country,
    profession,
    "" // Image is empty for now
  );

  const token = await worker.generateAuthToken();

  res.cookie("token", token);

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

module.exports.searchWorks = async (req, res) => {
  try {
    const work = await workpostModel.find({});

    if (!work) {
      return res.status(404).json({ message: "No resource found" });
    }

    res.status(200).json({ work });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports.applyWork = async (req, res) => {
  const user = req.user;

  const { biddingPrice } = req.body;
  const work_id = req.params.id;

  if (!user) {
    return res.status(403).json({ message: "Unathorized" });
  }

  if (user.role != "worker") {
    return res.status(403).json({ message: "you are not a valid woker" });
  }

  try {
    const work = await workpostModel.findOne({ _id: work_id });

    if (!work) {
      throw new Error("No Work Found");
    }

    const application = await WorkerApplication.create({
      worker_id: user._id,
      work_id: work_id,
      user_id: work.user,
      biddingPrice,
    });

    res.status(200).json({ data: application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
