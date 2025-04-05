import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  MdOutlineKeyboardArrowRight,
  MdCheckCircle,
  MdArrowBack,
} from "react-icons/md";
import {
  FaHammer,
  FaWrench,
  FaTools,
  FaPaintRoller,
  FaLeaf,
  FaBolt,
  FaHome,
} from "react-icons/fa";
import { MdPlumbing } from "react-icons/md";

function ServiceDetails() {
  const { serviceId } = useParams();
  const [showFAQAnswer, setShowFAQAnswer] = useState(null);

  // Service mapping - in a real app this would come from an API
  const services = {
    plumbing: {
      id: "plumbing",
      title: "Plumbing",
      description: "Professional plumbing services for all your home needs",
      longDescription:
        "Our skilled plumbers can handle any plumbing issue, from simple repairs to complete installations. We provide fast, reliable service with guaranteed workmanship.",
      icon: MdPlumbing,
      color: "#4CC9F0",
      pricing: "$75-$150 per hour",
      minCallOut: "$120",
      servicesList: [
        "Leak detection and repair",
        "Drain cleaning and unclogging",
        "Fixture installation and replacement",
        "Water heater services",
        "Pipe repair and replacement",
        "Bathroom and kitchen remodeling",
        "Water pressure issues",
        "Emergency plumbing repairs",
      ],
      faqs: [
        {
          question: "How quickly can a plumber arrive for an emergency?",
          answer:
            "For emergencies, we aim to have a plumber at your location within 1-2 hours. Our emergency service operates 24/7 to ensure you're never left with a critical plumbing issue.",
        },
        {
          question: "Do you provide free estimates for plumbing work?",
          answer:
            "Yes, we provide free estimates for most planned plumbing work. For emergency calls, there is a standard call-out fee that gets applied to the total cost if you proceed with the work.",
        },
        {
          question: "Are your plumbers licensed and insured?",
          answer:
            "Absolutely. All our plumbers are fully licensed, insured, and undergo regular training to stay current with the latest plumbing techniques and regulations.",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    },
    carpentry: {
      id: "carpentry",
      title: "Carpentry",
      description: "Expert carpentry services for your home and furniture",
      longDescription:
        "Our skilled carpenters can build, repair, or renovate any wood structure in your home. From custom furniture to complete room renovations, we deliver quality craftsmanship.",
      icon: FaHammer,
      color: "#F72585",
      pricing: "$65-$95 per hour",
      minCallOut: "$100",
      servicesList: [
        "Custom furniture building",
        "Cabinet installation",
        "Wood floor installation and repair",
        "Trim and molding installation",
        "Door installation and repair",
        "Deck and porch construction",
        "Staircase construction and repair",
        "Structural carpentry work",
      ],
      faqs: [
        {
          question: "Can you match existing woodwork in my home?",
          answer:
            "Yes, our carpenters are skilled at matching existing woodwork, including stain colors, wood types, and design patterns to ensure a seamless integration with your current aesthetic.",
        },
        {
          question: "Do you provide the materials or should I purchase them?",
          answer:
            "We can work either way. We can source high-quality materials for your project, or work with materials you've already purchased. If we source materials, you'll benefit from our trade discounts.",
        },
        {
          question: "How long does a typical carpentry project take?",
          answer:
            "Project timelines vary widely depending on the scope. A simple door repair might take only an hour, while custom cabinetry for a kitchen could take several days. We'll provide a timeline estimate with your quote.",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1558497390-5a9e95be0338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    },
    mechanical: {
      id: "mechanical",
      title: "Mechanical",
      description: "HVAC and mechanical system services for your home",
      longDescription:
        "Our mechanical specialists handle all aspects of HVAC systems, appliance repair, and other mechanical services to keep your home running efficiently and comfortably.",
      icon: FaWrench,
      color: "#7209B7",
      pricing: "$85-$150 per hour",
      minCallOut: "$120",
      servicesList: [
        "HVAC installation and repair",
        "Furnace maintenance and repair",
        "Air conditioning services",
        "Appliance repair",
        "Ductwork installation and cleaning",
        "Ventilation system services",
        "Water heater installation",
        "Gas line installation and repair",
        "Smart thermostat installation",
        "Energy efficiency assessments",
      ],
      faqs: [
        {
          question: "How often should HVAC systems be serviced?",
          answer:
            "We recommend servicing your HVAC system twice a year - once before the heating season and once before the cooling season. Regular maintenance extends system life and ensures efficient operation.",
        },
        {
          question:
            "Can you install smart home components with my HVAC system?",
          answer:
            "Yes, we specialize in smart home integration with HVAC systems. We can install smart thermostats, zoning systems, and connected components that allow remote control and enhanced efficiency.",
        },
        {
          question: "What brands of HVAC equipment do you service?",
          answer:
            "Our technicians are trained to work on all major brands including Carrier, Trane, Lennox, Rheem, Goodman, and many others. We can service, repair, and install equipment from virtually any manufacturer.",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    },
    handyman: {
      id: "handyman",
      title: "Handyman",
      description: "General home repair and maintenance services",
      longDescription:
        "Our professional handymen can tackle a wide range of home repair and maintenance tasks, from minor fixes to more complex projects that don't require specialized tradespeople.",
      icon: FaTools,
      color: "#3A0CA3",
      pricing: "$60-$90 per hour",
      minCallOut: "$95",
      servicesList: [
        "Furniture assembly",
        "TV mounting",
        "Drywall repair",
        "Tile repair",
        "Basic electrical repairs",
        "Basic plumbing repairs",
        "Door and window repairs",
        "Smart home device installation",
      ],
      faqs: [
        {
          question:
            "Can your handymen handle small electrical and plumbing tasks?",
          answer:
            "Yes, our handymen can handle minor electrical and plumbing tasks like replacing outlets, fixing leaky faucets, or installing light fixtures. For major electrical or plumbing work, we'll recommend our specialized technicians.",
        },
        {
          question: "How do you charge for handyman services?",
          answer:
            "We typically charge an hourly rate for handyman services with a minimum call-out fee. For larger projects, we may provide a flat-rate quote. We'll always be transparent about costs before beginning work.",
        },
        {
          question: "Can I provide my own materials for the handyman to use?",
          answer:
            "Absolutely. You're welcome to provide your own materials, or our handyman can pick up needed supplies. If we purchase materials, we'll provide receipts and only charge you the actual cost.",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777540?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2336&q=80",
    },
    painting: {
      id: "painting",
      title: "Painting",
      description: "Interior and exterior painting services",
      longDescription:
        "Our professional painters deliver high-quality interior and exterior painting services for homes and businesses. We use premium paints and proper techniques to ensure a beautiful, lasting finish.",
      icon: FaPaintRoller,
      color: "#4361EE",
      pricing: "$40-$75 per hour",
      minCallOut: "$120",
      servicesList: [
        "Interior wall painting",
        "Exterior house painting",
        "Cabinet painting",
        "Deck and fence staining",
        "Wallpaper removal",
        "Texture application",
        "Color consultation",
        "Drywall repair before painting",
      ],
      faqs: [
        {
          question: "How should I prepare my home before painters arrive?",
          answer:
            "We recommend removing small items and pictures from walls, moving furniture to the center of the room (we can help with this), and ensuring pets are secured in an area away from the work zone.",
        },
        {
          question: "What type of paint do you use?",
          answer:
            "We primarily use premium paints from Sherwin-Williams and Benjamin Moore, but can work with other brands if you prefer. We select appropriate paint types based on the surface and location (interior/exterior).",
        },
        {
          question: "How long will my painting project take?",
          answer:
            "Project duration depends on the scope. An average bedroom might take 1-2 days, while an entire home interior could take a week or more. Exterior projects typically take 3-5 days depending on home size and weather conditions.",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1562259929-b4e1fd0aae2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    },
    landscaping: {
      id: "landscaping",
      title: "Landscaping",
      description: "Professional landscaping and lawn care services",
      longDescription:
        "Our landscaping professionals can transform your outdoor space with expert design, maintenance, and installation services. We create beautiful, functional landscapes that enhance your property.",
      icon: FaLeaf,
      color: "#06D6A0",
      pricing: "$50-$100 per hour",
      minCallOut: "$85",
      servicesList: [
        "Lawn maintenance",
        "Garden design and installation",
        "Tree and shrub planting",
        "Hardscape installation",
        "Irrigation systems",
        "Mulching and edging",
        "Seasonal cleanups",
        "Outdoor lighting installation",
      ],
      faqs: [
        {
          question: "How often should professional lawn care be performed?",
          answer:
            "For most properties, weekly lawn maintenance during the growing season provides optimal results. This typically includes mowing, edging, and blowing. Other services like fertilization and weed control follow seasonal schedules.",
        },
        {
          question: "Do you offer organic lawn care options?",
          answer:
            "Yes, we offer organic and eco-friendly lawn care programs that use natural products instead of synthetic chemicals. These programs are safe for children, pets, and the environment.",
        },
        {
          question: "Can you help with drainage issues in my yard?",
          answer:
            "Absolutely. Our team can assess drainage problems and recommend solutions such as French drains, regrading, rain gardens, or other water management systems to prevent pooling and erosion.",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1600240644455-3edc55c375fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    },
    electrical: {
      id: "electrical",
      title: "Electrical",
      description: "Licensed electrical services for your home",
      longDescription:
        "Our licensed electricians provide comprehensive electrical services for residential properties. From small repairs to complete rewiring, we ensure your electrical systems are safe and efficient.",
      icon: FaBolt,
      color: "#F8961E",
      pricing: "$80-$150 per hour",
      minCallOut: "$120",
      servicesList: [
        "Electrical panel upgrades",
        "Outlet and switch installation",
        "Lighting installation",
        "Ceiling fan installation",
        "Whole-house surge protection",
        "EV charger installation",
        "Generator installation",
        "Electrical troubleshooting",
      ],
      faqs: [
        {
          question: "How do I know if my electrical panel needs an upgrade?",
          answer:
            "Signs that indicate you may need an electrical panel upgrade include frequent circuit breaker trips, flickering lights, use of many power strips, buzzing sounds from outlets, or if your home is over 25 years old with the original panel.",
        },
        {
          question: "Can you install EV charging stations?",
          answer:
            "Yes, our electricians are experienced in installing various levels of EV charging equipment. We can assess your electrical system, recommend the appropriate charger, and perform a code-compliant installation.",
        },
        {
          question: "Do you provide emergency electrical services?",
          answer:
            "Yes, we offer 24/7 emergency electrical services for issues that pose safety risks or cause major disruptions. Our electricians respond quickly to restore power and address dangerous electrical situations.",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    },
    roofing: {
      id: "roofing",
      title: "Roofing",
      description: "Roof repair and installation services",
      longDescription:
        "Our roofing professionals provide high-quality roof repairs, replacements, and inspections to protect your home from the elements. We work with all types of roofing materials and stand behind our work.",
      icon: FaHome,
      color: "#F94144",
      pricing: "Varies by project",
      minCallOut: "$150",
      servicesList: [
        "Roof repairs",
        "Complete roof replacement",
        "Roof inspections",
        "Gutter installation and repair",
        "Skylight installation",
        "Roof ventilation services",
        "Storm damage assessment",
        "Leak detection and repair",
      ],
      faqs: [
        {
          question:
            "How do I know if I need a roof repair or complete replacement?",
          answer:
            "Several factors determine this, including the age of your roof, extent of damage, and percentage of the roof affected. As a general rule, if more than 30% of your roof is damaged or your roof is near the end of its expected lifespan, replacement is often more cost-effective.",
        },
        {
          question: "How long does a typical roof replacement take?",
          answer:
            "Most residential roof replacements take 1-3 days, depending on the size of your home, roof complexity, and weather conditions. Larger homes or more complex roofing systems may take up to a week.",
        },
        {
          question: "Do you provide warranties on roofing work?",
          answer:
            "Yes, we offer manufacturer warranties on materials (typically 25-50 years depending on the product) and our own workmanship warranty to protect against installation errors. We'll explain all warranty details before beginning your project.",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1632759145351-1the035f00be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    },
  };

  const service = services[serviceId];

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Link
          to="/"
          className="text-blue-500 hover:underline inline-flex items-center mt-4"
        >
          <MdArrowBack className="mr-1" /> Back to services
        </Link>
      </div>
    );
  }

  const handleFAQClick = (index) => {
    if (showFAQAnswer === index) {
      setShowFAQAnswer(null);
    } else {
      setShowFAQAnswer(index);
    }
  };

  const ServiceIcon = service.icon;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="text-blue-600 hover:underline inline-flex items-center mb-6"
        >
          <MdArrowBack className="mr-1" /> Back to all services
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div
            className="p-8 relative"
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: service.color }}
              >
                <ServiceIcon className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {service.title}
              </h1>
              <p className="text-white text-xl">{service.description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">
                  About Our {service.title} Services
                </h2>
                <p className="text-gray-700 mb-6">{service.longDescription}</p>

                <h3 className="text-xl font-semibold mb-3">What We Offer</h3>
                <div className="grid md:grid-cols-2 gap-2 mb-8">
                  {service.servicesList.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <MdCheckCircle
                        className="mt-1 mr-3 flex-shrink-0"
                        style={{ color: service.color }}
                      />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="mb-8">
                  {service.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 last:border-0 py-4"
                    >
                      <button
                        className="flex justify-between items-center w-full text-left font-medium"
                        onClick={() => handleFAQClick(index)}
                      >
                        <span>{faq.question}</span>
                        <MdOutlineKeyboardArrowRight
                          className={`transition-transform text-xl ${
                            showFAQAnswer === index ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {showFAQAnswer === index && (
                        <motion.div
                          className="mt-2 text-gray-600 pl-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Service Information
                  </h3>

                  <div className="mb-4">
                    <h4 className="text-gray-500 text-sm">PRICING</h4>
                    <p className="font-medium">{service.pricing}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-gray-500 text-sm">MINIMUM CALL-OUT</h4>
                    <p className="font-medium">{service.minCallOut}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-gray-500 text-sm">AVAILABILITY</h4>
                    <p className="font-medium">Mon-Sat, 7am-7pm</p>
                    <p className="text-sm text-gray-500">
                      Emergency services available 24/7
                    </p>
                  </div>

                  <button
                    className="w-full py-3 px-4 text-white font-medium rounded-lg transition-colors"
                    style={{ backgroundColor: service.color }}
                  >
                    Book This Service
                  </button>

                  <button className="w-full mt-3 py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
