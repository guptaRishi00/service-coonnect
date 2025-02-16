import React from "react";

import { HiOutlineLocationMarker } from "react-icons/hi";

function Search() {
  return (
    <div className="flex gap-10 items-center justify-between w-[800px] h-[200px] p-10 rounded-[10px] border-black border-2">
      <div className="flex flex-col items-start gap-5">
        <div className="flex items-center gap-1">
          <HiOutlineLocationMarker className="text-2xl font-light" />
          <p className="text-sm font-semibold">Enter Location</p>
        </div>
        <span className="px-2">
          <input
            type="text"
            placeholder="Enter Your Location"
            className="p-5 w-[301px] rounded-[10px] bg-[#E0E0E066] text-sm outline-none"
          />
        </span>
      </div>
      <div className="flex flex-col items-start gap-5">
        <div className="flex items-center gap-1">
          <HiOutlineLocationMarker className="text-2xl font-light" />
          <p className="text-sm font-semibold">Enter Service</p>
        </div>
        <span className="px-2">
          <input
            type="text"
            placeholder="Enter Your Service"
            className="p-5 w-[301px] rounded-[10px] bg-[#E0E0E066] text-sm outline-none"
          />
        </span>
      </div>
    </div>
  );
}

export default Search;
