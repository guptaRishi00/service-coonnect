import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  UserCog,
  FileCheck,
  AlertCircle,
  BarChart4,
  PieChart,
  RefreshCw,
  Info,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart as RechartsChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: "N/A",
    totalWorkers: "N/A",
    totalPosts: "N/A",
    pendingPosts: "N/A",
    activePosts: "N/A",
  });
  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [workPosts, setWorkPosts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [apiStatus, setApiStatus] = useState({
    users: { available: false, error: null },
    workPosts: { available: false, error: null },
    stats: { available: false, error: null },
    workers: { available: false, error: null },
  });

  const [mock, setMock] = useState([]);

  // Mock data for charts
  const userGrowthData = [
    { name: "Jan", users: 40 },
    { name: "Feb", users: 85 },
    { name: "Mar", users: 120 },
    { name: "Apr", users: 175 },
    { name: "May", users: 220 },
    { name: "Jun", users: 245 },
  ];

  const postsStatusData = [
    { name: "Active", value: 254, color: "#4F46E5" },
    { name: "Pending", value: 48, color: "#EAB308" },
    { name: "Rejected", value: 22, color: "#EF4444" },
  ];

  const COLORS = ["#4F46E5", "#EAB308", "#EF4444"];

  // Mock user data
  const mockUsers = [
    {
      _id: "1",
      fullname: { firstname: "John", lastname: "Doe" },
      email: "john.doe@example.com",
      role: "admin",
    },
    {
      _id: "2",
      fullname: { firstname: "Jane", lastname: "Smith" },
      email: "jane.smith@example.com",
      role: "worker",
    },
    {
      _id: "3",
      fullname: { firstname: "Robert", lastname: "Johnson" },
      email: "robert.j@example.com",
      role: "user",
    },
    {
      _id: "4",
      fullname: { firstname: "Emily", lastname: "Davis" },
      email: "emily.d@example.com",
      role: "worker",
    },
    {
      _id: "5",
      fullname: { firstname: "Michael", lastname: "Brown" },
      email: "michael.b@example.com",
      role: "user",
    },
  ];

  // Mock work posts data
  const mockWorkPosts = [
    {
      _id: "1",
      title: "Website Development Project",
      user: { fullname: { firstname: "Jane", lastname: "Smith" } },
      status: "accept",
    },
    {
      _id: "2",
      title: "Logo Design for StartUp",
      user: { fullname: { firstname: "Robert", lastname: "Johnson" } },
      status: "pending",
    },
    {
      _id: "3",
      title: "Mobile App UI Design",
      user: { fullname: { firstname: "Emily", lastname: "Davis" } },
      status: "accept",
    },
    {
      _id: "4",
      title: "Content Writing for Blog",
      user: { fullname: { firstname: "Michael", lastname: "Brown" } },
      status: "rejected",
    },
    {
      _id: "5",
      title: "Social Media Marketing Campaign",
      user: { fullname: { firstname: "Jane", lastname: "Smith" } },
      status: "pending",
    },
  ];

  // Fetch data function
  useEffect(() => {
    const fetchData = async () => {
      // Try fetching users from the available API endpoint
      fetchUsers();
      fetchWorkers();
      fetchWorkPosts();

      // For other endpoints that aren't ready yet, use placeholders
      // but still show something on the screen
      setWorkPosts(mockWorkPosts);
      setLoadingPosts(false);
      setApiStatus((prev) => ({
        ...prev,
        workPosts: {
          available: false,
          error: "API endpoint not available yet",
        },
      }));

      setLoadingStats(false);
      setApiStatus((prev) => ({
        ...prev,
        stats: { available: false, error: "API endpoint not available yet" },
      }));
    };

    fetchData();
  }, []);

  // These functions handle API calls with proper error handling
  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && Object.keys(response.data).length > 0) {
        setStats(response.data);
        setApiStatus((prev) => ({
          ...prev,
          stats: { available: true, error: null },
        }));
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
      // Keep the UI visible but mark API as unavailable
      setApiStatus((prev) => ({
        ...prev,
        stats: { available: false, error: err.message },
      }));
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ""}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
        setApiStatus((prev) => ({
          ...prev,
          users: { available: true, error: null },
        }));
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      // Fallback to mock data but indicate API is unavailable
      setUsers(mockUsers);
      setApiStatus((prev) => ({
        ...prev,
        users: { available: false, error: err.message },
      }));
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchWorkers = async () => {
    try {
      setLoadingUsers(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ""}/admin/workers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setWorkers(response.data);
        setApiStatus((prev) => ({
          ...prev,
          workers: { available: true, error: null },
        }));
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      // Fallback to mock data but indicate API is unavailable
      setWrokers(mockUsers);
      setApiStatus((prev) => ({
        ...prev,
        workers: { available: false, error: err.message },
      }));
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchWorkPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/workpost`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setWorkPosts(response.data);
        setMock(response.data);
        setApiStatus((prev) => ({
          ...prev,
          workPosts: { available: true, error: null },
        }));
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      console.error("Failed to fetch work posts:", err);
      // Fallback to mock data
      setWorkPosts(mockWorkPosts);
      setApiStatus((prev) => ({
        ...prev,
        workPosts: { available: false, error: err.message },
      }));
    } finally {
      setLoadingPosts(false);
    }
  };

  // Refresh all data
  const refreshData = () => {
    // Try to fetch from available endpoints
    fetchUsers();
    fetchWorkers();
    fetchWorkPosts();

    // For endpoints that aren't ready, still update UI
    setWorkPosts(mockWorkPosts);
    setLoadingPosts(false);

    // Set mock stats with N/A values
    setStats({
      totalUsers: "N/A",
      totalWorkers: "N/A",
      totalPosts: "-",
      pendingPosts: "-",
      activePosts: "-",
    });
    setLoadingStats(false);
  };
  console.log(mock);

  const StatCard = ({ title, value, icon: Icon, color, isLoading }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          {isLoading ? (
            <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
          ) : (
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // API Status indicator component
  const ApiStatusBadge = ({ available, endpoint }) => (
    <div
      className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
        available
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {available ? (
        "Live API"
      ) : (
        <>
          <Info className="w-3 h-3" />
          <span>Mock Data ({endpoint} API in development)</span>
        </>
      )}
    </div>
  );

  // Create a component for loading table rows
  const LoadingTableRows = ({ columns }) => (
    <>
      {[1, 2, 3].map((item) => (
        <tr key={`loading-${item}`} className="border-b">
          {Array(columns)
            .fill(0)
            .map((_, index) => (
              <td key={`loading-cell-${index}`} className="py-3 px-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            ))}
        </tr>
      ))}
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={refreshData}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {/* API Status Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-blue-700">
          <Info className="w-5 h-5" />
          <p>
            API Status: <span className="font-medium">/admin/users</span>{" "}
            endpoint is available. Other endpoints are in development.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={Users}
          color="bg-blue-500"
          isLoading={loadingStats}
        />
        <StatCard
          title="Total Workers"
          value={workers.length}
          icon={Briefcase}
          color="bg-green-500"
          isLoading={loadingStats}
        />
        <StatCard
          title="Total Posts"
          value={mock.length}
          icon={FileText}
          color="bg-purple-500"
          isLoading={loadingStats}
        />
        <StatCard
          title="Pending Posts"
          value={stats.pendingPosts}
          icon={Clock}
          color="bg-yellow-500"
          isLoading={loadingStats}
        />
        <StatCard
          title="Active Posts"
          value={stats.activePosts}
          icon={CheckCircle}
          color="bg-indigo-500"
          isLoading={loadingStats}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart4 className="w-5 h-5 text-gray-500" />
              <h2 className="text-xl font-semibold">User Growth</h2>
            </div>
            <ApiStatusBadge available={false} endpoint="stats" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#4F46E5"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Posts Status Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-gray-500" />
              <h2 className="text-xl font-semibold">Posts Status</h2>
            </div>
            <ApiStatusBadge available={false} endpoint="stats" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsChart>
              <Pie
                data={postsStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {postsStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserCog className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold">Users Management</h2>
          </div>
          <ApiStatusBadge
            available={apiStatus.users.available}
            endpoint="users"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadingUsers ? (
                <LoadingTableRows columns={4} />
              ) : Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{`${
                      user.fullname?.firstname || "N/A"
                    } ${user.fullname?.lastname || ""}`}</td>
                    <td className="py-3 px-4">{user.email || "N/A"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : user.role === "worker"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role || "N/A"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() =>
                          console.log("Edit user placeholder:", user._id)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() =>
                          console.log("Delete user placeholder:", user._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Work Posts Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold">Work Posts Management</h2>
          </div>
          <ApiStatusBadge
            available={apiStatus.workPosts.available}
            endpoint="work-posts"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Posted By</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadingPosts ? (
                <LoadingTableRows columns={4} />
              ) : Array.isArray(workPosts) && workPosts.length > 0 ? (
                workPosts.map((post) => (
                  <tr key={post._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{post.title || "N/A"}</td>
                    <td className="py-3 px-4">
                      {post.user?.fullname?.firstname || "N/A"}{" "}
                      {post.user?.fullname?.lastname || ""}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          post.status === "accept"
                            ? "bg-green-100 text-green-800"
                            : post.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.status || "N/A"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() =>
                          console.log("View post placeholder:", post._id)
                        }
                      >
                        View
                      </button>
                      <button
                        className="text-green-500 hover:text-green-700 mr-2"
                        onClick={() =>
                          console.log("Approve post placeholder:", post._id)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() =>
                          console.log("Reject post placeholder:", post._id)
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No work posts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer with API development notice */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Some features are displaying placeholder data while API endpoints are
          being developed. Currently only the{" "}
          <span className="font-medium">/admin/users</span> endpoint is
          available.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
