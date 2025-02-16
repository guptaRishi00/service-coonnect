import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IoIosArrowRoundForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { LuBell } from "react-icons/lu";

import logo from "../assets/logo1.png";
import { fetchUser } from "../features/auth/UserAuthSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.userAuth);
  const [currentDate, setCurrentDate] = useState("");

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

  console.log("user:", user?.user?.fullname);

  return (
    <>
      <nav className="flex items-center justify-between py-7 px-14 bg-white top-0 sticky z-50 shadow-sm">
        <Link to={"/"}>
          <img
            src={logo}
            alt=""
            className="lg:h-7 md:w-14 w-10 cursor-pointer "
          />
        </Link>
        <div className="flex items-center gap-10 ">
          <p className="cursor-pointer text-sm">Services</p>
          <p className="relative flex items-center cursor-pointer transition duration-500 group">
            <span
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-move text-sm"
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Guides
            </span>
            <span className="text-xs mb-1 transition-transform duration-300 group-hover:translate-x-1 text-gray-600">
              <MdArrowOutward />
            </span>
          </p>
          <p className="cursor-pointer text-sm">Testimonials</p>
          <p className="cursor-pointer text-sm">About</p>
        </div>

        {/* Login Signup button */}
        {!user && (
          <div className="flex items-center gap-3">
            <Link to={"/user-login"}>
              <button className="px-4 py-2 border-2 border-gray-200 rounded-full">
                Login
              </button>
            </Link>
            <Link to={"user-register"}>
              <button className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded-full">
                Sign up
                <span className="text-2xl">
                  <IoIosArrowRoundForward />
                </span>
              </button>
            </Link>
          </div>
        )}

        {/* user and profile part */}
        {user && (
          <div className="flex items-center gap-5">
            <span className="cursor-pointer text-gray-400">
              <LuBell size={23} />
            </span>
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1738369350430-87d667611998?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                className="w-7 h-7 rounded-full object-cover"
                alt="profile image"
              />
              <div className="">
                <p className="font-medium text-sm">
                  Hey! {user?.user?.fullname.firstname}
                </p>
                <p className="text-[8px] text-gray-700">{currentDate}</p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
