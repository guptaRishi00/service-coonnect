import React from "react";
import { MdCleaningServices } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { MdOutlineInfo } from "react-icons/md";

import * as motion from "motion/react-client";

function Drawer({ user }) {
  return (
    <div className="right-0 z-20 absolute bg-white shadow-lg h-svh w-1/2">
      <div className="flex flex-col items-start py-3 px-3 gap-3">
        {/* profile */}
        {user ? (
          <>
            <div className=" bg-[#eeeeee] w-full  rounded-md p-3">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1738369350430-87d667611998?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                  className="w-4 h-4 rounded-full object-cover"
                  alt="profile image"
                />
                <div className="">
                  <p className="font-medium text-sm text-gray-700">
                    Hey! {user?.user?.fullname.firstname}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full rounded-md p-3">
          <span className="text-gray-500">
            <MdCleaningServices />
          </span>
          <p className="text-gray-500 text-sm font-medium ">Service</p>
        </div>
        <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full  rounded-md p-3">
          <span className="text-gray-500">
            <MdArrowOutward />
          </span>
          <p className="text-gray-500 text-sm font-medium ">Guides</p>
        </div>
        <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full  rounded-md p-3">
          <span className="text-gray-500">
            <BiSolidQuoteLeft />
          </span>
          <p className="text-gray-500 text-sm font-medium ">Testimonials</p>
        </div>
        <div className="flex items-center gap-2 hover:bg-[#eeeeee] w-full  rounded-md p-3">
          <span className="text-gray-500">
            <MdOutlineInfo />
          </span>
          <p className="text-gray-500 text-sm font-medium ">About</p>
        </div>

        <button className="w-full rounded-md mt-5 cursor-pointer p-2 bg-black text-white">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Drawer;
