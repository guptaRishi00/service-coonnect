import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardArrowRight,
  MdCalendarToday,
  MdLocationOn,
  MdDescription,
} from "react-icons/md";
import {
  FaHammer,
  FaTools,
  FaWrench,
  FaPaintRoller,
  FaLeaf,
  FaBolt,
  FaHome,
} from "react-icons/fa";
import { MdPlumbing } from "react-icons/md";

function BookNow() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const services = [
    {
      id: 1,
      title: "Plumbing",
      description: "Repair leaks, unclog drains, install fixtures, and more.",
      icon: MdPlumbing,
      color: "#4CC9F0",
    },
    {
      id: 2,
      title: "Carpentry",
      description:
        "Furniture repair, custom woodwork, installations, and more.",
      icon: FaHammer,
      color: "#F72585",
    },
    {
      id: 3,
      title: "Mechanical",
      description: "HVAC repair, appliance maintenance, and mechanical work.",
      icon: FaWrench,
      color: "#7209B7",
    },
    {
      id: 4,
      title: "Handyman",
      description: "General repairs, mounting, assembly, and small fixes.",
      icon: FaTools,
      color: "#FFD60A",
    },
    {
      id: 5,
      title: "Painting",
      description:
        "Interior and exterior painting, touch-ups, and refinishing.",
      icon: FaPaintRoller,
      color: "#FF9E00",
    },
    {
      id: 6,
      title: "Landscaping",
      description: "Lawn care, garden maintenance, and outdoor improvements.",
      icon: FaLeaf,
      color: "#38B000",
    },
    {
      id: 7,
      title: "Electrical",
      description: "Fixture installation, outlet repair, wiring, and more.",
      icon: FaBolt,
      color: "#3A86FF",
    },
    {
      id: 8,
      title: "Home Cleaning",
      description: "Deep cleaning, regular maintenance, and special services.",
      icon: FaHome,
      color: "#FB5607",
    },
  ];

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically submit the booking data to your backend
    setStep(4); // Move to confirmation step
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center items-center mb-8">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1
                ? "bg-[#FE8058] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <div
            className={`h-1 w-16 ${step >= 2 ? "bg-[#FE8058]" : "bg-gray-200"}`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2
                ? "bg-[#FE8058] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <div
            className={`h-1 w-16 ${step >= 3 ? "bg-[#FE8058]" : "bg-gray-200"}`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3
                ? "bg-[#FE8058] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
        </div>
      </div>
    );
  };

  const renderServiceSelectionStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Select a Service
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.1 + index * 0.05,
              }}
              className="group cursor-pointer"
              onClick={() => handleServiceSelect(service)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-[#FE8058] p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110"
                    style={{ color: service.color }}
                  >
                    <service.icon />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute -top-1 -right-1 w-16 h-16 opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 0 0, transparent 0%, ${service.color} 100%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderDateTimeStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <button
            onClick={goBack}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
          <h2 className="text-2xl md:text-3xl font-bold">
            Schedule Your {selectedService?.title} Service
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8">
          <div className="flex items-center mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
              style={{ backgroundColor: selectedService?.color + "20" }}
            >
              <div style={{ color: selectedService?.color }}>
                {selectedService && <selectedService.icon size={24} />}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl">{selectedService?.title}</h3>
              <p className="text-gray-600 text-sm">
                {selectedService?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <MdCalendarToday className="text-[#FE8058] mr-2" size={20} />
              <h3 className="font-bold text-lg">Select Date</h3>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE8058] focus:border-[#FE8058] outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`p-2 text-sm rounded-md ${
                      time === slot
                        ? "bg-[#FE8058] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Address and Details Section */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <MdLocationOn className="text-[#FE8058] mr-2" size={20} />
              <h3 className="font-bold text-lg">Location & Details</h3>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Address
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE8058] focus:border-[#FE8058] outline-none"
                placeholder="Enter your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <MdDescription className="text-[#FE8058] mr-2" size={18} />
                  Service Details
                </div>
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE8058] focus:border-[#FE8058] outline-none min-h-[120px]"
                placeholder="Please describe your issue or service needs in detail"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setStep(3)}
            disabled={!date || !time || !address}
            className={`px-6 py-3 bg-[#FE8058] font-medium text-white rounded-lg flex items-center ${
              !date || !time || !address
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#e87550]"
            }`}
          >
            Continue to Review
            <span className="ml-2">
              <MdOutlineKeyboardArrowRight size={22} />
            </span>
          </button>
        </div>
      </motion.div>
    );
  };

  const renderReviewStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <button
            onClick={goBack}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
          <h2 className="text-2xl md:text-3xl font-bold">Review & Confirm</h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8">
          <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">
            Booking Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Service</p>
                <div className="flex items-center mt-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: selectedService?.color + "20" }}
                  >
                    <div style={{ color: selectedService?.color }}>
                      {selectedService && <selectedService.icon size={16} />}
                    </div>
                  </div>
                  <span className="font-medium">{selectedService?.title}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Date & Time</p>
                <div className="flex items-center mt-1">
                  <MdCalendarToday className="text-gray-500 mr-2" size={16} />
                  <span className="font-medium">
                    {date} at {time}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Address</p>
                <div className="flex items-center mt-1">
                  <MdLocationOn className="text-gray-500 mr-2" size={16} />
                  <span className="font-medium">{address}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Service Details</p>
              <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">
                {description || "No additional details provided."}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">Estimated Service Fee</span>
              <span className="font-bold text-lg">Call for quote</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Final price will be confirmed after assessment by the
              professional.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8">
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE8058] focus:border-[#FE8058] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE8058] focus:border-[#FE8058] outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FE8058] focus:border-[#FE8058] outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#FE8058] font-medium text-white rounded-lg flex items-center hover:bg-[#e87550]"
            >
              Confirm Booking
              <span className="ml-2">
                <MdOutlineKeyboardArrowRight size={22} />
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    );
  };

  const renderConfirmationStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Your {selectedService?.title} service has been scheduled for {date} at{" "}
          {time}. A confirmation email has been sent to your email address.
        </p>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8 max-w-lg mx-auto">
          <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">
            Booking Details
          </h3>

          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium">{selectedService?.title}</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">
              {date} at {time}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{address}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Booking ID:</span>
            <span className="font-medium">
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <button className="px-6 py-3 bg-[#FE8058] font-medium text-white rounded-lg flex items-center justify-center">
              View My Bookings
            </button>
          </Link>
          <Link to="/">
            <button className="px-6 py-3 border border-gray-300 font-medium rounded-lg bg-white hover:bg-gray-50 transition-colors">
              Return to Home
            </button>
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-16 pb-16 lg:pt-24 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-5 w-24 md:w-32 h-24 md:h-32 bg-[#ff853e] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-20 md:w-24 h-20 md:h-24 bg-[#ff853e] opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute left-[-20px] top-20 w-36 md:w-48 h-36 md:h-48 opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="50" cy="50" r="40" stroke="#ff853e" strokeWidth="5" />
          </svg>

          <svg
            className="absolute right-[-20px] bottom-20 w-28 md:w-40 h-28 md:h-40 opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            fill="none"
          >
            <rect
              x="30"
              y="30"
              width="60"
              height="60"
              stroke="#ff853e"
              strokeWidth="5"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#ffdecb] py-1 px-4 rounded-full inline-block mb-4"
            >
              <p className="text-xs text-[#ff853e] font-medium">
                Book a Professional
              </p>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-4">
              Find the Right Professional
              <span className="block mt-2">For Your Home Service Needs</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Select from our range of expert professionals to handle all your
              home repair, maintenance, and improvement needs. Book in minutes
              and get the job done right.
            </p>
          </motion.div>

          {renderStepIndicator()}

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-8">
            {step === 1 && renderServiceSelectionStep()}
            {step === 2 && renderDateTimeStep()}
            {step === 3 && renderReviewStep()}
            {step === 4 && renderConfirmationStep()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookNow;
