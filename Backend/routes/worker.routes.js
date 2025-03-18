const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const workerController = require("../controllers/worker.controller");
const { userAuthMiddleWare } = require("../middleware/userAuthMiddleWare");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("fullname.firstname")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    body("fullname.lastname")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  workerController.registerWorker
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  workerController.workerLogin
);

router.get("/searchworks", workerController.searchWorks);

module.exports = router;
