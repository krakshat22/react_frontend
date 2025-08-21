import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Logo from '../assets/Logo.jpg';
import Footer from "./common/Footer";

const UploadResult = ({
  status, // "success" or "failure"
  tripId,
  dateTime,
  message,
  actionLabel,
  actionColor,
  onAction,
  showCancel,
  onCancel,
}) => {
  const isSuccess = status === "success";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">

      {/* Top: Logo */}
      <div>
        <img src={Logo} alt="Boss Logo" className="w-40 mx-auto mt-8 mb-5" />
        
        <div className="flex flex-col items-center">

          {/* Icon */}
          {isSuccess ? (
            <CheckCircle className="text-green-500 mt-6" size={64} />
          ) : (
            <XCircle className="text-red-500 mt-6" size={64} />
          )}

          {/* Title */}
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">
            {isSuccess ? "Upload Successful" : "Upload Failed"}
          </h2>

          {/* Sub Info */}
          <p className="text-gray-600 mt-2">Trip ID: {tripId}</p>
          {dateTime && (
            <p className="text-gray-400 text-sm">
              {isSuccess ? "Uploaded on" : "Attempted on"} {dateTime}
            </p>
          )}

          {/* Message */}
          <p className="mt-6 text-center text-base text-gray-700 max-w-md px-4">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="w-full max-w-xs flex flex-col gap-4 mt-10 mb-2 px-2">
            <button
              className={`rounded-lg py-3 font-medium w-full ${actionColor}`}
              onClick={onAction}
            >
              {actionLabel}
            </button>
            {showCancel && (
              <button
                className="rounded-lg py-3 font-medium w-full bg-gray-100 text-gray-700"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default UploadResult;
