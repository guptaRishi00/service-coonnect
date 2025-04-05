import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaUsers, FaAward, FaHandshake } from "react-icons/fa";
import { BsLightbulb } from "react-icons/bs";
import { GiGrowth } from "react-icons/gi";
import teamImage from "../assets/team-image.jpg"; // Replace with your actual team image

function AboutUs() {
  const values = [
    {
      id: 1,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction above all else in everything we do.",
      icon: FaUsers,
      color: "#4CC9F0",
    },
    {
      id: 2,
      title: "Excellence",
      description:
        "We strive for excellence in every service we provide, ensuring quality that exceeds expectations.",
      icon: FaAward,
      color: "#F72585",
    },
    {
      id: 3,
      title: "Innovation",
      description:
        "We embrace new technologies and methods to continuously improve our service offerings.",
      icon: BsLightbulb,
      color: "#7209B7",
    },
    {
      id: 4,
      title: "Integrity",
      description:
        "We operate with honesty, transparency, and ethical standards in all our business practices.",
      icon: FaHandshake,
      color: "#FFD60A",
    },
    {
      id: 5,
      title: "Growth",
      description:
        "We invest in our team's development and strive for sustainable business growth.",
      icon: GiGrowth,
      color: "#FF9E00",
    },
  ];

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-16 pb-16 lg:pt-24 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#ffdecb] py-1 px-4 rounded-full inline-block mb-4"
            >
              <p className="text-xs text-[#ff853e] font-medium">
                About Our Company
              </p>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              We're on a mission to make
              <span className="block mt-2">home services better</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Founded in 2018, we've been dedicated to providing exceptional
              home repair and maintenance services to homeowners across the
              country. Our team of professionals is committed to quality,
              reliability, and customer satisfaction.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl mx-auto max-w-4xl"
          >
            <img
              src={teamImage}
              alt="Our Team"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-md text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Meet Our Team
                </h3>
                <p className="text-gray-700 text-sm">
                  A dedicated group of professionals ready to serve your home
                  service needs
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[#ffdecb] py-1 px-4 rounded-full inline-block"
              >
                <p className="text-xs text-[#ff853e] font-medium">
                  Our Journey
                </p>
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold">How We Started</h2>
              <p className="text-gray-600">
                What began as a small family business has grown into a trusted
                name in home services. Our founder, John Smith, started the
                company with a simple vision: to provide reliable, high-quality
                home services at fair prices.
              </p>
              <p className="text-gray-600">
                Over the years, we've expanded our service offerings and our
                team, but our commitment to excellence and customer satisfaction
                remains the same. We've served over 10,000 homeowners,
                completing more than 25,000 service calls.
              </p>
              <p className="text-gray-600">
                Today, we're proud to be the go-to solution for home service
                needs across the region, known for our prompt service, skilled
                technicians, and dedication to getting the job done right the
                first time.
              </p>
              <Link to="/contact-us">
                <button className="px-6 py-3 bg-[#FE8058] font-medium text-white rounded-lg flex items-center group">
                  Get In Touch
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    <MdOutlineKeyboardArrowRight size={22} />
                  </span>
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-2xl text-[#FE8058]">1000+</h3>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-2xl text-[#FE8058]">50+</h3>
                  <p className="text-gray-600">Expert Technicians</p>
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-2xl text-[#FE8058]">98%</h3>
                  <p className="text-gray-600">Client Satisfaction</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-2xl text-[#FE8058]">7</h3>
                  <p className="text-gray-600">Years of Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="w-full bg-gradient-to-b from-[#09101c] to-[#111827] pt-16 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center py-12 md:py-16 gap-8 md:gap-12 px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <span className="bg-gradient-to-r from-[#232C39] to-[#2A3441] rounded-full px-6 py-2 text-white font-medium text-sm md:text-base shadow-lg">
              Our Values
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold text-center leading-tight">
              The principles that
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                guide everything we do.
              </span>
            </h2>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full mt-8">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
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
                    style={{ color: value.color }}
                  >
                    <value.icon />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>

                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" />

                {/* Corner accent */}
                <div
                  className="absolute -top-1 -right-1 w-16 h-16 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 0 0, transparent 0%, ${value.color} 100%)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#ffdecb] to-[#ffe8dc] rounded-2xl p-8 md:p-12 lg:p-16 shadow-lg relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ff853e] opacity-20 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center lg:text-left lg:flex lg:items-center lg:justify-between gap-8">
              <div className="lg:max-w-2xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                  Ready to experience our exceptional service?
                </h2>
                <p className="text-gray-700 mb-8 lg:mb-0">
                  Contact us today to schedule a service or get a quote. Our
                  friendly team is standing by to help with all your home
                  service needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/book-now">
                  <button className="px-6 py-3 bg-[#FE8058] font-medium text-white rounded-lg flex items-center justify-center group">
                    Book Now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      <MdOutlineKeyboardArrowRight size={22} />
                    </span>
                  </button>
                </Link>
                <Link to="/contact-us">
                  <button className="px-6 py-3 border border-[#5e5e5e] font-medium rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
