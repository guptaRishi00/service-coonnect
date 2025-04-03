const express = require("express");
const router = express.Router();

const { userAuthMiddleWare } = require("../middleware/userAuthMiddleWare");
const messageController = require("../controllers/message.controller");

router.get(
  "/conversations",
  userAuthMiddleWare,
  messageController.getAllConversation
);
router.post("/send/:id", userAuthMiddleWare, messageController.sendMessage);

router.get("/:id", userAuthMiddleWare, messageController.getMessages);

module.exports = router;
