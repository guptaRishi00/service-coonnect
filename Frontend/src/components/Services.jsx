import React from "react";
import { motion } from "framer-motion";
import { GiWaterSplash } from "react-icons/gi";
import { FaTools, FaBrush } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";
import { IoMdCube } from "react-icons/io";
import { MdHome } from "react-icons/md";

function Services() {
  const services = [
    {
      id: 1,
      title: "Plumbing",
      description:
        "Resolving leaks, pipe repairs, and faucet installations with precision and efficiency.",
      icon: GiWaterSplash,
      color: "#4CC9F0",
    },
    {
      id: 2,
      title: "Renovation",
      description:
        "Transforming spaces with expert craftsmanship and innovative design for stunning home makeovers.",
      icon: FaTools,
      color: "#F72585",
    },
    {
      id: 3,
      title: "Painting",
      description:
        "Elevating interiors and exteriors with flawless finishes and a spectrum of vibrant colors.",
      icon: FaBrush,
      color: "#7209B7",
    },
    {
      id: 4,
      title: "Electrical Work",
      description:
        "Ensuring safety and functionality through skilled electrical installations and troubleshooting services.",
      icon: IoFlash,
      color: "#FFD60A",
    },
    {
      id: 5,
      title: "Carpentry",
      description:
        "Crafting custom solutions and precise installations for functional and aesthetic woodworking projects.",
      icon: IoMdCube,
      color: "#FF9E00",
    },
    {
      id: 6,
      title: "Roofing",
      description:
        "Protecting homes with professional roofing solutions, repairs, and maintenance for lasting durability.",
      icon: MdHome,
      color: "#00B4D8",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[#09101c] to-[#111827] pt-16 md:pt-28">
      <div className=" mx-auto flex flex-col justify-center items-center py-12 md:py-20 gap-8 md:gap-12 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <span className="bg-gradient-to-r from-[#232C39] to-[#2A3441] rounded-full px-6 py-2 text-white font-medium text-sm md:text-base shadow-lg">
            Our Services
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold text-center leading-tight">
            Explore our comprehensive range
            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              of professional services.
            </span>
          </h1>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full mt-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2 + index * 0.1,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1C1F2A] to-[#151821] p-6 lg:p-8"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div
                  className="text-4xl md:text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110"
                  style={{ color: service.color }}
                >
                  <service.icon />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </motion.div>

              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />

              {/* Corner accent */}
              <div
                className="absolute -top-1 -right-1 w-16 h-16 opacity-20"
                style={{
                  background: `radial-gradient(circle at 0 0, transparent 0%, ${service.color} 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
