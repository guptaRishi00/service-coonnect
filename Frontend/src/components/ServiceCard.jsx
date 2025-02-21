import React from "react";
import { motion } from "framer-motion";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";

function ServiceCard() {
  const services = [
    {
      icon: <BsShieldFillCheck size={40} />,
      text: "Professional Expertise",
    },
    { icon: <FaThumbsUp size={40} />, text: "Reliable Service" },
    { icon: <BsStars size={40} />, text: "Affordable Rates" },
  ];

  return (
    <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
      {services.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }} // Added subtle hover effect
          transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-start gap-2 p-6 rounded-lg text-white font-medium text-lg 
                     bg-[#FF8057] overflow-hidden shadow-lg" // Added shadow for attractiveness
        >
          {/* Pattern SVG in the Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              fill="white"
            >
              <path
                d="M0 50 Q50 0, 100 50 T200 50"
                stroke="white"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M0 150 Q50 100, 100 150 T200 150"
                stroke="white"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>

          {/* Content */}
          <span className="relative z-10">{item.icon}</span>
          <p className="relative z-10">{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default ServiceCard;
