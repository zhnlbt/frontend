'use client'
import { BriefcaseBusiness } from "lucide-react";
import { useState } from "react";

export default function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerify = () => {
    // Handle verification logic here
    console.log("Verifying code:", verificationCode);
  };

  const handleResend = () => {
    // Handle resend logic here
    console.log("Resending verification code");
  };

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Header */}
    <div className="pt-8 pb-4 px-8 flex justify-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <BriefcaseBusiness className="h-10 w-10 text-[#0A65CC] font-light" />
        </div>
        <span className="text-2xl font-medium text-gray-900">MyJob</span>
      </div>
    </div>

    {/* Main Content */}
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8">
            Email Verification
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            We've sent a verification to{" "}
            <span className="font-medium text-gray-900">emailaddress@gmail.com</span>{" "}
            to verify your email address and activate your account.
          </p>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center text-lg tracking-wider"
            />
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-[#0A65CC] text-white py-3 px-4 rounded-sm font-medium hover:bg-blue-700 transition-colors duration-200 mb-6 flex items-center justify-center space-x-2"
          >
            <span>Verify My Account</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="text-center">
            <span className="text-gray-600">Didn't receive any code? </span>
            <button
              onClick={handleResend}
              className="text-[#0A65CC] hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}