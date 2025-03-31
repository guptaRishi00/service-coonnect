import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardArrowRight,
  MdLocationOn,
  MdEmail,
  MdPhone,
  MdOutlineHandyman,
} from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Plumbing Repairs", path: "/services/plumbing" },
        { name: "Electrical Work", path: "/services/electrical" },
        { name: "HVAC Maintenance", path: "/services/hvac" },
        { name: "Carpentry", path: "/services/carpentry" },
        { name: "Emergency Repairs", path: "/services/emergency" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Our Team", path: "/team" },
        { name: "Testimonials", path: "/testimonials" },
        { name: "Careers", path: "/careers" },
        { name: "Contact Us", path: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", path: "/faq" },
        { name: "Pricing", path: "/pricing" },
        { name: "Service Areas", path: "/service-areas" },
        { name: "Book a Service", path: "/book-now" },
        { name: "Blog", path: "/blog" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "#", label: "Facebook" },
    { icon: <FaTwitter />, url: "#", label: "Twitter" },
    { icon: <FaInstagram />, url: "#", label: "Instagram" },
    { icon: <FaLinkedinIn />, url: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="w-full bg-gray-50 pt-16 pb-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-5 w-24 md:w-32 h-24 md:h-32 bg-[#ff853e] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-20 md:w-24 h-20 md:h-24 bg-[#ff853e] opacity-10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-200">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#FF8057] p-2 rounded-lg mr-2">
                <MdOutlineHandyman className="text-white text-xl" />
              </div>
              <h3 className="font-bold text-xl">Service Connect</h3>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Professional home repair services you can trust. We're committed
              to providing reliable, high-quality solutions for all your
              household problems.
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MdLocationOn className="text-[#FF8057] text-lg mt-0.5" />
                <span className="text-sm text-gray-600">
                  123 Repair Street, Fix City, 10001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MdPhone className="text-[#FF8057] text-lg" />
                <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdEmail className="text-[#FF8057] text-lg" />
                <span className="text-sm text-gray-600">
                  support@fixitservice.com
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="lg:col-span-2 md:col-span-1"
            >
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-500 hover:text-[#FF8057] text-sm flex items-center group"
                    >
                      <MdOutlineKeyboardArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-4 md:col-span-2"
          >
            <h3 className="font-semibold text-lg mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Stay updated with our latest services, tips, and special offers.
            </p>

            <form className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-[#FF8057] focus:border-transparent outline-none transition-all"
                />
                <button
                  type="submit"
                  className="bg-[#FF8057] text-white px-4 py-2 rounded-r-lg hover:bg-[#e0704d] transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <div>
              <h4 className="font-medium text-sm mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#FF8057] hover:text-white transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} Service Connect. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex space-x-4 mt-4 md:mt-0"
          >
            <Link
              to="/privacy-policy"
              className="text-xs text-gray-500 hover:text-[#FF8057]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-xs text-gray-500 hover:text-[#FF8057]"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookie-policy"
              className="text-xs text-gray-500 hover:text-[#FF8057]"
            >
              Cookie Policy
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
