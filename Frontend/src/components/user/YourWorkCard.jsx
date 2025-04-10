import React from "react";
import { FaCircle } from "react-icons/fa6";

function YourWorkCard({ work }) {
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

      {/* Price and Add to Cart */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium">Budget: ₹{work.budget}</div>
        {work.status && (
          <button
            className={`border rounded-lg px-4 py-2 flex items-center gap-2 bg-gray-100
     
      
      `}
          >
            <span
              className={` ${
                work.status === "pending" ? "text-yellow-400 " : ""
              } ${work.status === "accepted" ? "text-green-400 " : ""} ${
                work.status === "rejected" ? "text-red-400 " : ""
              }`}
            >
              <FaCircle size={8} />
            </span>
            <span className="text-blue-500">{work.status}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default YourWorkCard;
