import React from "react";
import {
  MdCleaningServices,
  MdArrowOutward,
  MdOutlineInfo,
  MdOutlineForwardToInbox,
} from "react-icons/md";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { CiInboxOut } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import { logout } from "../features/auth/UserAuthSlice";

function Drawer({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/home");
  };

  // Animated menu item component for consistent styling
  const MenuItem = ({ icon, text, onClick }) => (
    <motion.div
      className="flex items-center gap-3 hover:bg-gray-50 w-full rounded-lg p-3 transition-colors cursor-pointer group"
      onClick={onClick}
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="text-gray-500 group-hover:text-[#FF8057] transition-colors">
        {icon}
      </span>
      <p className="text-gray-600 text-sm font-medium group-hover:text-[#FF8057] transition-colors">
        {text}
      </p>
    </motion.div>
  );

  return (
    <motion.div
      className="right-0 z-20 bg-white shadow-lg h-auto w-full rounded-b-xl overflow-hidden mt-10"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-start py-5 px-4 gap-2">
        {/* Profile Section */}
        {user?.user && (
          <motion.div
            className="bg-gradient-to-r from-gray-50 to-gray-100 w-full rounded-xl p-4 mb-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              to="/profile"
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1738369350430-87d667611998?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-md"
                  alt="profile"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Hey! {user?.user?.fullname?.firstname || "Guest"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.user?.role === "user"
                    ? "Customer"
                    : "Service Provider"}
                </p>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Menu Divider */}
        <div className="w-full border-b border-gray-100 my-1"></div>

        {/* Menu Items */}
        <MenuItem
          icon={<MdCleaningServices size={18} />}
          text="Services"
          onClick={() => navigate("#")}
        />

        <MenuItem
          icon={<MdArrowOutward size={18} />}
          text={
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Guides
            </span>
          }
          onClick={() => navigate("#")}
        />

        {user?.user?.role === "user" ? (
          <MenuItem
            icon={<CiInboxOut size={18} />}
            text="Post Work"
            onClick={() => navigate("/post-work")}
          />
        ) : (
          <MenuItem
            icon={<BiSolidQuoteLeft size={18} />}
            text="Testimonials"
            onClick={() => navigate("#")}
          />
        )}

        {user?.user ? (
          <MenuItem
            icon={<MdOutlineForwardToInbox size={18} />}
            text="Chat"
            onClick={() => navigate("/chat")}
          />
        ) : (
          <MenuItem
            icon={<MdOutlineInfo size={18} />}
            text="About"
            onClick={() => navigate("#")}
          />
        )}

        {/* Authentication Actions */}
        {user?.user ? (
          <motion.button
            className="w-full rounded-full mt-5 cursor-pointer p-2.5 bg-black text-white font-medium
                      hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg
                      focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            onClick={handleLogout}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Logout
          </motion.button>
        ) : (
          <div className="flex flex-col items-center w-full gap-3 mt-5">
            <Link to="/user-login" className="w-full">
              <motion.button
                className="rounded-full w-full cursor-pointer p-2.5 bg-white border-2 border-gray-200
                          text-gray-800 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all
                          focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Login
              </motion.button>
            </Link>
            <Link to="/user-register" className="w-full">
              <motion.button
                className="rounded-full w-full cursor-pointer p-2.5 bg-black text-white font-medium
                          hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg
                          focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Sign up
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Drawer;
