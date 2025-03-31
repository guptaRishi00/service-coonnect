import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import logo from "../../assets/logo1.png";
import sidemap from "../../assets/sidemap.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      phone: phone,
      address: {
        street: street,
        city: city,
        state: state,
        zipcode: zipcode,
        country: country,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        user
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        console.log("User Registered Successfully", data);
      }

      navigate("/home");

      setEmail("");
      setFirstname("");
      setLastname("");
      setPassword("");
      setPhone("");
      setStreet("");
      setCity("");
      setState("");
      setZipcode("");
      setCountry("");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen bg-white">
      {/* Form Section */}
      <div className="p-10 flex flex-col justify-start items-start gap-8 lg:w-1/2 bg-white rounded-lg">
        {/* <Link to={"/"}>
          <img src={logo} alt="Logo" className="w-16" />
        </Link> */}

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl lg:text-3xl">
            Get started with your account today.
          </h1>
          <p className="text-sm font-medium text-gray-600">
            We provide excellent service.
          </p>
        </div>

        <form className="w-full flex flex-col gap-5">
          {/* Input Fields */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">First Name*</p>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Last Name*</p>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Email*</p>
            <input
              type="email"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Password*</p>
            <input
              type="password"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Phone*</p>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Address Fields */}
          <div className="flex flex-col">
            <p className="text-md font-medium text-gray-400 mb-2">Address:</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <p className="text-md font-medium">Street*</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98] w-full"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <p className="text-md font-medium">City*</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98] w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <p className="text-md font-medium">State*</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98] w-full"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <p className="text-md font-medium">Zipcode*</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98] w-full"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <p className="text-md font-medium">Country*</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98] w-full"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            className="rounded-md px-4 py-3 bg-[#FFBE98] font-medium text-gray-900 hover:bg-[#ffa474] transition"
            onClick={(e) => submitHandler(e)}
          >
            Create my account
          </button>

          {/* Divider */}
          <div className="flex items-center w-full gap-3">
            <div className="border-t border-gray-300 w-full"></div>
            <p className="text-sm text-gray-500">OR</p>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          {/* Google Signup */}
          <button className="rounded-md px-4 py-3 border border-blue-500 flex items-center justify-center gap-4 font-medium text-blue-500 hover:bg-blue-100 transition">
            <FaGoogle />
            Sign up with Google
          </button>
        </form>

        <div className="bg-white w-full flex flex-col gap-2">
          <p className="text-sm font-medium">
            Already have an account?{" "}
            <span className="text-blue-500 underline cursor-pointer">
              <Link to={"/user-login"}>Log in</Link>
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
        <img src={sidemap} alt="Globe" className="object-cover h-full w-full" />
      </div>
    </div>
  );
}

export default UserRegister;
