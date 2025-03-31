import axios from "axios";
import React, { useState } from "react";
import ApplyButton from "./ApplyButton";
import ApplyInputButton from "./ApplyInputButton";

function SearchWorkCard({ work }) {
  const [apply, setApply] = useState(true);

  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    return;
  }
  const [status, setStatus] = useState(work.status);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/worker/acceptorreject/${work._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );

      setStatus(newStatus);
      console.log("Work status updated:", response.data);
    } catch (error) {
      console.error("Error updating work status:", error);
      alert("Failed to update work status");
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <img
        src={work.picture || "/placeholder-product.jpg"}
        alt={work.title}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-lg font-medium mb-2">{work.title}</h2>
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        {work.description.split(" ").slice(0, 10).join(" ")}...
      </div>

      {/* Dropdowns Row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="border rounded px-2 py-1">
          {work.location.split(",")[0]}
        </div>
        <div className="border rounded px-2 py-1">{work.serviceType}</div>
        <div className="border rounded px-2 py-1 text-sm">
          {work.createdAt
            ? new Date(work.createdAt)
                .toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", "")
            : "N/A"}
        </div>
      </div>

      {/* Price and Status Update Buttons */}
      <div className="flex justify-between items-center w-full ">
        <div className="text-lg font-medium">Budget: ₹{work.budget}</div>
        <div className="">
          {apply ? (
            <>
              <ApplyButton setApply={setApply} />
            </>
          ) : (
            <>
              <ApplyInputButton work={work._id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchWorkCard;
