import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { fetchUser, loginSuccess } from "../../features/auth/UserAuthSlice";

import { useDispatch } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import logo from "../../assets/logo1.png";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Set loading state to true when login starts
    setIsLoading(true);

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;

        dispatch(loginSuccess({ token: response.data.token }));
        await dispatch(fetchUser());

        console.log("User Logged in Successfully", data);
        navigate("/home");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in", error);
      // Optional: Add error handling, perhaps set an error state
    } finally {
      // Always set loading state back to false
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen bg-white">
      {/* Form Section */}
      <div className="p-10 flex flex-col justify-start items-start gap-8 lg:w-1/2 bg-white">
        {/* <Link to={"/"}>
          <img src={logo} alt="Logo" className="w-16" />
        </Link> */}

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl lg:text-3xl">
            Log in to your account.
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="w-full flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Email*</p>
            <input
              type="email"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Password*</p>
            <input
              type="password"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Login Button */}
          <button
            className={`rounded-md px-4 py-3 font-medium text-gray-900 transition ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#FFBE98] hover:bg-[#ffa474]"
            }`}
            onClick={(e) => submitHandler(e)}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Log in"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center w-full gap-3">
            <div className="border-t border-gray-300 w-full"></div>
            <p className="text-sm text-gray-500">OR</p>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          {/* Google Login */}
          <button
            className="rounded-md px-4 py-3 border border-blue-500 flex items-center justify-center gap-4 font-medium text-blue-500 hover:bg-blue-100 transition"
            disabled={isLoading}
          >
            <FaGoogle />
            Log in with Google
          </button>
        </form>

        <div className="bg-white w-full flex flex-col gap-2">
          <p className="text-sm font-medium">
            Don't have an account?{" "}
            <span className="text-blue-500 underline cursor-pointer">
              <Link to={"/user-register"}>Sign up</Link>
            </span>{" "}
          </p>
          <p className="text-xs text-gray-600">
            By signing up, I agree to Service Connect's{" "}
            <span className="text-blue-500 underline">terms & conditions</span>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 hidden lg:block">
        <img
          src="https://cdn.midjourney.com/3f7606dc-4c9f-44b1-9df9-85e85b641605/0_0.png"
          alt="Globe"
          className="object-cover h-screen w-full"
          style={{ animationDuration: "10s" }}
        />
      </div>
    </div>
  );
}

export default UserLogin;
