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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-6 md:px-[60px]">
      {services.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-start gap-3 px-14 py-12 rounded-lg text-white font-medium text-xl 
                     bg-[#FF8057] overflow-hidden"
        >
          {/* Pattern SVG in the Background */}
          <div className="absolute inset-0 opacity-20">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              fill="white"
            >
              <path
                d="M0 50 Q50 0, 100 50 T200 50"
                stroke="white"
                strokeWidth="5"
                fill="none"
              />
              <path
                d="M0 150 Q50 100, 100 150 T200 150"
                stroke="white"
                strokeWidth="5"
                fill="none"
              />
            </svg>
          </div>

          {/* Content */}
          <span>{item.icon}</span>
          <p>{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default ServiceCard;
