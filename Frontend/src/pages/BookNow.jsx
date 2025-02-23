import React from "react";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import {
  FaSpa,
  FaUserTie,
  FaTools,
  FaBroom,
  FaPlug,
  FaTint,
  FaLock,
  FaPaintRoller,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaHandshake,
  FaPhoneAlt,
  FaComments,
  FaCalendarCheck,
  FaUserCheck,
} from "react-icons/fa";

const BookNow = () => {
  const user = useSelector((state) => state.userAuth.user);

  // ... (keeping all the existing data arrays)
  const trustMetrics = [
    { number: "10K+", label: "Happy Customers" },
    {
      number: "4.8",
      label: "App Rating",
      icon: <FaStar className="text-amber-500" />,
    },
    { number: "5K+", label: "Service Providers" },
    { number: "100%", label: "Verified Experts" },
  ];

  const features = [
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: "Verified Professionals",
      description: "Every service provider undergoes thorough verification",
    },
    {
      icon: <FaHandshake className="text-2xl text-emerald-600" />,
      title: "Satisfaction Guaranteed",
      description: "100% money back if you're not satisfied",
    },
    {
      icon: <FaClock className="text-2xl text-purple-600" />,
      title: "Timely Service",
      description: "Punctual and efficient service delivery",
    },
    {
      icon: <FaCheckCircle className="text-2xl text-teal-600" />,
      title: "Quality Assured",
      description: "High standards maintained for every service",
    },
  ];

  const howItWorks = [
    {
      icon: <FaCalendarCheck className="text-3xl text-violet-600" />,
      title: "Book Appointment",
      description: "Choose your service and preferred time slot",
    },
    {
      icon: <FaUserCheck className="text-3xl text-indigo-600" />,
      title: "Expert Assignment",
      description: "Get matched with verified professionals",
    },
    {
      icon: <FaComments className="text-3xl text-blue-600" />,
      title: "Service Confirmation",
      description: "Receive confirmation and service updates",
    },
    {
      icon: <FaPhoneAlt className="text-3xl text-teal-600" />,
      title: "Get Service",
      description: "Experience professional service delivery",
    },
  ];

  const items = [
    {
      title: "Women's Salon & Spa",
      image: <FaSpa className="text-pink-600" />,
    },
    {
      title: "Men's Salon & Massage",
      image: <FaUserTie className="text-blue-600" />,
    },
    {
      title: "AC & Appliance Repair",
      image: <FaTools className="text-orange-600" />,
    },
    { title: "Cleaning", image: <FaBroom className="text-green-600" /> },
    {
      title: "Electrician, Plumber & Carpenter",
      image: <FaPlug className="text-amber-600" />,
    },
    {
      title: "Native Water Purifier",
      image: <FaTint className="text-cyan-600" />,
    },
    {
      title: "Native Smart Locks",
      image: <FaLock className="text-violet-600" />,
    },
    {
      title: "Painting & Waterproofing",
      image: <FaPaintRoller className="text-purple-600" />,
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 to-white">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          mask: "linear-gradient(to bottom right, rgba(0, 0, 0, 0.15), transparent)",
        }}
      />

      {/* Content Container */}
      <div className="relative px-4 md:px-8 py-8 max-w-7xl mx-auto">
        {/* Rest of the component structure remains the same, just updating background colors */}

        {/* Header section */}
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            What are you looking for?
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover services tailored for you
          </p>
        </div>

        {/* Location card */}
        <div className="rounded-lg border bg-white/70 backdrop-blur-sm text-card-foreground shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1 rounded-full bg-blue-600" />
            <div className="space-y-1">
              <h2 className="font-semibold">{user?.user.address.city}</h2>
              <p className="text-sm text-muted-foreground">
                {user?.user.address.country}
              </p>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-white/70 backdrop-blur-sm px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            placeholder="Search for services..."
          />
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="group rounded-lg border bg-white/70 backdrop-blur-sm text-card-foreground shadow-sm hover:shadow transition-all duration-200"
            >
              <div className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="text-3xl">{item.image}</div>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Trust metrics */}
        <div className="mt-8 rounded-lg border bg-white/70 backdrop-blur-sm text-card-foreground shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Trusted by Thousands of Happy Customers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustMetrics.map((metric, index) => (
              <div key={index} className="p-4 text-center space-y-2">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-2xl font-bold text-blue-600">
                    {metric.number}
                  </span>
                  {metric.icon}
                </div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-8 rounded-lg border bg-white/70 backdrop-blur-sm text-card-foreground shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">{step.icon}</div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 rounded-lg border bg-white/70 backdrop-blur-sm text-card-foreground shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Why Choose Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
