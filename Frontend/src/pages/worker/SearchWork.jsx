import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaClock, FaChevronDown } from "react-icons/fa";

import axios from "axios";
import SearchWorkCard from "../../components/worker/SearchWorkCard";

function SearchWork() {
  const [work, setWork] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Clothes");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("All Day");

  useEffect(() => {
    const fetchWork = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/worker/searchworks`
      );
      setWork(response.data);
    };
    fetchWork();
  }, []);

  const timeOptions = ["All Day", "Morning", "Afternoon", "Evening", "Night"];

  return (
    <div className="mx-auto px-4 sm:px-8 lg:px-14 py-6 sm:py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
          All Works
        </h1>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-4 flex-1">
          {[
            `Profile`,
            "Hire Professional",
            "Book Now",
            "Guides",
            "Something Broken?",
          ].map((category) => (
            <button
              key={category}
              className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 border text-sm sm:text-base ${
                activeCategory === category ? "bg-blue-100" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button className="px-3 sm:px-4 py-2 border rounded-lg flex items-center gap-2 text-sm sm:text-base">
          📦 Total Works:
          <span className="bg-red-500 text-white px-2 rounded-full text-sm">
            {work?.work?.length}
          </span>
        </button>
      </div>

      {/* Date Range and Time Picker */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        {/* Date Range Picker */}
        <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg w-full sm:w-auto">
          <FaCalendarAlt className="text-gray-600" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMM dd"
            className="focus:outline-none w-full sm:w-auto"
          />
          -
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMM dd"
            className="focus:outline-none w-full sm:w-auto"
          />
        </div>

        {/* Time Picker */}
        <div className="relative w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-full sm:w-auto">
            <FaClock className="text-gray-600" />
            <span>{selectedTime}</span>
            <FaChevronDown className="text-gray-400" />
          </button>
          <div className="absolute bg-white border border-gray-300 rounded-lg mt-2 shadow-md w-full hidden group-hover:block">
            {timeOptions.map((time) => (
              <div
                key={time}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {!work?.work ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-10">
            Loading...
          </div>
        ) : work.work.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-10">
            No items found.
          </div>
        ) : (
          work.work.map((workItem, index) => (
            <div key={index}>
              <SearchWorkCard work={workItem} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchWork;
