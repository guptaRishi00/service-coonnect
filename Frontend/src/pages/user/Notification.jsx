import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  CheckCircle,
  XCircle,
  UserCircle2,
  Bell,
  ImageIcon,
  Link,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ notification, onRefresh, onChatNavigate }) => {
  const [status, setStatus] = useState(notification.status || "pending");
  const [isProcessing, setIsProcessing] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleAction = async (actionType) => {
    setIsProcessing(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/user/workAcceptOrReject/${
          notification._id
        }`,
        {},
        {
          params: { applicationStatus: actionType },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setStatus(actionType);

        if (actionType === "accepted") {
          setTimeout(() => {
            onChatNavigate({
              userId: notification.worker_id?._id,
              userName: notification.worker_id?.fullname?.firstname,
            });
          }, 1500);
        }

        onRefresh();
      }
    } catch (error) {
      console.error(`Error ${actionType} notification:`, error.message);
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Work Image */}
      <div className="h-48 w-full overflow-hidden relative">
        {notification.work_id?.picture ? (
          <img
            src={notification.work_id.picture}
            alt="Work"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <ImageIcon className="text-gray-400" size={48} />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-4">
        {/* Work Details */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {notification.work_id?.title || "Untitled Work"}
          </h3>
          <p className="text-sm text-gray-500 flex items-center">
            <span className="mr-2">Budget:</span>
            <span className="font-semibold text-indigo-600">
              ₹{notification.work_id?.budget || "Not specified"}
            </span>
          </p>
        </div>

        {/* Worker Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {notification.worker_id?.fullname?.firstname?.[0] || "?"}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              {notification.worker_id?.fullname?.firstname || "Unknown"}
            </h4>
            <p className="text-xs text-gray-500">
              {notification.worker_id?.email || "No email"}
            </p>
          </div>
        </div>

        {/* Bidding Price */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">
            Bidding Price:{" "}
            <span className="text-indigo-600 font-bold">
              ₹{notification.biddingPrice}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {status === "accepted" ? (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => navigate("/chat")}
                className="w-10 h-10 bg-green-500 text-white rounded-full
                  flex items-center justify-center
                  hover:bg-green-600
                  transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.button>
            ) : status === "rejected" ? (
              <div className="text-red-500 flex items-center space-x-1">
                <XCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Rejected</span>
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction("accepted")}
                  disabled={isProcessing}
                  className="w-10 h-10 bg-green-500 text-white rounded-full
                    flex items-center justify-center
                    hover:bg-green-600
                    transition-all
                    disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction("rejected")}
                  disabled={isProcessing}
                  className="w-10 h-10 bg-red-500 text-white rounded-full
                    flex items-center justify-center
                    hover:bg-red-600
                    transition-all
                    disabled:opacity-50"
                >
                  <XCircle className="w-5 h-5" />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/workRequestNotification`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const notificationData = response.data.data;
      setNotifications(
        Array.isArray(notificationData)
          ? notificationData
          : notificationData
          ? [notificationData]
          : []
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError(error.message);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatNavigation = (chatInfo) => {
    console.log("Navigating to chat with:", chatInfo);
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center justify-center">
            <Bell className="mr-4 text-blue-600" size={40} />
            Notifications
          </h1>
          <p className="text-xl text-gray-600">
            Review and manage your work notifications
          </p>
        </div>

        {notifications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  onRefresh={fetchNotifications}
                  onChatNavigate={handleChatNavigation}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-lg"
          >
            <UserCircle2 className="mx-auto mb-6 text-gray-400" size={64} />
            <p className="text-2xl font-semibold text-gray-700">
              No new notifications
            </p>
            <p className="text-gray-500 mt-2">
              You're all caught up! Check back later.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Notification;
