import React from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function ServiceDetails() {
  const services = [
    {
      title: "Home Repairs",
      description:
        "Professional fixing of structural and cosmetic issues in your home.",
      icon: "🔨",
    },
    {
      title: "Plumbing Services",
      description:
        "Expert solutions for all your water and pipe-related needs.",
      icon: "🔧",
    },
    {
      title: "Electrical Work",
      description:
        "Safe and reliable electrical installations and troubleshooting.",
      icon: "⚡",
    },
    {
      title: "Interior Design",
      description:
        "Transform your living spaces with our creative design solutions.",
      icon: "🏠",
    },
  ];

  return (
    <div className="relative flex flex-col items-center pt-16 pb-24 px-6 md:px-10 w-full overflow-hidden">
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

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-6 text-center max-w-4xl mb-16 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#ffdecb] py-1 px-3 rounded-full"
        >
          <p className="text-xs text-[#ff853e] font-medium">
            Our Professional Services
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight"
        >
          Comprehensive Home Solutions{" "}
          <span className="block">For Every Need</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-gray-500 max-w-2xl"
        >
          Our team of certified professionals delivers top-quality home services
          tailored to your specific requirements, ensuring your complete
          satisfaction.
        </motion.p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mb-16"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.2 + index * 0.1,
            }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col"
          >
            <div className="bg-[#ffdecb] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-2xl">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{service.description}</p>
            <Link
              to={`/services/${service.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="mt-auto"
            >
              <div className="flex items-center text-[#FE8058] font-medium group">
                Learn more
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  <MdOutlineKeyboardArrowRight size={20} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.7 }}
        viewport={{ once: true }}
        className="bg-[#fef8f5] p-8 md:p-10 rounded-2xl w-full max-w-4xl flex flex-col items-center text-center"
      >
        <h2 className="font-bold text-2xl md:text-3xl mb-4">
          Ready to solve your home problems?
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl">
          Schedule a consultation with our experts today and get a personalized
          solution for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link to="/book-now" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 bg-[#FE8058] font-medium text-white rounded-lg flex items-center justify-center group">
              Book Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                <MdOutlineKeyboardArrowRight size={25} />
              </span>
            </button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 border-[#5e5e5e] font-medium border rounded-lg bg-white hover:bg-gray-50 transition-colors">
              Contact Us
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ServiceDetails;
