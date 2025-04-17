import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";

import { IoIosArrowRoundForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { LuBell } from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

import { fetchUser } from "../features/auth/UserAuthSlice";
import logo from "../assets/logo1.png";
import Drawer from "./Drawer";

// Enhanced NavLink with better hover animation
const NavLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`cursor-pointer text-sm font-medium relative group overflow-hidden ${className}`}
  >
    <span className="relative z-10 transition-colors duration-300 group-hover:text-[#FF8057]">
      {children}
    </span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF8057] transform translate-y-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </Link>
);

function Navbar() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.userAuth);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to add styles when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (token && !user) dispatch(fetchUser());
  }, [token, user, dispatch]);

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return (
    <>
      <nav
        className={`flex items-center justify-between p-4 sm:p-5 lg:py-4 lg:px-14 bg-white top-0 sticky z-50 
                     ${scrolled ? "shadow-md" : "shadow-sm"} 
                     transition-all duration-300`}
      >
        {/* Logo with enhanced animation */}
        <Link to="/" className="flex items-center group">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-7 object-contain 
                      group-hover:scale-105 transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation with glass morphism effect */}
        <div className="hidden lg:flex items-center gap-10 px-6 py-2 rounded-full backdrop-blur-sm bg-white/50">
          {user?.user.role === "user" ? (
            <>
              <NavLink to="/user-yourwork">Your works</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/service-details">Services</NavLink>
            </>
          )}

          {/* Gradient text with better animation */}
          <NavLink to={"/guides"}>
            <div className="relative flex items-center cursor-pointer group">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-sm font-medium">
                Guides
              </span>
              <MdArrowOutward
                className="text-xs ml-1 mb-1 transition-all duration-300 
                                      group-hover:translate-x-1 group-hover:translate-y-[-2px] text-gray-600"
              />
            </div>
          </NavLink>

          {user?.user?.role === "worker" ? (
            <NavLink to="/worker-searchwork">Search work</NavLink>
          ) : user?.user?.role === "user" ? (
            <NavLink to="/post-work">Something Broken ?</NavLink>
          ) : (
            <NavLink to="/worker-register" className="text-black font-medium">
              Register as Worker
            </NavLink>
          )}

          {user ? (
            <NavLink to="/chat">Chat</NavLink>
          ) : (
            <NavLink to="/about-us">About</NavLink>
          )}
        </div>

        {/* Mobile Menu Icon with enhanced animation */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={drawer ? "close" : "menu"}
              initial={{ rotate: drawer ? 90 : -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: drawer ? -90 : 90, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              onClick={() => setDrawer((prev) => !prev)}
              className="text-xl cursor-pointer hover:text-[#FF8057] transition-colors p-2"
            >
              {drawer ? <RxCross2 /> : <HiOutlineMenu />}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Auth Buttons with enhanced styling */}
        {!user && (
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/user-login">
              <button
                className="px-4 py-2 border-2 border-gray-200 rounded-full text-sm 
                               hover:border-gray-300 hover:bg-gray-50 transition-all duration-300
                               focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
              >
                Login
              </button>
            </Link>
            <Link to="/user-register">
              <button
                className="flex items-center gap-1 bg-black text-white px-5 py-2 rounded-full text-sm 
                               group hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg
                               focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Sign up
                <IoIosArrowRoundForward className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        )}

        {/* User Profile with enhanced styling */}
        {user && (
          <div className="hidden lg:flex items-center gap-5">
            {/* Bell Icon with pulse notification */}
            <Link to="/user-notification">
              <span className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors relative p-2">
                <LuBell size={23} />
              </span>
            </Link>

            {/* Profile Section with enhanced hover effect */}
            <Link to="/profile">
              <div
                className="flex items-center gap-3 cursor-pointer group 
                            px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1738369350430-87d667611998?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                    className="w-8 h-8 rounded-full object-cover 
                              ring-2 ring-transparent group-hover:ring-[#FF8057] transition-all duration-300"
                    alt="profile"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-[#FF8057] transition-colors flex gap-2">
                    Hey! {user?.user?.fullname?.firstname}
                    <span className="text-[8px] text-blue-500 font-normal">
                      {user?.user?.verified ? "verified" : ""}
                    </span>
                  </p>
                  <p className="text-[8px] text-gray-700">{currentDate}</p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Drawer with Enhanced Animation */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            className="fixed top-[64px] left-0 right-0 z-40 bg-white shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Drawer user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
