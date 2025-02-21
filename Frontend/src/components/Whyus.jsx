import React from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GoCheckCircleFill } from "react-icons/go";
import man from "../assets/man3.jpg";

function WhyUs() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-60 justify-center w-full items-center py-10 lg:py-20 px-4 lg:px-0">
      {/* Left Side - Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative bg-gray-200 h-[400px] lg:h-[550px] w-full lg:w-[45%] overflow-hidden rounded-lg"
      >
        {/* Foreground Image (Appears Smoothly) */}
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          src={man}
          alt="Man"
          className="absolute z-20 h-full w-full object-cover"
        />
      </motion.div>

      {/* Right Side - Text Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col items-start gap-6 lg:gap-8 w-full lg:w-auto"
      >
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-[#ffdecb] py-1 px-3 rounded-full"
        >
          <p className="text-xs text-[#ff853e] font-medium">Why Us?</p>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
          className="font-bold text-3xl lg:text-5xl flex flex-col items-start gap-2 lg:gap-4"
        >
          The Advantage:
          <span>Reasons to trust our</span>
          <span>expertise.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
          className="text-sm text-gray-500 flex flex-col items-start"
        >
          Our open, positive, and proactive approach helps us find ways to
          <span>align your work environment with the culture.</span>
        </motion.p>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 w-full"
        >
          {[
            "Monthly Inspection",
            "General Repair Maintenance",
            "Fixing of Faulty Wiring",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.8 + index * 0.2,
              }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <GoCheckCircleFill size={20} />
              <p className="text-sm lg:text-base">{item}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
          viewport={{ once: true }}
          className="px-4 lg:px-5 py-3 lg:py-4 bg-[#FE8058] font-medium text-white rounded-lg flex items-center text-sm lg:text-base w-full lg:w-auto justify-center lg:justify-start"
        >
          Book Now
          <MdOutlineKeyboardArrowRight size={25} className="ml-2" />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default WhyUs;
