import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdOutlineKeyboardArrowRight,
  MdLocationOn,
  MdEmail,
  MdPhone,
} from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="w-full overflow-hidden relative py-16">
      {/* Background Elements */}
      <div className="absolute top-10 left-5 w-24 md:w-32 h-24 md:h-32 bg-[#ff853e] opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-20 md:w-24 h-20 md:h-24 bg-[#ff853e] opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 top-1/3 w-36 md:w-48 h-36 md:h-48 opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="50" cy="50" r="40" stroke="#ff853e" strokeWidth="5" />
        </svg>
      </div>
      <div className="absolute -right-20 bottom-1/4 w-28 md:w-40 h-28 md:h-40 opacity-10">
        <svg
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-[#ffdecb] py-1 px-3 rounded-full mb-3">
            <p className="text-xs text-[#ff853e] font-medium">Get In Touch</p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Have a question or need help with a house problem? Our team is ready
            to assist you. Reach out to us and we'll get back to you as soon as
            possible.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Info Cards - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Info Cards */}
            {[
              {
                icon: <MdLocationOn className="text-white text-2xl" />,
                title: "Our Location",
                content: "123 Repair Street, Fix City, 10001",
              },
              {
                icon: <MdEmail className="text-white text-2xl" />,
                title: "Email Address",
                content: "support@fixitservice.com",
              },
              {
                icon: <MdPhone className="text-white text-2xl" />,
                title: "Phone Number",
                content: "+1 (555) 123-4567",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex items-start space-x-4 group"
              >
                <div className="bg-[#FF8057] p-3 rounded-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Service Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-[#ffdecb] rounded-lg p-6 shadow-md"
            >
              <h3 className="font-semibold text-[#FF8057] text-lg mb-3">
                Service Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday:</span>
                  <span className="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturday:</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday:</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#ffbf9e]">
                <p className="text-xs text-gray-700">
                  For emergency repairs outside of business hours, please call
                  our 24/7 hotline.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white rounded-lg shadow-md p-6 sm:p-8"
          >
            <h2 className="font-bold text-2xl mb-6">Send Us a Message</h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded"
              >
                <p className="text-green-700 font-medium">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF8057] focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF8057] focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF8057] focus:border-transparent outline-none transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF8057] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Describe your issue or question..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#FF8057] text-white rounded-lg font-medium flex items-center justify-center group hover:bg-[#e0704d] transition-colors"
              >
                Send Message
                <IoIosSend className="ml-2 text-xl group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-[#FF8057] to-[#ff9a7a] rounded-lg p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need Emergency Repairs?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Don't wait until it's too late. Our expert team is ready to help
            with any urgent repair needs.
          </p>
          <Link to="/book-now">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-[#FF8057] px-6 py-3 rounded-lg font-medium flex items-center mx-auto group"
            >
              Book Emergency Service
              <MdOutlineKeyboardArrowRight
                size={25}
                className="ml-1 group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 rounded-lg overflow-hidden shadow-md h-64 sm:h-80 lg:h-96 bg-gray-200"
        >
          {/* This would be your actual map integration */}
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500">
              Interactive Map Would Be Integrated Here
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
