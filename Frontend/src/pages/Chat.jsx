import React, { useState, useEffect } from "react";
import { PlusCircle, MoreVertical, Search, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ChatWindow from "./ChatWindow"; // Import the ChatWindow component

function Chat() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  const [conversation, setConversation] = useState([]);

  // Handle mobile view transitions
  useEffect(() => {
    if (selectedContact && window.innerWidth < 768) {
      setMobileSidebarOpen(false);
    }
  }, [selectedContact]);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
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

  useEffect(() => {
    const fetchConversation = async () => {
      const token = localStorage.getItem("token");
      try {
        const conversations = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/message/conversations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setConversation(conversations.data);
      } catch (error) {
        console.log("error:", error.message);
      }
    };
    fetchConversation();
  }, []);

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
              {conversation.map((contact) => (
                <motion.div
                  key={contact._id}
                  className={`
                    p-3 flex items-center cursor-pointer 
                    hover:bg-neutral-100 transition-colors group
                    ${
                      selectedContact?._id === contact._id
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
                      src="https://cdn.midjourney.com/6a1ea943-3d3c-4aac-9ab9-77d3193b6cba/0_0.png"
                      alt={contact.name}
                      className={`
                        w-12 h-12 rounded-full shadow-sm
                        ${
                          selectedContact?._id === contact._id
                            ? "ring-2 ring-[#FF8057]"
                            : ""
                        }
                      `}
                    />
                    <StatusBadge status={contact.status || "offline"} />
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
                          selectedContact?._id === contact._id
                            ? "text-[#FF8057]"
                            : "text-neutral-800"
                        } truncate`}
                      >
                        {contact.messages?.length > 0 &&
                        contact.messages[0]?.receiver_id
                          ? contact.messages[0].receiver_id.fullname.firstname
                          : "Unknown"}
                      </h3>
                      <span className="text-xs text-neutral-500 opacity-70 group-hover:opacity-100 transition-opacity">
                        {contact.lastMessageTime || "10:45 AM"}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 truncate">
                      {contact.lastMessage || "No messages yet"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window Component */}
      <ChatWindow
        selectedContact={selectedContact}
        toggleMobileSidebar={toggleMobileSidebar}
      />
    </div>
  );
}

export default Chat;
