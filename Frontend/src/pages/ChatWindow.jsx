// ChatWindow.jsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage, sendMessage } from "../features/message/messageSlice";
import { AnimatePresence, motion } from "motion/react";
import { IoIosArrowRoundForward, IoMdArrowBack } from "react-icons/io";
import {
  HiOutlineEmojiHappy,
  HiOutlinePaperClip,
  HiOutlinePhotograph,
} from "react-icons/hi";

function ChatWindow({ receiver, onBack, isMobile = false }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Get messages from Redux state
  const messages = useSelector((state) => state.message.messages);
  const currentUser = useSelector((state) => state.authUser);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (receiver) {
      dispatch(fetchMessage(receiver));
    }

    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [dispatch, receiver]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate "is typing" indicator
  const handleTyping = () => {
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Randomly show typing indicator (for demo purposes)
    if (Math.random() > 0.7) {
      setIsTyping(true);

      // Clear typing indicator after some time
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await dispatch(
        sendMessage({ receiverId: receiver, message: text })
      ).unwrap();
      setText("");
      setIsTyping(false);

      // Refocus input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Group messages by date
  const groupedMessages = messages?.reduce((groups, message) => {
    const date = message.createdAt
      ? new Date(message.createdAt).toLocaleDateString()
      : "Unknown";
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  // Format time from timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-white p-4 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoMdArrowBack className="text-xl" />
            </button>
          )}

          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#FF8057] text-white flex items-center justify-center">
              <span>R</span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">Recipient Name</h2>
              <div className="flex gap-2">
                {/* Call/Video icons could go here */}
              </div>
            </div>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        <AnimatePresence>
          {messages && messages.length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedMessages || {}).map(([date, msgs]) => (
                <div key={date} className="space-y-4">
                  <div className="flex justify-center">
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                      {date === new Date().toLocaleDateString()
                        ? "Today"
                        : date}
                    </span>
                  </div>

                  {msgs.map((msg, index) => {
                    const isMine = msg.sender === currentUser?._id;
                    const showAvatar =
                      index === 0 || msgs[index - 1]?.sender !== msg.sender;

                    return (
                      <motion.div
                        key={msg._id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${
                          isMine ? "justify-end" : "justify-start"
                        } items-end gap-2`}
                      >
                        {!isMine && showAvatar ? (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-sm">
                            R
                          </div>
                        ) : !isMine ? (
                          <div className="w-8 flex-shrink-0"></div>
                        ) : null}

                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                            isMine
                              ? "bg-gradient-to-r from-[#FF8057] to-[#FF976C] text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">
                            {msg.message}
                          </p>
                          <p
                            className={`text-xs mt-1 text-right ${
                              isMine ? "text-orange-100" : "text-gray-400"
                            }`}
                          >
                            {formatTime(msg.createdAt)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start items-end gap-2 mt-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-sm">
                    R
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 italic text-sm text-center">
                No messages yet. Start a conversation!
                <br />
                Say hello to begin chatting.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <HiOutlineEmojiHappy className="text-xl" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <HiOutlinePaperClip className="text-xl" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <HiOutlinePhotograph className="text-xl" />
            </button>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-grow px-4 py-3 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8057] transition-all"
          />

          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className={`group flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-all duration-300 ${
              text.trim()
                ? "bg-[#FF8057] hover:bg-[#ff6a3d]"
                : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <IoIosArrowRoundForward
              className={`text-2xl transition-transform duration-300 group-hover:translate-x-1 ${
                text.trim() ? "text-white" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
