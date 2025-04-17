import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../features/message/messageSlice";
import { AnimatePresence, motion } from "framer-motion";
import { MdArrowOutward, MdSearch } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuBell } from "react-icons/lu";
import ChatWindow from "./ChatWindow";

function Chat() {
  const dispatch = useDispatch();
  const { conversations, loading } = useSelector((state) => state.message);
  const [activeReceiver, setActiveReceiver] = useState(null);
  const [name, setName] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const handleSelectConversation = (participantId, name) => {
    setActiveReceiver(participantId);
    setName(name);
  };

  // Current date formatter for header
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  // Filter conversations based on search query
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim() || !conversations) return conversations;

    return conversations.filter((conversation) =>
      conversation.participants?.some((participant) =>
        participant.fullname?.firstname
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [conversations, searchQuery]);

  return (
    <div className="w-full h-[640px] ">
      {" "}
      {/* Adjusted height */}
      <div className="flex flex-col h-full">
        {/* Messages header */}

        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-100 flex flex-col">
            {/* Search bar */}
            <div className="px-4 py-2">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8057] transition-all"
                />
              </div>
            </div>

            {/* Conversation list with height adjustment */}
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
              <AnimatePresence>
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-pulse flex flex-col space-y-4 w-full px-4 py-8">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                          <div className="flex-1">
                            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : filteredConversations?.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-500 text-sm">
                      No conversations found
                    </p>
                  </div>
                ) : (
                  filteredConversations?.map((conversation) => (
                    <motion.div
                      key={conversation._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-gray-100 last:border-none"
                    >
                      {conversation?.participants?.map((participant) => {
                        const isActive = activeReceiver === participant._id;
                        const firstName =
                          participant.fullname?.firstname || "Unknown";
                        const initial = firstName
                          ? firstName.charAt(0).toUpperCase()
                          : "?";

                        return (
                          <div
                            key={participant._id}
                            onClick={() =>
                              handleSelectConversation(
                                participant._id,
                                participant.fullname?.firstname
                              )
                            }
                            className={`p-4 cursor-pointer group transition-all duration-300 ${
                              isActive ? "bg-gray-50" : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    isActive
                                      ? "bg-[#FF8057] text-white"
                                      : "bg-gray-100 text-gray-700 group-hover:bg-[#FF8057]/10 group-hover:text-[#FF8057]"
                                  } transition-all duration-300 text-lg font-medium`}
                                >
                                  {initial}
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <p
                                    className={`font-medium ${
                                      isActive
                                        ? "text-[#FF8057]"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {firstName}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    2m ago
                                  </p>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                  {conversation.lastMessage ||
                                    "Start a conversation..."}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right chat window */}
          <div className="hidden md:block md:w-2/3 lg:w-3/4">
            {activeReceiver ? (
              <ChatWindow receiver={activeReceiver} name={name} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF8057] to-pink-500 flex items-center justify-center mb-6 shadow-lg">
                  <MdArrowOutward className="text-3xl text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#FF8057] to-pink-500 bg-clip-text text-transparent">
                  Your Messages
                </h2>
                <p className="text-gray-500 mb-6 max-w-md">
                  Select a conversation from the list to start chatting or
                  create a new message
                </p>
                <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full group hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg">
                  <span>New Message</span>
                  <IoIosArrowRoundForward className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile view when a chat is selected */}
      <AnimatePresence>
        {activeReceiver && (
          <motion.div
            className="md:hidden fixed inset-0 bg-white z-50 mt-16"
            style={{ height: "calc(100% - 4rem)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <ChatWindow
              receiver={activeReceiver}
              onBack={() => setActiveReceiver(null)}
              isMobile={true}
              name={name}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chat;
