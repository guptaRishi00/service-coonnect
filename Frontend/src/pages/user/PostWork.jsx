import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postWork } from "../../features/auth/PostWorkSlice"; // Import your Redux thunk
import { useNavigate } from "react-router-dom";

function PostWork() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    serviceType: "",
    location: "",
    budget: "",
  });
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const serviceTypes = [
    "Plumbing",
    "Renovation",
    "Painting",
    "Electric Work",
    "Carpentry",
    "roofing",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.serviceType) {
      newErrors.serviceType = "Service type is required";
    }
    if (!picture) {
      newErrors.picture = "Picture is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Set loading state to true
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("serviceType", formData.serviceType);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("budget", formData.budget);
      formDataToSend.append("picture", picture);

      // Dispatch the Redux async thunk to post work
      const resultAction = await dispatch(postWork(formDataToSend));

      if (postWork.fulfilled.match(resultAction)) {
        navigate("/user-yourwork");
      } else {
        console.error("Failed to post work:", resultAction.payload);
      }
    } catch (error) {
      console.error("Error creating work post:", error);
    } finally {
      // Set loading state back to false
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Form Section */}
      <div className="p-6 lg:p-10 flex flex-col justify-start items-start gap-6 lg:w-1/2 bg-white">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl lg:text-3xl">
            Post a New Work Opportunity
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Fill in the details to create your work posting
          </p>
        </div>

        <form className="w-full flex flex-col gap-5">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Title*</p>
            <input
              type="text"
              name="title"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter work title"
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Description*</p>
            <textarea
              name="description"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98] min-h-[120px]"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter work description"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Service Type Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Service Type*</p>
            <select
              name="serviceType"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98] bg-white"
              value={formData.serviceType}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="">Select service type</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.serviceType && (
              <p className="text-red-500 text-sm">{errors.serviceType}</p>
            )}
          </div>

          {/* Location Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Location</p>
            <input
              type="text"
              name="location"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location (optional)"
              disabled={isLoading}
            />
          </div>

          {/* Budget Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Budget</p>
            <input
              type="text"
              name="budget"
              className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFBE98]"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter budget (optional)"
              disabled={isLoading}
            />
          </div>

          {/* Picture Input */}
          <div className="flex flex-col gap-2">
            <p className="text-md font-medium">Picture*</p>
            <div className="flex flex-col items-center justify-center w-full">
              <label
                htmlFor="picture-upload"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {previewUrl ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id="picture-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  name="picture"
                  className="hidden"
                  disabled={isLoading}
                />
              </label>
            </div>
            {errors.picture && (
              <p className="text-red-500 text-sm">{errors.picture}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`rounded-md px-4 py-3 font-medium text-gray-900 transition mt-4 ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#FFBE98] hover:bg-[#ffa474]"
            }`}
            onClick={handleSubmit}
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
                Posting Work...
              </div>
            ) : (
              "Post Work"
            )}
          </button>
        </form>

        <div className="w-full flex flex-col gap-2">
          <p className="text-xs text-gray-600">
            By posting, you agree to Service Connect's{" "}
            <span className="text-blue-500 underline cursor-pointer">
              terms & conditions
            </span>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 hidden lg:block">
        <img
          src="https://cdn.leonardo.ai/users/2962f973-fdbc-4a12-9383-1d35e16370ea/generations/62a02624-3052-456b-997e-4f0b74ed2379/AlbedoBase_XL_A_home_with_a_modern_minimalist_design_featuring_0.jpg"
          alt="Work Illustration"
          className="object-cover w-full"
        />
      </div>
    </div>
  );
}

export default PostWork;
