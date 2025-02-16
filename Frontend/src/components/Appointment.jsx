import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

function Appointment() {
  return (
    <div className="relative w-full bg-[#FE8058] pt-28 flex justify-center items-center overflow-hidden">
      {/* Square Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/squares.png')] opacity-10"></div>

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff9466] via-[#fe8058] to-[#ff5733] opacity-30 mix-blend-overlay"></div>

      {/* Main Content */}
      <div className="relative w-full flex flex-col justify-center items-center py-20 gap-10 max-w-4xl px-6 text-white">
        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-[#FE916C] rounded-full px-5 py-2 font-medium shadow-md"
        >
          Appointment
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center leading-tight"
        >
          Need a Hand?
          <span className="block">Book Your Service Today.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-lg text-center max-w-lg opacity-90"
        >
          Get expert help and make your home better with our trusted handyman
          solutions.
        </motion.p>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="px-6 py-4 bg-white text-[#FE8058] font-medium rounded-lg flex items-center gap-2 shadow-md hover:bg-opacity-90 transition"
        >
          Book Now <MdOutlineKeyboardArrowRight size={25} />
        </motion.button>
      </div>
    </div>
  );
}

export default Appointment;
