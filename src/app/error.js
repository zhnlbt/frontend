"use client";
import React from "react";
import { Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

export default function UnderConst() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-5 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-semibold text-gray-800">MyJob</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Our website is under construction
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                In ac turpis mi. Donec quis semper neque. Nulla cursus gravida
                interdum. Curabitur luctus sapien.
              </p>
            </div>

            {/* Email Subscription */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                <span>Subscribe</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main illustration area - simplified representation */}
              <div >
                <div className="flex items-center justify-center space-x-6">
                  {/* Robot/Computer character */}
                  <div className="flex justify-center items-center">
                    <Image
                      src="/const.png"
                      alt="Under construction illustration"
                      width={700}
                      height={700}
                      className="max-w-full h-auto"
                      priority
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-100 rounded-full"></div>
                <div className="absolute top-8 -left-2 w-4 h-4 bg-blue-300 rounded-full"></div>
                <div className="absolute bottom-4 right-8 w-6 h-6 bg-blue-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Social Links */}
          <div>
            <p className="text-gray-600 mb-3">Follow us</p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © 2024 MyJob - Job Portal. All rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
