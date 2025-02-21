import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

import { IoIosArrowRoundForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { LuBell } from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

import logo from "../assets/logo1.png";
import { fetchUser } from "../features/auth/UserAuthSlice";
import Drawer from "./Drawer";

function Navbar() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.userAuth);
  const [currentDate, setCurrentDate] = useState("");
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, [token, dispatch]);

  return (
    <>
      <nav className="flex items-center justify-between p-4 sm:p-5 lg:py-7 lg:px-14 bg-white top-0 lg:sticky lg:z-50 shadow-sm">
        <Link to={"/"} className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-7 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <p className="cursor-pointer text-sm hover:text-gray-600 transition-colors">
            Services
          </p>
          <p className="relative flex items-center cursor-pointer group">
            <span
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-sm"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite",
              }}
            >
              Guides
            </span>
            <span className="text-xs mb-1 transition-transform duration-300 group-hover:translate-x-1 text-gray-600">
              <MdArrowOutward />
            </span>
          </p>
          <p className="cursor-pointer text-sm hover:text-gray-600 transition-colors">
            Testimonials
          </p>
          <p className="cursor-pointer text-sm hover:text-gray-600 transition-colors">
            About
          </p>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            {drawer ? (
              <motion.span
                key="close"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setDrawer(false)}
                className="text-xl cursor-pointer"
              >
                <RxCross2 />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setDrawer(true)}
                className="text-xl cursor-pointer"
              >
                <HiOutlineMenu />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Auth Buttons */}
        {!user && (
          <div className="hidden sm:flex items-center gap-3">
            <Link to={"/user-login"}>
              <button className="px-4 py-2 border-2 border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-colors">
                Login
              </button>
            </Link>
            <Link to={"user-register"}>
              <button className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded-full text-sm group">
                Sign up
                <span className="text-2xl transition-transform group-hover:translate-x-1">
                  <IoIosArrowRoundForward />
                </span>
              </button>
            </Link>
          </div>
        )}

        {/* User Profile */}
        {user && (
          <div className="hidden lg:flex items-center gap-5">
            <span className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
              <LuBell size={23} />
            </span>
            <div className="flex items-center gap-3 cursor-pointer group">
              <img
                src="https://images.unsplash.com/photo-1738369350430-87d667611998?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-transparent group-hover:ring-gray-200 transition-all"
                alt="profile"
              />
              <div>
                <p className="font-medium text-sm">
                  Hey! {user?.user?.fullname.firstname}
                </p>
                <p className="text-[8px] text-gray-700">{currentDate}</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            className="fixed top-[64px] left-0 right-0 z-40 bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Drawer user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
