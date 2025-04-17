import { useState } from "react";
import { ArrowLeft, CreditCard, Shield, Briefcase } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentPage() {
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const navigate = useNavigate();

  const { name } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-2" onClick={() => navigate("/chat")}>
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-medium">SecurePay UPI</h1>
          </div>
          <div className="flex items-center">
            <Shield size={18} className="mr-1" />
            <span className="text-xs font-medium">SECURED</span>
          </div>
        </div>

        {/* QR Code Area */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Scan QR Code to Pay
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Open your UPI app and scan this code to make payment
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 border-2 border-gray-200 bg-white flex items-center justify-center rounded-lg overflow-hidden shadow-md p-3">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* QR Code - More realistic pattern */}
                  <rect x="0" y="0" width="100" height="100" fill="white" />

                  {/* Position detection patterns (corners) */}
                  {/* Top-left */}
                  <rect x="5" y="5" width="12" height="12" fill="black" />
                  <rect x="7" y="7" width="8" height="8" fill="white" />
                  <rect x="9" y="9" width="4" height="4" fill="black" />

                  {/* Top-right */}
                  <rect x="83" y="5" width="12" height="12" fill="black" />
                  <rect x="85" y="7" width="8" height="8" fill="white" />
                  <rect x="87" y="9" width="4" height="4" fill="black" />

                  {/* Bottom-left */}
                  <rect x="5" y="83" width="12" height="12" fill="black" />
                  <rect x="7" y="85" width="8" height="8" fill="white" />
                  <rect x="9" y="87" width="4" height="4" fill="black" />

                  {/* Alignment pattern */}
                  <rect x="73" y="73" width="8" height="8" fill="black" />
                  <rect x="75" y="75" width="4" height="4" fill="white" />
                  <rect x="76" y="76" width="2" height="2" fill="black" />

                  {/* Timing patterns */}
                  {[0, 2, 4, 6, 8, 10, 12].map((i) => (
                    <rect
                      key={`h-${i}`}
                      x={5 + i * 2}
                      y="17"
                      width="2"
                      height="2"
                      fill="black"
                    />
                  ))}
                  {[0, 2, 4, 6, 8, 10, 12].map((i) => (
                    <rect
                      key={`v-${i}`}
                      x="17"
                      y={5 + i * 2}
                      width="2"
                      height="2"
                      fill="black"
                    />
                  ))}

                  {/* QR Code data (random pattern) */}
                  {[
                    [5, 23],
                    [7, 23],
                    [11, 23],
                    [13, 23],
                    [17, 23],
                    [21, 23],
                    [25, 23],
                    [29, 23],
                    [5, 25],
                    [13, 25],
                    [17, 25],
                    [21, 25],
                    [29, 25],
                    [5, 27],
                    [9, 27],
                    [13, 27],
                    [21, 27],
                    [25, 27],
                    [29, 27],
                    [5, 29],
                    [9, 29],
                    [17, 29],
                    [21, 29],
                    [25, 29],
                    [29, 29],
                    [5, 31],
                    [13, 31],
                    [17, 31],
                    [21, 31],
                    [25, 31],
                    [29, 31],
                    [5, 33],
                    [7, 33],
                    [9, 33],
                    [11, 33],
                    [13, 33],
                    [17, 33],
                    [21, 33],
                    [25, 33],
                    [29, 33],
                    [33, 23],
                    [37, 23],
                    [41, 23],
                    [45, 23],
                    [49, 23],
                    [53, 23],
                    [57, 23],
                    [61, 23],
                    [65, 23],
                    [69, 23],
                    [73, 23],
                    [77, 23],
                    [33, 25],
                    [37, 25],
                    [41, 25],
                    [53, 25],
                    [57, 25],
                    [69, 25],
                    [73, 25],
                    [77, 25],
                    [33, 27],
                    [41, 27],
                    [45, 27],
                    [49, 27],
                    [53, 27],
                    [57, 27],
                    [61, 27],
                    [65, 27],
                    [73, 27],
                    [77, 27],
                    [33, 29],
                    [37, 29],
                    [41, 29],
                    [45, 29],
                    [57, 29],
                    [65, 29],
                    [69, 29],
                    [77, 29],
                    [33, 33],
                    [37, 33],
                    [41, 33],
                    [45, 33],
                    [49, 33],
                    [53, 33],
                    [57, 33],
                    [61, 33],
                    [65, 33],
                    [69, 33],
                    [73, 33],
                    [33, 37],
                    [41, 37],
                    [49, 37],
                    [57, 37],
                    [65, 37],
                    [73, 37],
                    [77, 37],
                    [33, 41],
                    [37, 41],
                    [41, 41],
                    [45, 41],
                    [49, 41],
                    [53, 41],
                    [57, 41],
                    [61, 41],
                    [65, 41],
                    [69, 41],
                    [73, 41],
                    [77, 41],
                    [5, 37],
                    [9, 37],
                    [13, 37],
                    [17, 37],
                    [21, 37],
                    [25, 37],
                    [29, 37],
                    [5, 41],
                    [13, 41],
                    [21, 41],
                    [29, 41],
                    [5, 45],
                    [9, 45],
                    [13, 45],
                    [17, 45],
                    [21, 45],
                    [25, 45],
                    [29, 45],
                    [5, 49],
                    [13, 49],
                    [21, 49],
                    [29, 49],
                    [5, 53],
                    [9, 53],
                    [13, 53],
                    [17, 53],
                    [21, 53],
                    [25, 53],
                    [29, 53],
                    [33, 45],
                    [41, 45],
                    [49, 45],
                    [57, 45],
                    [65, 45],
                    [73, 45],
                    [33, 49],
                    [37, 49],
                    [41, 49],
                    [45, 49],
                    [49, 49],
                    [53, 49],
                    [57, 49],
                    [61, 49],
                    [65, 49],
                    [69, 49],
                    [73, 49],
                    [77, 49],
                    [33, 53],
                    [41, 53],
                    [49, 53],
                    [57, 53],
                    [65, 53],
                    [73, 53],
                    [33, 57],
                    [37, 57],
                    [41, 57],
                    [45, 57],
                    [49, 57],
                    [53, 57],
                    [57, 57],
                    [61, 57],
                    [65, 57],
                    [69, 57],
                    [73, 57],
                    [77, 57],
                    [5, 57],
                    [9, 57],
                    [13, 57],
                    [17, 57],
                    [21, 57],
                    [25, 57],
                    [29, 57],
                    [5, 61],
                    [13, 61],
                    [21, 61],
                    [29, 61],
                    [5, 65],
                    [9, 65],
                    [13, 65],
                    [17, 65],
                    [21, 65],
                    [25, 65],
                    [29, 65],
                    [33, 61],
                    [41, 61],
                    [49, 61],
                    [57, 61],
                    [65, 61],
                    [73, 61],
                    [77, 61],
                    [33, 65],
                    [37, 65],
                    [41, 65],
                    [45, 65],
                    [49, 65],
                    [53, 65],
                    [57, 65],
                    [61, 65],
                    [65, 65],
                    [69, 65],
                    [73, 65],
                    [35, 67],
                    [39, 67],
                    [43, 67],
                    [47, 67],
                    [51, 67],
                    [55, 67],
                    [59, 67],
                    [63, 67],
                    [67, 67],
                    [71, 67],
                    [75, 67],
                    [33, 69],
                    [41, 69],
                    [49, 69],
                    [57, 69],
                    [65, 69],
                    [73, 69],
                    [77, 69],
                    [33, 73],
                    [37, 73],
                    [41, 73],
                    [45, 73],
                    [49, 73],
                    [53, 73],
                    [57, 73],
                    [61, 73],
                    [65, 73],
                    [69, 73],
                    [5, 69],
                    [9, 69],
                    [13, 69],
                    [17, 69],
                    [21, 69],
                    [25, 69],
                    [29, 69],
                    [5, 73],
                    [13, 73],
                    [21, 73],
                    [29, 73],
                    [5, 77],
                    [9, 77],
                    [13, 77],
                    [17, 77],
                    [21, 77],
                    [25, 77],
                    [29, 77],
                    [33, 77],
                    [41, 77],
                    [49, 77],
                    [57, 77],
                    [65, 77],
                    [73, 77],
                    [77, 77],
                  ].map(([x, y], i) => (
                    <rect
                      key={`data-${i}`}
                      x={x}
                      y={y}
                      width="2"
                      height="2"
                      fill="black"
                    />
                  ))}

                  {/* UPI Logo in center */}
                  <rect
                    x="40"
                    y="40"
                    width="20"
                    height="20"
                    fill="white"
                    stroke="black"
                    strokeWidth="0.5"
                    rx="2"
                  />
                  <text
                    x="50"
                    y="54"
                    fontSize="8"
                    fontWeight="bold"
                    textAnchor="middle"
                    fill="blue"
                  >
                    UPI
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex flex-col items-center text-center">
            <p className="text-green-600 font-medium">Ready to Scan</p>
            <p className="text-sm text-gray-600 mt-1">
              UPI ID: {name}@securepay
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Please Pay the asked amount
            </p>
            <button
              onClick={() => setIsHelpVisible(!isHelpVisible)}
              className="text-blue-600 text-xs mt-2 underline"
            >
              {isHelpVisible ? "Hide Help" : "Need Help?"}
            </button>

            {isHelpVisible && (
              <div className="mt-2 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                <p>1. Open any UPI app on your phone</p>
                <p>2. Select "Scan & Pay" option</p>
                <p>3. Point your camera at this QR code</p>
                <p>4. Confirm payment details and pay</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods & Security Badges */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-2">
              Supported Payment Methods
            </p>
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center bg-white p-1 rounded shadow-sm">
                <CreditCard size={16} className="text-blue-600 mr-1" />
                <span className="text-xs font-medium">UPI</span>
              </div>
              <div className="flex items-center bg-white p-1 rounded shadow-sm">
                <Briefcase size={16} className="text-blue-600 mr-1" />
                <span className="text-xs font-medium">Net Banking</span>
              </div>
              <div className="flex items-center bg-white p-1 rounded shadow-sm">
                <CreditCard size={16} className="text-blue-600 mr-1" />
                <span className="text-xs font-medium">Cards</span>
              </div>
            </div>

            <div className="flex items-center justify-center mt-3">
              <Shield size={14} className="text-green-600 mr-1" />
              <span className="text-xs text-gray-600">
                256-bit Encrypted & PCI DSS Compliant
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Powered by branding */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">Powered by</p>
        <div className="flex items-center justify-center mt-1">
          <div className="bg-blue-700 text-white px-2 py-1 rounded text-sm font-bold">
            SecurePay
          </div>
          <span className="text-xs text-gray-500 ml-1">Payment Services</span>
        </div>
      </div>
    </div>
  );
}
