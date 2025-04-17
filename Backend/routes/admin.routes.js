const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { userAuthMiddleWare } = require("../middleware/userAuthMiddleWare");

// User management
router.get("/users", userAuthMiddleWare, adminController.getUsers);
router.get("/workers", userAuthMiddleWare, adminController.getWorkers);
router.get("/workpost", userAuthMiddleWare, adminController.getWorkPost);

module.exports = router;
