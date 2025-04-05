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
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Email validation
    if (!email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setLoginError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

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

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }

        console.log("User Logged in Successfully", data);
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in", error);

      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 404) {
          setLoginError("Email not found. Please check your email or sign up.");
        } else if (error.response.status === 401) {
          setLoginError("Incorrect email or password. Please try again.");
        } else if (error.response.data && error.response.data.message) {
          setLoginError(error.response.data.message);
        } else {
          setLoginError("Login failed. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setLoginError(
          "Network error. Please check your connection and try again."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        setLoginError("An unexpected error occurred. Please try again.");
      }
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

        {/* Display login error message */}
        {loginError && (
          <div
            className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{loginError}</span>
          </div>
        )}

        <form className="w-full flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Email*</p>
            <input
              type="email"
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
                if (loginError) {
                  setLoginError("");
                }
              }}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Password*</p>
            <input
              type="password"
              className={`border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
                if (loginError) {
                  setLoginError("");
                }
              }}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
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
