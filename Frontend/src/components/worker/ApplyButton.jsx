import React from "react";

function ApplyButton({ setApply }) {
  return (
    <button
      className="border rounded-lg px-4 py-2 flex items-center gap-2 text-blue-500 bg-gray-100"
      onClick={() => setApply(false)}
    >
      Apply
    </button>
  );
}

export default ApplyButton;
