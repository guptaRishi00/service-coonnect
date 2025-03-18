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

const NavLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`cursor-pointer text-sm relative group ${className}`}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8057] group-hover:w-full transition-all duration-300"></span>
  </Link>
);

function Navbar() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.userAuth);
  const [drawer, setDrawer] = useState(false);

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
      <nav className="flex items-center justify-between p-4 sm:p-5 lg:py-7 lg:px-14 bg-white top-0 lg:sticky lg:z-50 shadow-sm">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-7 object-contain transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {user?.user.role === "user" ? (
            <>
              <NavLink to="/user-yourwork">Your works</NavLink>
            </>
          ) : (
            <>
              <NavLink to="#">Services</NavLink>
            </>
          )}
          <div className="relative flex items-center cursor-pointer group">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-sm">
              Guides
            </span>
            <MdArrowOutward className="text-xs mb-1 transition-transform duration-300 group-hover:translate-x-1 text-gray-600" />
          </div>

          {user?.user?.role === "worker" ? (
            <NavLink to="/worker-searchwork">Search work</NavLink>
          ) : user?.user?.role === "user" ? (
            <NavLink to="/post-work">Something Broken ?</NavLink>
          ) : (
            <NavLink
              to="/worker-register"
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Register as Worker
            </NavLink>
          )}

          {user ? (
            <NavLink to="#">Chat</NavLink>
          ) : (
            <NavLink to="#">About</NavLink>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={drawer ? "close" : "menu"}
              initial={{ x: drawer ? 20 : -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: drawer ? -20 : 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawer((prev) => !prev)}
              className="text-xl cursor-pointer hover:text-gray-600"
            >
              {drawer ? <RxCross2 /> : <HiOutlineMenu />}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Auth Buttons */}
        {!user && (
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/user-login">
              <button className="px-4 py-2 border-2 border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-colors">
                Login
              </button>
            </Link>
            <Link to="/user-register">
              <button className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded-full text-sm group hover:bg-gray-800 transition-colors">
                Sign up
                <IoIosArrowRoundForward className="text-2xl transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        )}

        {/* User Profile */}
        {user && (
          <div className="hidden lg:flex items-center gap-5">
            <span className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors relative">
              <LuBell size={23} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </span>
            <div className="flex items-center gap-3 cursor-pointer group">
              <img
                src="https://images.unsplash.com/photo-1738369350430-87d667611998?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
                alt="profile"
              />
              <div>
                <p className="font-medium text-sm">
                  Hey! {user?.user?.fullname?.firstname}
                </p>
                <p className="text-[8px] text-gray-700">{currentDate}</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer with Improved Animation */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            className="fixed top-[64px] left-0 right-0 z-40 bg-white shadow-lg"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
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
