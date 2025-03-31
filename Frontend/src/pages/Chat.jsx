import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  Check,
  Video,
  Phone,
  PlusCircle,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage } from "../features/message/messageSlice";

const currentUser = {
  id: 1,
  name: "Alex Rivera",
  username: "@alexrivera",
  avatar: "/api/placeholder/50/50",
  status: "online",
  theme: "blue",
};

const mockContacts = [
  {
    id: 2,
    name: "Emma Chen",
    username: "@emmachen",
    avatar: "/api/placeholder/50/50",
    status: "online",
    lastMessage: "Presentation looks great!",
    unreadCount: 2,
    pinned: true,
  },
  {
    id: 3,
    name: "Marcus Wong",
    username: "@marcuswong",
    avatar: "/api/placeholder/50/50",
    status: "away",
    lastMessage: "Working on the project",
    unreadCount: 0,
    pinned: false,
  },
  {
    id: 4,
    name: "Sophia Patel",
    username: "@sophiapatel",
    avatar: "/api/placeholder/50/50",
    status: "offline",
    lastMessage: "Thanks for the update",
    unreadCount: 1,
    pinned: false,
  },
];

function Chat() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 2,
      text: "Hey, have you finished the quarterly report?",
      timestamp: "10:30 AM",
      status: "read",
      type: "text",
    },
    {
      id: 2,
      userId: 1,
      text: "Almost done. Just adding some final touches.",
      timestamp: "10:35 AM",
      status: "sent",
      type: "text",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-focus the message input when selecting a contact
  useEffect(() => {
    if (selectedContact && messageInputRef.current) {
      // Short delay to allow animations to complete
      setTimeout(() => {
        messageInputRef.current.focus();
      }, 300);
    }
  }, [selectedContact]);

  // Handle mobile view transitions
  useEffect(() => {
    if (selectedContact && window.innerWidth < 768) {
      setMobileSidebarOpen(false);
    }
  }, [selectedContact]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        userId: currentUser.id,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
        type: "text",
      };
      setMessages([...messages, message]);
      setNewMessage("");
      setShowEmojiPicker(false);

      // Auto-reply simulation (optional)
      if (selectedContact) {
        setTimeout(() => {
          const reply = {
            id: messages.length + 2,
            userId: selectedContact.id,
            text: getRandomReply(),
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "sent",
            type: "text",
          };
          setMessages((prev) => [...prev, reply]);
        }, 2000);
      }
    }
  };

  const getRandomReply = () => {
    const replies = [
      "That sounds good!",
      "I'll take a look at it.",
      "Let me get back to you on that.",
      "Perfect, thanks for the update.",
      "Can we discuss this further in our next meeting?",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const getSortedContacts = () => {
    return [
      ...mockContacts.filter((contact) => contact.pinned),
      ...mockContacts.filter((contact) => !contact.pinned),
    ];
  };

  const backToContactList = () => {
    setMobileSidebarOpen(true);
  };

  // Status badge component for consistent styling
  const StatusBadge = ({ status }) => {
    const colors = {
      online: "bg-emerald-500",
      away: "bg-yellow-500",
      offline: "bg-gray-400",
    };

    return (
      <span
        className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${colors[status]} ring-2 ring-white`}
      />
    );
  };

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    fetchMessage();
  }, [dispatch]);

  console.log(message);

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-white overflow-hidden">
      {/* Mobile Sidebar Toggle Button (visible when chat is open) */}
      {!mobileSidebarOpen && selectedContact && (
        <button
          onClick={backToContactList}
          className="md:hidden absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(mobileSidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            className="w-full md:w-80 bg-neutral-50 border-r border-neutral-200 flex flex-col md:relative absolute inset-0 z-10"
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* User Profile Header */}
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full ring-2 ring-[#FF8057]/30 shadow-sm"
                  />
                  <StatusBadge status={currentUser.status} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-neutral-800">
                    {currentUser.name}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {currentUser.username}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-2 text-neutral-500 hover:text-[#FF8057] hover:bg-neutral-100 rounded-full transition-colors">
                  <PlusCircle size={18} />
                </button>
                <button className="p-2 text-neutral-500 hover:text-[#FF8057] hover:bg-neutral-100 rounded-full transition-colors">
                  <MoreVertical size={18} />
                </button>
                {/* Mobile close button */}
                <button
                  className="md:hidden p-2 text-neutral-500 hover:text-[#FF8057] hover:bg-neutral-100 rounded-full transition-colors"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations"
                  className="w-full p-2.5 pl-9 text-sm bg-white border border-neutral-200 rounded-lg 
                            focus:ring-2 focus:ring-[#FF8057] focus:border-transparent focus:outline-none
                            transition-all duration-200"
                />
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
              </div>
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
              {getSortedContacts().map((contact) => (
                <motion.div
                  key={contact.id}
                  className={`
                    p-3 flex items-center cursor-pointer 
                    hover:bg-neutral-100 transition-colors group
                    ${
                      selectedContact?.id === contact.id
                        ? "bg-[#FF8057]/5 border-l-2 border-[#FF8057]"
                        : contact.pinned
                        ? "border-l-2 border-blue-400"
                        : ""
                    }
                  `}
                  onClick={() => {
                    setSelectedContact(contact);
                    if (window.innerWidth < 768) {
                      setMobileSidebarOpen(false);
                    }
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="relative mr-3">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className={`
                        w-12 h-12 rounded-full shadow-sm
                        ${
                          selectedContact?.id === contact.id
                            ? "ring-2 ring-[#FF8057]"
                            : ""
                        }
                      `}
                    />
                    <StatusBadge status={contact.status} />
                    {contact.unreadCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                                       rounded-full h-5 w-5 flex items-center justify-center
                                       border-2 border-white font-medium"
                      >
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3
                        className={`font-medium ${
                          selectedContact?.id === contact.id
                            ? "text-[#FF8057]"
                            : "text-neutral-800"
                        } truncate`}
                      >
                        {contact.name}
                      </h3>
                      <span className="text-xs text-neutral-500 opacity-70 group-hover:opacity-100 transition-opacity">
                        10:45 AM
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Mobile menu toggle (visible when sidebar is hidden) */}
                {!mobileSidebarOpen && (
                  <button
                    className="md:hidden p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors mr-1"
                    onClick={() => setMobileSidebarOpen(true)}
                  >
                    <Menu size={18} />
                  </button>
                )}

                <div className="relative">
                  <img
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                    className="w-10 h-10 rounded-full shadow-sm"
                  />
                  <StatusBadge status={selectedContact.status} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-neutral-800">
                    {selectedContact.name}
                  </h2>
                  <p className="text-xs text-neutral-500 capitalize">
                    {selectedContact.status} • {selectedContact.username}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-2 text-neutral-500 hover:text-[#FF8057] hover:bg-neutral-100 rounded-full transition-colors hidden sm:block">
                  <Phone size={18} />
                </button>
                <button className="p-2 text-neutral-500 hover:text-[#FF8057] hover:bg-neutral-100 rounded-full transition-colors hidden sm:block">
                  <Video size={18} />
                </button>
                <button className="p-2 text-neutral-500 hover:text-[#FF8057] hover:bg-neutral-100 rounded-full transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-neutral-50/30">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.userId === currentUser.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                  }}
                >
                  {/* Show avatar for received messages */}
                  {message.userId !== currentUser.id && (
                    <div className="mr-2 self-end mb-1 hidden sm:block">
                      <img
                        src={selectedContact.avatar}
                        alt={selectedContact.name}
                        className="w-6 h-6 rounded-full"
                      />
                    </div>
                  )}

                  <div
                    className={`
                      max-w-xs sm:max-w-md p-3 rounded-xl shadow-sm
                      ${
                        message.userId === currentUser.id
                          ? "bg-[#FF8057] text-white rounded-tr-none"
                          : "bg-white border border-neutral-200 text-neutral-800 rounded-tl-none"
                      }
                      transform transition-all hover:shadow-md
                    `}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <div className="flex justify-between items-center mt-1.5">
                      <span className="text-xs opacity-70">
                        {message.timestamp}
                      </span>
                      {message.userId === currentUser.id && (
                        <span className="text-xs opacity-70 ml-2">
                          {message.status === "sent" ? (
                            <Check size={14} className="inline" />
                          ) : (
                            <Check
                              size={14}
                              className="inline"
                              strokeWidth={3}
                            />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 sm:p-4 bg-neutral-50 border-t border-neutral-200">
              <div className="flex items-center space-x-2 bg-white rounded-xl p-2 border border-neutral-200 shadow-sm">
                <button className="p-2 text-neutral-500 hover:text-[#FF8057] rounded-full hover:bg-neutral-100 transition-colors hidden sm:block">
                  <Paperclip size={18} />
                </button>
                <button
                  className="p-2 text-neutral-500 hover:text-[#FF8057] rounded-full hover:bg-neutral-100 transition-colors"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-sm focus:outline-none px-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  ref={messageInputRef}
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="
                    bg-[#FF8057] text-white p-2 rounded-full 
                    hover:bg-[#E06847] transition-colors
                    flex items-center justify-center
                    disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-[#FF8057] focus:ring-offset-2
                  "
                  disabled={!newMessage.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-500 bg-white">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                <MoreVertical size={24} className="text-neutral-400" />
              </div>
              <h3 className="text-xl font-light mb-3">Select a conversation</h3>
              <p className="text-sm text-neutral-400">
                Choose a contact from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
