import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import Footer from "../components/common/Footer";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    if (secondsLeft === 0) {
      setExpired(true);
      return;
    }
    const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [secondsLeft]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    // Move focus to next input box
    if (idx < inputs.current.length - 1) {
      inputs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs.current[idx - 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.every((digit) => digit !== "")) {
      // Implement actual OTP verification API call here

      // Navigate on success
      navigate("/document-upload");
    } else {
      alert("Please enter the 4-digit OTP code");
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setSecondsLeft(30);
    setExpired(false);
    inputs.current[0].focus();
    // Implement your resend API call here
  };

  // Format timer MM:SS with animated style
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `00:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <div>
        {/* Logo */}
        <img src={Logo} alt="BOSS Logo" className="w-40 mx-auto mt-8" />
        {/* WhatsApp icon */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Icon"
          className="w-12 mx-auto mt-6 mb-4"
        />

        <h2 className="text-center text-2xl font-semibold text-gray-900">
          {t("verification_header")}
        </h2>
        <p className="text-center text-gray-500 mt-2">
          <span className="mx-1">{t("verification_message")}</span> <br />
          <span className="font-semibold text-gray-700">+60 55511 12456</span>
        </p>

        {/* OTP Input Boxes */}
        <div className="flex justify-center mt-6 space-x-4 mb-4">
          {otp.map((value, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={value}
              className="w-14 h-16 border border-gray-300 rounded-xl text-center text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputs.current[idx] = el)}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center text-gray-500 text-sm mb-1 relative">
          {t("code_expires_in")} {formatTime(secondsLeft)}
        </div>

        {/* Resend link */}
        <div className="text-center text-sm mb-6">
          {t("code_expired")}{" "}
          <button
            className={`font-medium ${
              expired ? "text-blue-600" : "text-gray-300 cursor-not-allowed"
            }`}
            onClick={handleResend}
            disabled={!expired}
          >
            {t("resend")}
          </button>
        </div>

        {/* Verify Button */}
        <div className="px-6 mb-3">
          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl shadow text-lg"
          >
            {t("verify")}
          </button>
        </div>
        <div className="flex justify-center mb-8">
          <LanguageSelector />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OtpVerification;
