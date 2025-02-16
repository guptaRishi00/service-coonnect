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
    },
    {
      id: 2,
      title: "Renovation",
      description:
        "Transforming spaces with expert craftsmanship and innovative design for stunning home makeovers.",
      icon: FaTools,
    },
    {
      id: 3,
      title: "Painting",
      description:
        "Elevating interiors and exteriors with flawless finishes and a spectrum of vibrant colors.",
      icon: FaBrush,
    },
    {
      id: 4,
      title: "Electrical Work",
      description:
        "Ensuring safety and functionality through skilled electrical installations and troubleshooting services.",
      icon: IoFlash,
    },
    {
      id: 5,
      title: "Carpentry",
      description:
        "Crafting custom solutions and precise installations for functional and aesthetic woodworking projects.",
      icon: IoMdCube,
    },
    {
      id: 6,
      title: "Roofing",
      description:
        "Protecting homes with professional roofing solutions, repairs, and maintenance for lasting durability.",
      icon: MdHome,
    },
  ];

  return (
    <div className="w-full bg-[#09101c] pt-28">
      <div className="w-full flex flex-col justify-center items-center py-20 gap-10">
        {/* Topmost */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#232C39] rounded-full px-5 py-2 text-white font-medium"
        >
          Services
        </motion.p>

        {/* Middle */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h1 className="flex flex-col items-center text-6xl text-white">
            Explore our comprehensive range
            <span className="">of professional services.</span>
          </h1>
        </motion.div>

        {/* Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-[60px] mt-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3 + index * 0.3, // Increased delay for each card
              }}
              viewport={{ once: true }}
              className="py-10 px-20 text-white flex flex-col items-center "
            >
              <div className="text-3xl">
                <service.icon />
              </div>
              <h3 className="text-xl font-semibold mt-3">{service.title}</h3>
              <p className="mt-2 text-gray-300 text-center text-sm font-bold">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
