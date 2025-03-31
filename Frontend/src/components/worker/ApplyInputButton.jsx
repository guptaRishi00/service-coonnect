import React, { useState } from "react";
import axios from "axios";

import { ImSpinner2 } from "react-icons/im";

export default function ApplyInputButton({ work }) {
  const [biddingPrice, setBiddingPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const token = localStorage.getItem("token") || null;

  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/worker/workapplication/${work}`,
      { biddingPrice },
      {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    setLoading(false);
    setDone(true);
  };

  return (
    <>
      {done ? (
        <>
          <div className="border rounded-lg px-4 py-2 flex items-center gap-2 text-green-500 bg-gray-100 border-green-500">
            Done
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <>
              <div className="border rounded-lg px-4 py-2 flex items-center gap-2 text-blue-500 bg-gray-100">
                <span className="animate-spin">
                  <ImSpinner2 />
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 justify-end">
                <input
                  type="text"
                  className="px-4 py-2 rounded-lg w-1/2 border border-blue-500"
                  value={biddingPrice}
                  onChange={(e) => setBiddingPrice(e.target.value)}
                />
                <button
                  className="border rounded-lg px-4 py-2 flex items-center gap-2 text-blue-500 bg-gray-100"
                  onClick={handleSubmit}
                >
                  Apply
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
