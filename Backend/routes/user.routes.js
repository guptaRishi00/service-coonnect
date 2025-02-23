const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const { userAuthMiddleWare } = require("../middleware/userAuthMiddleWare");
const { upload } = require("../middleware/multer.middleware");

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
  userController.userRegister
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.userLogin
);

router.get("/profile", userAuthMiddleWare, userController.userProfile);

router.get("/my-works", userAuthMiddleWare, userController.myWorks);

router.post(
  "/postwork",
  userAuthMiddleWare,
  upload.single("picture"),
  userController.postWork
);

router.patch(
  "/updateprofile",
  userAuthMiddleWare,
  upload.single("profilepicture"),
  userController.updateProfile
);

module.exports = router;
