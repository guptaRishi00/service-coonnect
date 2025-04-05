import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser, logout } from "../../features/auth/UserAuthSlice";
import { motion } from "framer-motion";
import { FaUser, FaAddressCard, FaTools, FaSignOutAlt } from "react-icons/fa";
import { MdSettings, MdEdit, MdSecurity } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { BiLink } from "react-icons/bi";

function UserProfile() {
  const { user } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    profession: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.fullname?.firstname || "",
        lastname: user.fullname?.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        profession: user.profession || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipcode: user.address?.zipcode || "",
        country: user.address?.country || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedUser = {
        ...user,
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        phone: formData.phone,
        profession: formData.profession,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          country: formData.country,
        },
      };
      dispatch({ type: "UPDATE_USER", payload: updatedUser });
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/home");
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#09101c] to-[#111827]">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "settings", label: "Settings", icon: MdSettings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09101c] to-[#111827] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <span className="bg-gradient-to-r from-[#232C39] to-[#2A3441] rounded-full px-6 py-2 text-white font-medium text-sm md:text-base shadow-lg">
            User Dashboard
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold text-center leading-tight">
            Welcome back,
            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              {user.user.fullname?.firstname || "User"}
            </span>
          </h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="bg-gradient-to-b from-[#1C1F2A] to-[#151821] rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="relative h-40 md:h-48 bg-gradient-to-r from-blue-600 to-purple-700">
            <div className="absolute -bottom-16 left-8 flex items-end">
              <div className="h-32 w-32 rounded-full border-4 border-[#1C1F2A] overflow-hidden bg-[#1C1F2A] shadow-lg">
                {user.user.image ? (
                  <img
                    src={user.user.image}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    fill="#555"
                    viewBox="0 0 24 24"
                    className="h-full w-full"
                  >
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                  </svg>
                )}
              </div>
              <div className="ml-6 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {user.user.fullname?.firstname || ""}{" "}
                  {user.user.fullname?.lastname || ""}
                </h2>
                <p className="text-blue-200">
                  {user.user.profession || "Professional"}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                  isEditing
                    ? "bg-white text-blue-700"
                    : "bg-blue-500 hover:bg-blue-400 text-white"
                } transition-all duration-300`}
              >
                <MdEdit className="text-lg" />
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-medium flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="pt-20 px-8">
            <div className="flex space-x-4 border-b border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-blue-300"
                  }`}
                >
                  <tab.icon className="text-lg" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activeTab === "profile" && (
              <div>
                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-[#232C39] to-[#1E2430] p-6"
                    >
                      <div className="flex items-center mb-4">
                        <FaUser className="text-2xl text-blue-400 mr-3" />
                        <h3 className="text-lg font-semibold text-white">
                          Personal Information
                        </h3>
                      </div>
                      <div className="space-y-4 relative z-10">
                        <div className="w-full ">
                          <p className="text-sm text-gray-400">Full Name</p>
                          <p className="font-medium text-white">
                            {user.user.fullname?.firstname || ""}{" "}
                            {user.user.fullname?.lastname || ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="font-medium text-white">
                            {user.user.email || ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <p className="font-medium text-white">
                            {user.user.phone || "Not provided"}
                          </p>
                        </div>
                      </div>
                      {/* Gradient effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                      {/* Corner accent */}
                      <div className="absolute -top-1 -right-1 w-16 h-16 opacity-20 bg-blue-400 rounded-full blur-xl" />
                    </motion.div>

                    {/* Professional Info Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-[#232C39] to-[#1E2430] p-6"
                    >
                      <div className="flex items-center mb-4">
                        <FaTools className="text-2xl text-purple-400 mr-3" />
                        <h3 className="text-lg font-semibold text-white">
                          Professional Details
                        </h3>
                      </div>
                      <div className="space-y-4 relative z-10">
                        <div>
                          <p className="text-sm text-gray-400">Profession</p>
                          <p className="font-medium text-white">
                            {user.user.profession || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Role</p>
                          <p className="font-medium text-white capitalize">
                            {user.user.role || ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Member Since</p>
                          <p className="font-medium text-white">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {/* Gradient effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                      {/* Corner accent */}
                      <div className="absolute -top-1 -right-1 w-16 h-16 opacity-20 bg-purple-400 rounded-full blur-xl" />
                    </motion.div>

                    {/* Address Info Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="md:col-span-2 group relative overflow-hidden rounded-xl bg-gradient-to-b from-[#232C39] to-[#1E2430] p-6"
                    >
                      <div className="flex items-center mb-4">
                        <FaAddressCard className="text-2xl text-green-400 mr-3" />
                        <h3 className="text-lg font-semibold text-white">
                          Address Information
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                        <div>
                          <p className="text-sm text-gray-400">
                            Street Address
                          </p>
                          <p className="font-medium text-white">
                            {user.user.address?.street || "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">City, State</p>
                          <p className="font-medium text-white">
                            {user.user.address?.city || ""}
                            {user.user.address?.city && user.user.address?.state
                              ? ", "
                              : ""}
                            {user.user.address?.state || ""}
                            {!user.user.address?.city &&
                              !user.user.address?.state &&
                              "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Country, Zip</p>
                          <p className="font-medium text-white">
                            {user.address?.country || ""}
                            {user.address?.country && user.address?.zipcode
                              ? ", "
                              : ""}
                            {user.address?.zipcode || ""}
                            {!user.address?.country &&
                              !user.address?.zipcode &&
                              "Not provided"}
                          </p>
                        </div>
                      </div>
                      {/* Gradient effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                      {/* Corner accent */}
                      <div className="absolute -top-1 -right-1 w-16 h-16 opacity-20 bg-green-400 rounded-full blur-xl" />
                    </motion.div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Info Edit */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#232C39] to-[#1E2430] p-6"
                      >
                        <div className="flex items-center mb-4">
                          <FaUser className="text-2xl text-blue-400 mr-3" />
                          <h3 className="text-lg font-semibold text-white">
                            Personal Information
                          </h3>
                        </div>
                        <div className="space-y-4 relative z-10">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="firstname"
                              value={formData.firstname}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#1a1d25] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="lastname"
                              value={formData.lastname}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#1a1d25] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Email (read-only)
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              readOnly
                              className="w-full px-3 py-2 bg-[#16181e] text-gray-400 border border-gray-600 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#1a1d25] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                        {/* Corner accent */}
                        <div className="absolute -top-1 -right-1 w-16 h-16 opacity-20 bg-blue-400 rounded-full blur-xl" />
                      </motion.div>

                      {/* Professional Info Edit */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#232C39] to-[#1E2430] p-6"
                      >
                        <div className="flex items-center mb-4">
                          <FaTools className="text-2xl text-purple-400 mr-3" />
                          <h3 className="text-lg font-semibold text-white">
                            Professional Details
                          </h3>
                        </div>
                        <div className="space-y-4 relative z-10">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Profession
                            </label>
                            <input
                              type="text"
                              name="profession"
                              value={formData.profession}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#1a1d25] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Role (read-only)
                            </label>
                            <input
                              type="text"
                              value={user.user.role || ""}
                              readOnly
                              className="w-full px-3 py-2 bg-[#16181e] text-gray-400 border border-gray-600 rounded-lg capitalize"
                            />
                          </div>
                        </div>
                        {/* Corner accent */}
                        <div className="absolute -top-1 -right-1 w-16 h-16 opacity-20 bg-purple-400 rounded-full blur-xl" />
                      </motion.div>

                      {/* Address Info Edit */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="md:col-span-2 relative overflow-hidden rounded-xl bg-gradient-to-b from-[#232C39] to-[#1E2430] p-6"
                      >
                        <div className="flex items-center mb-4">
                          <FaAddressCard className="text-2xl text-green-400 mr-3" />
                          <h3 className="text-lg font-semibold text-white">
                            Address Information
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Street Address
                            </label>
                            <input
                              type="text"
                              name="street"
                              value={formData.street}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#1a1d25] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#1a1d25] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#1a1d25] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Zipcode
                            </label>
                            <input
                              type="text"
                              name="zipcode"
                              value={formData.zipcode}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#1a1d25] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Country
                            </label>
                            <input
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#1a1d25] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                        {/* Corner accent */}
                        <div className="absolute -top-1 -right-1 w-16 h-16 opacity-20 bg-green-400 rounded-full blur-xl" />
                      </motion.div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg"
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="max-w-3xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl font-bold text-white mb-6"
                >
                  Account Settings
                </motion.h2>

                <div className="space-y-4">
                  {/* Settings Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="group relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-gradient-to-b from-[#232C39] to-[#1E2430] rounded-xl"
                  >
                    <div className="flex items-center">
                      <MdSecurity className="text-3xl text-blue-400 mr-3" />
                      <div>
                        <h3 className="font-medium text-white">Password</h3>
                        <p className="text-sm text-gray-400">
                          Update your password or enable two-factor
                          authentication
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm transition-all duration-300"
                    >
                      Change Password
                    </motion.button>
                    {/* Gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="group relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-gradient-to-b from-[#232C39] to-[#1E2430] rounded-xl"
                  >
                    <div className="flex items-center">
                      <IoNotifications className="text-3xl text-purple-400 mr-3" />
                      <div>
                        <h3 className="font-medium text-white">
                          Notifications
                        </h3>
                        <p className="text-sm text-gray-400">
                          Configure how and when you receive notifications
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 sm:mt-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium text-sm transition-all duration-300"
                    >
                      Configure
                    </motion.button>
                    {/* Gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="group relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-gradient-to-b from-[#232C39] to-[#1E2430] rounded-xl"
                  >
                    <div className="flex items-center">
                      <MdSettings className="text-3xl text-green-400 mr-3" />
                      <div>
                        <h3 className="font-medium text-white">
                          Privacy & Data
                        </h3>
                        <p className="text-sm text-gray-400">
                          Control your data visibility and sharing preferences
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 sm:mt-0 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium text-sm transition-all duration-300"
                    >
                      Manage
                    </motion.button>
                    {/* Gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="group relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-gradient-to-b from-[#232C39] to-[#1E2430] rounded-xl"
                  >
                    <div className="flex items-center">
                      <BiLink className="text-3xl text-yellow-400 mr-3" />
                      <div>
                        <h3 className="font-medium text-white">
                          Connected Accounts
                        </h3>
                        <p className="text-sm text-gray-400">
                          Link your account with other services
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 sm:mt-0 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md font-medium text-sm transition-all duration-300"
                    >
                      Connect
                    </motion.button>
                    {/* Gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                  </motion.div>

                  {/* Logout Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="group relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-gradient-to-b from-[#3a1c1c] to-[#2a1515] rounded-xl"
                  >
                    <div className="flex items-center">
                      <FaSignOutAlt className="text-3xl text-red-400 mr-3" />
                      <div>
                        <h3 className="font-medium text-white">Sign Out</h3>
                        <p className="text-sm text-gray-400">
                          Sign out from your account on this device
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="mt-3 sm:mt-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium text-sm transition-all duration-300"
                    >
                      Logout
                    </motion.button>
                    {/* Gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserProfile;
