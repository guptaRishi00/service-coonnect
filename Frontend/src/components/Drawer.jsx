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
import { logout } from "../features/auth/UserAuthSlice";

function Drawer({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div className="right-0 z-20 absolute bg-white shadow-lg h-svh w-1/2">
      <div className="flex flex-col items-start py-3 px-3 gap-3">
        {/* Profile */}
        {user?.user && (
          <div className="bg-[#eeeeee] w-full rounded-md p-3">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1738369350430-87d667611998?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                className="w-6 h-6 rounded-full object-cover"
                alt="profile"
              />
              <div>
                <p className="font-medium text-sm text-gray-700">
                  Hey! {user?.user?.fullname?.firstname || "Guest"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full rounded-md p-3">
          <span className="text-gray-500">
            <MdCleaningServices />
          </span>
          <p className="text-gray-500 text-sm font-medium">Service</p>
        </div>

        <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full rounded-md p-3">
          <span className="text-gray-500">
            <MdArrowOutward />
          </span>
          <p className="text-gray-500 text-sm font-medium">Guides</p>
        </div>

        {user?.user?.role === "user" ? (
          <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full rounded-md p-3">
            <span className="text-gray-500">
              <CiInboxOut />
            </span>
            <p className="text-gray-500 text-sm font-medium">Post Work</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full rounded-md p-3">
            <span className="text-gray-500">
              <BiSolidQuoteLeft />
            </span>
            <p className="text-gray-500 text-sm font-medium">Testimonials</p>
          </div>
        )}

        {user?.user ? (
          <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full rounded-md p-3">
            <span className="text-gray-500">
              <MdOutlineForwardToInbox />
            </span>
            <p className="text-gray-500 text-sm font-medium">Chat</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full rounded-md p-3">
            <span className="text-gray-500">
              <MdOutlineInfo />
            </span>
            <p className="text-gray-500 text-sm font-medium">About</p>
          </div>
        )}

        {/* Authentication Actions */}
        {user?.user ? (
          <button
            className="w-full rounded-md mt-5 cursor-pointer p-2 bg-black text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <div className="flex flex-col items-center w-full gap-3">
            <Link to="/user-login" className="w-full sm:w-auto">
              <button className="rounded-md w-full cursor-pointer p-2 bg-white border border-black text-black">
                Login
              </button>
            </Link>
            <Link to="/user-register" className="w-full sm:w-auto">
              <button className="rounded-md cursor-pointer w-full p-2 bg-black text-white">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
