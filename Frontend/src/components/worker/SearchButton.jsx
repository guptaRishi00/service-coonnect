import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchButton() {
  return (
    <button className="bg-[#FFBE98] px-8 py-3 rounded-[14px] flex items-center gap-2">
      <span className="text-bold">
        <CiSearch />
      </span>
      <p className="font-semibold">Search</p>
    </button>
  );
}

export default SearchButton;
