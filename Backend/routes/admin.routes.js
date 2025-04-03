const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// Dashboard statistics
router.get("/stats", adminController.getDashboardStats);

// User management
router.get("/users", adminController.getUsers);
router.patch("/users/:userId/status", adminController.updateUserStatus);

// Work post management
router.get("/workposts", adminController.getWorkPosts);
router.patch("/workposts/:postId/status", adminController.updateWorkPostStatus);

module.exports = router;
