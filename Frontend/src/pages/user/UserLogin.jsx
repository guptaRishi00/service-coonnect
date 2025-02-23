import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { fetchUser, loginSuccess } from "../../features/auth/UserAuthSlice";

import { useDispatch } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import logo from "../../assets/logo1.png";
import globe from "../../assets/girl_side.jpg";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen bg-white">
      {/* Form Section */}
      <div className="p-10 flex flex-col justify-start items-start gap-8 lg:w-1/2 bg-white">
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="w-16" />
        </Link>

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
            />
          </div>

          {/* Login Button */}
          <button
            className="rounded-md px-4 py-3 bg-[#FFBE98] font-medium text-gray-900 hover:bg-[#ffa474] transition"
            onClick={(e) => submitHandler(e)}
          >
            Log in
          </button>

          {/* Divider */}
          <div className="flex items-center w-full gap-3">
            <div className="border-t border-gray-300 w-full"></div>
            <p className="text-sm text-gray-500">OR</p>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          {/* Google Login */}
          <button className="rounded-md px-4 py-3 border border-blue-500 flex items-center justify-center gap-4 font-medium text-blue-500 hover:bg-blue-100 transition">
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
