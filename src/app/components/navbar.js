"use client";
import { Search, Phone, ChevronDown, BriefcaseBusiness } from "lucide-react";
import LanguageDropdown from "./dropDown";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Header = () => {
   const router = useRouter()

  const handlePostAJob = () => {
  router.push("/postAJob")
  }
  const handleSignIn = () => {
    router.push("/SignIn")
  }
  return (
    <div className="bg-white border-b border-gray-200 font-in text-sm">
      <div className="border-b border-gray-100 text-gray-600 bg-[#F1F2F4] p-1">
        <div className="max-w-5/7 mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10 text-sm">
          <div className="flex space-x-6">
            <Link href="/">Home</Link>
            <Link href="/findjob">Find Job</Link>
            <Link href="/employers">Employers</Link>
            <Link href="/pricingplans">Pricing Plans</Link>
            <Link href="/support">Customer Support</Link>
          </div>

          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+1-202-555-0178</span>
            </div>
            <div className="flex items-center space-x-1">
              {/* <span className="text-xl">🇺🇸</span>
              <span>English</span>
              <ChevronDown className="h-4 w-4" /> */}
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-5/7 mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <BriefcaseBusiness className="h-10 w-10 text-[#0A65CC] font-light" />
              </div>
              <span className="text-2xl font-medium text-gray-900">MyJob</span>
            </div>

            {/* Country Selector + Search */}
            <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden w-[420px]">
              <div className="flex items-center px-3 space-x-1 text-gray-600 border-r border-gray-200">
                <span className="text-lg">🇮🇳</span>
                <span className="text-sm">India</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#0066FF]" />
                <input
                  type="text"
                  placeholder="Job title, keyword, company"
                  className="text-gray-600 pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0A65CC] focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Buttons */}
          <div className="flex items-center space-x-4">
            <button 
            onClick={handleSignIn}
            className="px-6 py-3 text-[#0A65CC] hover:text-blue-700 font-semibold border border-[#CEE0F5] rounded-none">
              Sign In
            </button>
            <button 
            onClick={handlePostAJob}
            className="bg-[#0A65CC] text-white px-6 py-3 rounded-none hover:bg-blue-700 transition-colors font-semibold">
              Post A Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
