const { mongoose } = require("mongoose");
const conversationModel = require("../models/conversation.model");
const messageModel = require("../models/message.model");

module.exports.sendMessage = async (req, res) => {
  const user = req.user;
  const receiver = req.params.id;
  const { message } = req.body;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!receiver) {
    return res.status(400).json({ error: "Receiver not found" });
  }

  try {
    const sender = user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [sender, receiver],
        messages: [],
      });
    }

    const newMessage = await messageModel.create({
      sender_id: sender,
      receiver_id: receiver,
      message: message,
    });

    if (!conversation) {
      return res
        .status(500)
        .json({ error: "Failed to create or fetch conversation" });
    }

    if (!conversation.messages) {
      conversation.messages = [];
    }

    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports.getMessages = async (req, res) => {
  const receiverId = req.params.id;
  const senderId = req.user._id;

  if (!senderId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  try {
    const conversations = await conversationModel
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate({
        path: "messages",
        populate: {
          path: "receiver_id",
        },
      });

    if (!conversations || conversations.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getAllConversation = async (req, res) => {
  console.log("✅ getAllConversation function called!"); // Debugging line

  try {
    const user = req.user; // Ensure user is available
    if (!user || !user._id) {
      return res.status(400).json({ error: "User not found" });
    }

    const allConversations = await conversationModel
      .find({ participants: user._id })
      .populate({ path: "messages", populate: { path: "receiver_id" } });

    console.log("✅ Conversations found:", allConversations.length);

    res.status(200).json(allConversations);
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
