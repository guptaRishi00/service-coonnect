import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWork } from "../../features/auth/PostWorkSlice";
import YourWorkCard from "../../components/user/YourWorkCard";
import { Search, Filter, ChevronDown, Layers } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TIME_OPTIONS = ["All Day", "Morning", "Afternoon", "Evening", "Night"];

function YourWorks() {
  const { work } = useSelector((state) => state.userWork);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchWork());
  }, [dispatch]);

  const renderWorkGrid = () => {
    if (!work?.work) {
      return (
        <div className="col-span-full flex justify-center items-center py-16">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-64"></div>
          </div>
        </div>
      );
    }

    const filteredWorks = work.work.filter((workItem) =>
      workItem.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredWorks.length === 0) {
      return (
        <div className="col-span-full text-center py-16 space-y-6">
          <div className="flex justify-center">
            <Layers size={100} className="text-gray-300 animate-pulse" />
          </div>
          <p className="text-2xl text-gray-500 font-light">No works found</p>
          <button
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all"
            onClick={() => setSearchQuery("")}
          >
            Reset Filters
          </button>
        </div>
      );
    }

    return filteredWorks.map((workItem, index) => (
      <div key={workItem.id || index} className="group">
        <div className="transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
          <YourWorkCard work={workItem} />
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Sleek Header */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 mb-4">
          Your Workspace Hub
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Seamlessly manage, explore, and showcase your uploaded works with
          intuitive organization and design.
        </p>
      </header>

      {/* Search and Filters */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-center ">
        {/* Search Input */}
        <div className="relative flex-grow w-full">
          <input
            type="text"
            placeholder="Search your works..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-black transition-all duration-300"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* Filter Button */}
        <div className="relative hidden lg:inline-block">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all"
          >
            <Filter size={18} />
            <span>Filters</span>
            <ChevronDown size={16} />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 z-10 mt-4 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Range
                  </label>
                  <select
                    className="w-full border-2 border-gray-200 rounded-full px-4 py-2 focus:border-black transition-all"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <div className="flex space-x-2">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Start"
                      className="w-full border-2 border-gray-200 rounded-full px-4 py-2 focus:border-black transition-all"
                    />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="End"
                      className="w-full border-2 border-gray-200 rounded-full px-4 py-2 focus:border-black transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderWorkGrid()}
      </div>
    </div>
  );
}

export default YourWorks;
