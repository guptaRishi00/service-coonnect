import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Icons
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  MdArrowOutward,
  MdOutlineDashboard,
  MdOutlineWork,
} from "react-icons/md";
import {
  LuBell,
  LuUsers,
  LuSettings,
  LuLogOut,
  LuSearch,
} from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

// Redux actions (placeholder - would be imported from your actual slices)
import { fetchUser } from "../features/auth/UserAuthSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector(
    (state) => state.userAuth || { token: null, user: null }
  );
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Real user data from the provided JSON
  const users = [
    {
      id: "67e5abd4ed84b1a039bde58a",
      name: "Piyush Gupta",
      email: "piyush@gmail.com",
      role: "admin",
      status: "Active",
      joined: "2025-03-18",
      address: {
        street: "Modern Enclaive",
        city: "Kharar",
        state: "Punjab",
        zipcode: "12345",
        country: "India",
      },
      phone: "1234567890",
    },
    {
      id: "67e5ad1fed84b1a039bde59d",
      name: "Harsh Sah",
      email: "harsh@gmail.com",
      role: "user",
      status: "Active",
      joined: "2025-03-18",
      address: {
        street: "Shivjot",
        city: "SAS Nagar",
        state: "Punjab",
        zipcode: "1234500",
        country: "India",
      },
      phone: "1234567890",
    },
    {
      id: "67b9a1ef5b9f33754101eba5",
      name: "Manoj Pandey",
      email: "manoj@gmail.com",
      role: "worker",
      status: "Active",
      joined: "2024-01-30",
      address: {
        street: "Gharam Bazar",
        city: "Dibrugarh",
        state: "Assam",
        zipcode: "786001",
        country: "India",
      },
      phone: "1234567890",
      profession: "Mechanic",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "user",
      status: "Active",
      joined: "2025-02-18",
    },
  ];

  const workers = [
    {
      id: "67b9a1ef5b9f33754101eba5",
      name: "Manoj Pandey",
      email: "manoj@gmail.com",
      specialty: "Mechanic",
      rating: 4.8,
      jobs: 32,
      address: {
        street: "Gharam Bazar",
        city: "Dibrugarh",
        state: "Assam",
        zipcode: "786001",
        country: "India",
      },
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      specialty: "Electrical",
      rating: 4.5,
      jobs: 28,
    },
    {
      id: 3,
      name: "David Miller",
      email: "david@example.com",
      specialty: "Carpentry",
      rating: 4.9,
      jobs: 47,
    },
    {
      id: 4,
      name: "Lisa Taylor",
      email: "lisa@example.com",
      specialty: "Painting",
      rating: 4.7,
      jobs: 23,
    },
  ];

  const works = [
    {
      id: 1,
      title: "Kitchen Renovation",
      client: "Harsh Sah",
      worker: "Manoj Pandey",
      status: "In Progress",
      deadline: "2025-04-15",
      price: 1200,
    },
    {
      id: 2,
      title: "Bathroom Plumbing",
      client: "Piyush Gupta",
      worker: "Michael Brown",
      status: "Completed",
      deadline: "2025-03-28",
      price: 450,
    },
    {
      id: 3,
      title: "Living Room Painting",
      client: "Emily Davis",
      worker: "Lisa Taylor",
      status: "Pending",
      deadline: "2025-04-10",
      price: 680,
    },
    {
      id: 4,
      title: "Electrical Wiring",
      client: "Harsh Sah",
      worker: "Sarah Wilson",
      status: "In Progress",
      deadline: "2025-04-20",
      price: 520,
    },
  ];

  // Track scroll position to add styles when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (token && !user) dispatch(fetchUser());
  }, [token, user, dispatch]);

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
      switch (status.toLowerCase()) {
        case "active":
        case "completed":
          return "bg-green-100 text-green-800 border-green-200";
        case "inactive":
          return "bg-gray-100 text-gray-800 border-gray-200";
        case "in progress":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "pending":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor()} border`}
      >
        {status}
      </span>
    );
  };

  // Sidebar menu items
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <MdOutlineDashboard className="text-xl" />,
    },
    { id: "users", label: "Users", icon: <LuUsers className="text-xl" /> },
    {
      id: "workers",
      label: "Workers",
      icon: <MdOutlineWork className="text-xl" />,
    },
    { id: "works", label: "Works", icon: <LuSettings className="text-xl" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-lg font-semibold">Users Management</h2>
              <button className="px-4 py-2 bg-[#FF8057] text-white rounded-full hover:bg-[#ff6a3d] transition-all duration-300 flex items-center gap-1 text-sm shadow-md hover:shadow-lg group">
                Add New User
                <IoIosArrowRoundForward className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="p-5 border-b">
              <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full w-full max-w-md">
                <LuSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #
                        {typeof user.id === "string"
                          ? user.id.substr(-6)
                          : user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                            {typeof user.name === "string"
                              ? user.name.charAt(0)
                              : "U"}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {user.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "user"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.address
                          ? `${user.address.city}, ${user.address.state}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing 1-{users.length} of {users.length} users
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1 bg-gray-100 rounded-md text-sm disabled:opacity-50"
                    disabled
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-100 rounded-md text-sm disabled:opacity-50"
                    disabled
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "workers":
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-lg font-semibold">Workers Management</h2>
              <button className="px-4 py-2 bg-[#FF8057] text-white rounded-full hover:bg-[#ff6a3d] transition-all duration-300 flex items-center gap-1 text-sm shadow-md hover:shadow-lg group">
                Add New Worker
                <IoIosArrowRoundForward className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="p-5 border-b">
              <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full w-full max-w-md">
                <LuSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search workers..."
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jobs Done
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workers.map((worker) => (
                    <tr
                      key={worker.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #
                        {typeof worker.id === "string"
                          ? worker.id.substr(-6)
                          : worker.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                            {worker.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {worker.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {worker.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {worker.specialty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {worker.address
                          ? `${worker.address.city}, ${worker.address.state}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-medium">{worker.rating}</span>
                        <span className="text-gray-400">/5.0</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {worker.jobs}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing 1-{workers.length} of {workers.length} workers
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1 bg-gray-100 rounded-md text-sm disabled:opacity-50"
                    disabled
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-100 rounded-md text-sm disabled:opacity-50"
                    disabled
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "works":
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-lg font-semibold">Work Assignments</h2>
              <button className="px-4 py-2 bg-[#FF8057] text-white rounded-full hover:bg-[#ff6a3d] transition-all duration-300 flex items-center gap-1 text-sm shadow-md hover:shadow-lg group">
                Create New Work
                <IoIosArrowRoundForward className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="p-5 border-b">
              <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full w-full max-w-md">
                <LuSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search works..."
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Worker
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {works.map((work) => (
                    <tr
                      key={work.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{work.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {work.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {work.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {work.worker}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                        ${work.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={work.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {work.deadline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing 1-{works.length} of {works.length} works
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1 bg-gray-100 rounded-md text-sm disabled:opacity-50"
                    disabled
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-100 rounded-md text-sm disabled:opacity-50"
                    disabled
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#FF8057] group hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold mt-1 group-hover:text-[#FF8057] transition-colors">
                      {users.length}
                    </p>
                  </div>
                  <div className="p-3 bg-[#FF8057]/10 rounded-full group-hover:bg-[#FF8057]/20 transition-colors">
                    <LuUsers className="h-6 w-6 text-[#FF8057]" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    +5% from last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 group hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Workers</p>
                    <p className="text-2xl font-bold mt-1 group-hover:text-blue-500 transition-colors">
                      {workers.length}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <LuUsers className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    +12% from last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 group hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Works</p>
                    <p className="text-2xl font-bold mt-1 group-hover:text-purple-500 transition-colors">
                      {works.length}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                    <MdOutlineWork className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    +8% from last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 group hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-2xl font-bold mt-1 group-hover:text-yellow-500 transition-colors">
                      ${works.reduce((sum, work) => sum + work.price, 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full group-hover:bg-yellow-200 transition-colors">
                    <LuSettings className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    -3% from last month
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Recent Works</h2>
                  <Link
                    to="#"
                    className="text-[#FF8057] text-sm font-medium flex items-center hover:underline"
                  >
                    View All <MdArrowOutward className="ml-1" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {works.slice(0, 3).map((work) => (
                    <div
                      key={work.id}
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{work.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <p>Client: {work.client}</p>
                          <span className="mx-2">•</span>
                          <p>${work.price}</p>
                        </div>
                      </div>
                      <StatusBadge status={work.status} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Top Workers</h2>
                  <Link
                    to="#"
                    className="text-[#FF8057] text-sm font-medium flex items-center hover:underline"
                  >
                    View All <MdArrowOutward className="ml-1" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {workers.slice(0, 3).map((worker) => (
                    <div
                      key={worker.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                          {worker.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">{worker.name}</h3>
                          <p className="text-sm text-gray-500">
                            {worker.specialty}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-medium">{worker.rating}</span>
                        <span className="text-gray-400">/5.0</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <motion.div
        className={`hidden md:flex flex-col bg-white border-r shadow-sm h-screen ${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 fixed`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`p-4 flex ${
            sidebarOpen ? "justify-between" : "justify-center"
          } items-center border-b`}
        >
          {sidebarOpen ? (
            <h2 className="text-xl font-bold text-[#FF8057]">WorkerApp</h2>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#FF8057] text-white flex items-center justify-center font-bold">
              W
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            <HiOutlineMenu className="text-lg text-gray-500" />
          </button>
        </div>

        <div className="flex-1 py-6 flex flex-col justify-between">
          <nav className="px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center ${
                  sidebarOpen ? "justify-start" : "justify-center"
                } p-3 rounded-lg transition-colors duration-300 ${
                  activeTab === item.id
                    ? "bg-[#FF8057]/10 text-[#FF8057]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                {sidebarOpen && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="px-4 mt-6">
            <button
              className={`flex items-center ${
                sidebarOpen ? "justify-start" : "justify-center"
              } p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-300`}
            >
              <LuLogOut className="text-xl" />
              {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawer(false)}
          >
            <motion.div
              className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-50 overflow-y-auto"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-bold text-[#FF8057]">WorkerApp</h2>
                <button
                  onClick={() => setDrawer(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <RxCross2 className="text-lg text-gray-500" />
                </button>
              </div>

              <div className="py-6">
                <nav className="px-4 space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setDrawer(false);
                      }}
                      className={`flex items-center justify-start w-full p-3 rounded-lg transition-colors duration-300 ${
                        activeTab === item.id
                          ? "bg-[#FF8057]/10 text-[#FF8057]"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className="ml-3 font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="px-4 mt-6">
                  <button className="flex items-center justify-start w-full p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-300">
                    <LuLogOut className="text-xl" />
                    <span className="ml-3 font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={`flex-1 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        } transition-all duration-300`}
      >
        {/* Header */}
        <header
          className={`sticky top-0 bg-white z-30 ${
            scrolled ? "shadow-md" : ""
          } transition-shadow duration-300`}
        >
          <div className="flex justify-between items-center px-4 md:px-6 py-4">
            <div className="flex items-center">
              <button
                className="md:hidden p-2 mr-2 rounded-full hover:bg-gray-100"
                onClick={() => setDrawer(true)}
              >
                <HiOutlineMenu className="text-xl" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <LuBell className="text-xl" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#FF8057] text-white rounded-full flex items-center justify-center font-bold mr-2">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">{currentDate}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 md:px-6 py-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Admin;
