import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  SendHorizonal,
  MoreVertical,
  PlusCircle,
  Paperclip,
  Mic,
  Smile,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage, sendMessage } from "../features/message/messageSlice";

function ChatWindow({ selectedContact, currentUser, toggleMobileSidebar }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const { messages, status } = useSelector((state) => state.message);

  // Fetch messages when selected contact changes
  useEffect(() => {
    if (selectedContact) {
      dispatch(fetchMessage(selectedContact._id));
    }
  }, [selectedContact, dispatch]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() && selectedContact) {
      dispatch(
        sendMessage({
          receiverId: selectedContact._id,
          message: newMessage.trim(),
        })
      );

      setNewMessage("");
    }
  };

  // If no contact is selected, show empty state
  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-neutral-50">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send size={24} className="text-neutral-400" />
          </div>
          <h3 className="text-xl font-medium text-neutral-700">
            Your Messages
          </h3>
          <p className="text-neutral-500 mt-2 max-w-sm">
            Select a conversation or start a new one to begin messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center">
          <div className="relative mr-3">
            <img
              src="https://cdn.midjourney.com/6a1ea943-3d3c-4aac-9ab9-77d3193b6cba/0_0.png"
              alt={selectedContact.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div>
            <h2 className="font-medium text-neutral-800">
              {selectedContact.messages?.length > 0 &&
              selectedContact.messages[0]?.receiver_id
                ? selectedContact.messages[0].receiver_id.fullname.firstname
                : "Unknown"}
            </h2>
            <p className="text-xs text-neutral-500">Active now</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
          <MoreVertical size={20} className="text-neutral-600" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-neutral-50">
        {status === "loading" && messages.length === 0 ? (
          <div className="flex justify-center py-4">
            <div className="animate-pulse flex space-x-4">
              <div className="h-3 w-3 bg-neutral-300 rounded-full"></div>
              <div className="h-3 w-3 bg-neutral-300 rounded-full"></div>
              <div className="h-3 w-3 bg-neutral-300 rounded-full"></div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-6 text-neutral-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => {
            const isCurrentUser =
              msg.sender_id === currentUser.id ||
              (msg.sender_id &&
                msg.sender_id._id === localStorage.getItem("userId"));

            return (
              <div
                key={msg._id || index}
                className={`mb-4 flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isCurrentUser && (
                  <div className="mr-2 flex-shrink-0">
                    <img
                      src="https://cdn.midjourney.com/6a1ea943-3d3c-4aac-9ab9-77d3193b6cba/0_0.png"
                      alt="Contact"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
                    isCurrentUser
                      ? "bg-[#FF8057] text-white rounded-br-none"
                      : "bg-white text-neutral-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="text-sm">{msg.message || msg.text}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      isCurrentUser ? "text-white/70" : "text-neutral-500"
                    }`}
                  >
                    {msg.timestamp || "Just now"}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="px-4 py-3 border-t border-neutral-200 bg-white"
      >
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500"
          >
            <PlusCircle size={20} />
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 py-2 px-3 mx-2 rounded-full bg-neutral-100 
              focus:outline-none focus:ring-2 focus:ring-[#FF8057] 
              text-neutral-800 placeholder:text-neutral-500"
          />
          {newMessage.trim() ? (
            <motion.button
              type="submit"
              className="p-2 rounded-full bg-[#FF8057] text-white hover:bg-[#F0704E] transition-colors"
              whileTap={{ scale: 0.95 }}
              disabled={status === "loading"}
            >
              <SendHorizonal size={20} />
            </motion.button>
          ) : (
            <>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500"
              >
                <Mic size={20} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500"
              >
                <Smile size={20} />
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;
