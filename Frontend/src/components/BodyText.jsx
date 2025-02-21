import React from "react";
import { motion } from "framer-motion";
import man from "../assets/imageOne.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function BodyText() {
  return (
    <div className="relative flex lg:flex-row items-center pt-16 pb-16 justify-between px-10 w-full overflow-hidden">
      {/* Background Pattern - Abstract Shapes */}
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

      {/* Left side - Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col items-center lg:items-start gap-6 md:gap-8 px-4 sm:px-6 lg:px-0 pb-10 lg:pb-0 text-center lg:text-left relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-[#ffdecb] py-1 px-3 rounded-full"
        >
          <p className="text-xs text-[#ff853e] font-medium">
            Ready To Help You!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center lg:items-start gap-6 md:gap-5 flex-col"
        >
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-sm xl:text-8xl leading-tight  flex flex-col items-center lg:items-start ">
            The best solution
            <span>for every house </span>
            <span>problem.</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 flex flex-col items-center lg:items-start">
            Our open, positive, and proactive approach helps us find ways
            <span>to align your work environment with the culture.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 flex-col sm:flex-row w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto px-4 md:px-5 py-3 md:py-4 bg-[#FE8058] font-medium text-white rounded-lg flex items-center justify-center group">
            Book Now
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              <MdOutlineKeyboardArrowRight size={25} />
            </span>
          </button>
          <button className="w-full sm:w-auto px-4 md:px-5 py-3 md:py-4 border-[#5e5e5e] font-medium border rounded-lg bg-white hover:bg-gray-50 transition-colors">
            Read More
          </button>
        </motion.div>
      </motion.div>

      {/* Right side - Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 mb-10 lg:mb-0"
      >
        <img
          src={man}
          alt="Person Illustration"
          className="w-[200px] sm:w-[250px] md:w-[300px] hidden lg:inline-block lg:w-[490px]"
        />
      </motion.div>
    </div>
  );
}

export default BodyText;
