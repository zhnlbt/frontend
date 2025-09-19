"use client";
// import { BriefcaseBusiness } from "lucide-react";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const SignIn = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle sign in logic here
//     console.log("Sign in attempt:", { email, password, rememberMe });
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Sign In Form */}
//       <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-white">
//         <div className="max-w-md mx-auto w-full">
//           {/* Logo */}
//           <div className="flex flex-start">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center">
//                 <BriefcaseBusiness className="h-10 w-10 text-[#0A65CC] font-light" />
//               </div>
//               <span className="text-3xl font-medium text-gray-900">MyJob</span>
//             </div>
//           </div>

//           {/* Sign In Form */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
//               <p className="text-gray-600">
//                 Don't have account{" "}
//                 <Link
//                   href="/signup"
//                   className="text-blue-600 hover:text-blue-500"
//                 >
//                   Create Account
//                 </Link>
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Field */}
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                   required
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     {showPassword ? (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
//                       />
//                     ) : (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     )}
//                   </svg>
//                 </button>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="ml-2 text-gray-600 text-sm">
//                     Remember Me
//                   </span>
//                 </label>
//                 <Link
//                   href="/forgot-password"
//                   className="text-blue-600 hover:text-blue-500 text-sm"
//                 >
//                   Forget password
//                 </Link>
//               </div>

//               {/* Sign In Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
//               >
//                 Sign In
//                 <svg
//                   className="w-4 h-4 ml-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>

//               {/* Divider */}
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">or</span>
//                 </div>
//               </div>

//               {/* Social Login Buttons */}
//               <div className="space-y-3">
//                 <button
//                   type="button"
//                   className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <svg
//                     className="w-5 h-5 mr-3 text-blue-600"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       fill="currentColor"
//                       d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
//                     />
//                   </svg>
//                   <span className="text-gray-700">Sign in with Facebook</span>
//                 </button>

//                 <button
//                   type="button"
//                   className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
//                     <path
//                       fill="#4285F4"
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                     />
//                     <path
//                       fill="#34A853"
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                     />
//                     <path
//                       fill="#FBBC05"
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                     />
//                     <path
//                       fill="#EA4335"
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                     />
//                   </svg>
//                   <span className="text-gray-700">Sign in with Google</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Background with Stats */}
//       <div className="flex-1 relative bg-gray-900 hidden lg:block">
//         {/* Checker Pattern Background */}
//         <div className="absolute inset-0 opacity-80">
//           <Image
//             src="/Checker.png"
//             alt="Background pattern"
//             fill
//             className="object-cover object-center"
//             priority
//           />
//         </div>

//         {/* Dark overlay */}
//         <div className="absolute inset-0 bg-gray-500 bg-opacity-90"></div>

//         {/* Content */}
//         <div className="relative z-10 flex flex-col justify-center items-center h-full px-8 text-center text-white">
//           <div className="max-w-lg">
//             <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
//               Over 1,75,324 candidates waiting for good employees.
//             </h2>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-8 mt-12">
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 inline-flex">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <div className="text-2xl font-bold">1,75,324</div>
//                 <div className="text-gray-300 text-sm">Live Job</div>
//               </div>

//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 inline-flex">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
//                     <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//                   </svg>
//                 </div>
//                 <div className="text-2xl font-bold">97,354</div>
//                 <div className="text-gray-300 text-sm">Companies</div>
//               </div>

//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 inline-flex">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <div className="text-2xl font-bold">7,532</div>
//                 <div className="text-gray-300 text-sm">New Jobs</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { BriefcaseBusiness } from 'lucide-react';

// const SignInPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle sign in logic here
//     console.log('Sign in attempt:', { email, password, rememberMe });
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Sign In Form */}
//       <div className="flex-1 flex flex-col px-8 lg:px-16 bg-white">
//         {/* Logo */}
//         <div className="pt-8 pb-4">
//           <div className="flex items-center">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center">
//                 <BriefcaseBusiness className="h-10 w-10 text-[#0A65CC] font-light" />
//               </div>
//               <span className="text-2xl font-medium text-gray-900">MyJob</span>
//             </div>
//           </div>
//         </div>

//         {/* Sign In Form */}
//         <div className="flex-1 flex flex-col justify-center">
//           <div className="max-w-md mx-auto w-full">
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
//               <p className="text-gray-600">
//               {' Dont have account'}
//                 <Link href="/signUp" className="text-blue-600 hover:text-blue-500">
//                   Create Account
//                 </Link>
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Field */}
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                   required
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {showPassword ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     )}
//                   </svg>
//                 </button>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="ml-2 text-gray-600 text-sm">Remember Me</span>
//                 </label>
//                 <Link href="/forgot-password" className="text-blue-600 hover:text-blue-500 text-sm">
//                   Forget password
//                 </Link>
//               </div>

//               {/* Sign In Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
//               >
//                 Sign In
//                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>

//               {/* Divider */}
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">or</span>
//                 </div>
//               </div>

//               {/* Social Login Buttons */}
//               <div className="space-y-3">
//                 <button
//                   type="button"
//                   className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <svg className="w-5 h-5 mr-3 text-blue-600" viewBox="0 0 24 24">
//                     <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                   </svg>
//                   <span className="text-gray-700">Sign in with Facebook</span>
//                 </button>

//                 <button
//                   type="button"
//                   className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </svg>
//                   <span className="text-gray-700">Sign in with Google</span>
//                 </button>
//               </div>
//             </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Background with Stats */}
//       <div className="flex-1 relative bg-gray-900 hidden lg:block">
//         {/* Checker Pattern Background */}
//         <div className="absolute inset-0 opacity-80">
//           <Image
//             src="/Checker.png"
//             alt="Background pattern"
//             fill
//             className="object-cover object-center"
//             priority
//           />
//         </div>
        
//         {/* Dark overlay */}
//         <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        
//         {/* Content */}
//         <div className="relative z-10 flex flex-col justify-center items-center h-full px-8 text-center text-white">
//           <div className="max-w-lg">
//             <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
//               Over 1,75,324 candidates waiting for good employees.
//             </h2>
            
//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-8 mt-12">
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 inline-flex">
//                   <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="text-2xl font-bold">1,75,324</div>
//                 <div className="text-gray-300 text-sm">Live Job</div>
//               </div>
              
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 inline-flex">
//                   <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
//                     <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
//                   </svg>
//                 </div>
//                 <div className="text-2xl font-bold">97,354</div>
//                 <div className="text-gray-300 text-sm">Companies</div>
//               </div>
              
//               <div className="text-center">
//                 <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 inline-flex">
//                   <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="text-2xl font-bold">7,532</div>
//                 <div className="text-gray-300 text-sm">New Jobs</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;




// app/signIn/page.js
// 'use client';

// import { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@/context/UserContext';

// export default function SignInPage() {
//   const router = useRouter();
//   const { login } = useUser();
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await fetch('http://localhost:5000/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email.trim(),
//           password: formData.password
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Login failed');
//       }

//       // Use context to login
//       login(data.user, {
//         accessToken: data.accessToken,
//         refreshToken: data.refreshToken
//       });

//       // Reset form
//       setFormData({
//         email: '',
//         password: ''
//       });

//       // Redirect based on user role
//       switch (data.user.role) {
//         case 'ADMIN':
//           router.push('/admin/dashboard');
//           break;
//         case 'EMPLOYER':
//           router.push('/employer/dashboard');
//           break;
//         case 'CANDIDATE':
//           router.push('/candidate/dashboard');
//           break;
//         default:
//           router.push('/dashboard');
//       }

//     } catch (err) {
//       setError(err.message || 'Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };


// }


// // 'use client';

// // import { useState } from 'react';
// // import { Eye, EyeOff } from 'lucide-react';
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';

// // export default function SignInPage() {
// //   const router = useRouter();
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: ''
// //   });
  
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [rememberMe, setRememberMe] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState(false);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //     // Clear error when user starts typing
// //     if (error) setError('');
// //   };

// //   const validateForm = () => {
// //     if (!formData.email.trim()) return 'Email is required';
// //     if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email';
// //     if (!formData.password) return 'Password is required';
// //     return '';
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     const validationError = validateForm();
// //     if (validationError) {
// //       setError(validationError);
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError('');

// //     try {
// //       const response = await fetch('http://localhost:5000/api/users/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           email: formData.email.trim(),
// //           password: formData.password
// //         }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.error || 'Login failed');
// //       }

// //       // Login successful
// //       setSuccess(true);
      
// //       // Store tokens
// //       localStorage.setItem('accessToken', data.accessToken);
// //       localStorage.setItem('refreshToken', data.refreshToken);
      
// //       // Store user info
// //       localStorage.setItem('user', JSON.stringify(data.user));

// //       // Optional: Handle remember me
// //       if (rememberMe) {
// //         localStorage.setItem('rememberMe', 'true');
// //       } else {
// //         localStorage.removeItem('rememberMe');
// //       }

// //       // Reset form
// //       setFormData({
// //         email: '',
// //         password: ''
// //       });
// //       setRememberMe(false);

// //       // Redirect based on user role after a short delay
// //       setTimeout(() => {
// //         switch (data.user.role) {
// //           case 'ADMIN':
// //             router.push('/admin/dashboard');
// //             break;
// //           case 'EMPLOYER':
// //             router.push('/employer/dashboard');
// //             break;
// //           case 'CANDIDATE':
// //             router.push('/candidate/dashboard');
// //             break;
// //           default:
// //             router.push('/dashboard');
// //         }
// //       }, 1500);

// //     } catch (err) {
// //       setError(err.message || 'Something went wrong. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

//   const handleSocialLogin = (provider) => {
//     // Implement social login logic here
//     console.log(`Login with ${provider}`);
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
//           <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
//             <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h2>
//           <p className="text-gray-600 mb-6">
//             Welcome back! Redirecting you to your dashboard...
//           </p>
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex">
//       {/* Left side - Form */}
//       <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
//         <div className="max-w-md w-full">
//           {/* Logo */}
//           <div className="flex items-center mb-8">
//             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
//               </svg>
//             </div>
//             <span className="text-2xl font-bold text-gray-900">MyJob</span>
//           </div>

//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
//             <p className="text-gray-600">
//               Don't have account?{' '}
//               <Link href="/signUp" className="text-blue-600 hover:text-blue-700 font-medium">
//                 Create Account
//               </Link>
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="ml-2 text-gray-600 text-sm">Remember Me</span>
//               </label>
//               <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 text-sm">
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Error message */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <p className="text-red-800 text-sm">{error}</p>
//               </div>
//             )}

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing In...
//                 </>
//               ) : (
//                 <>
//                   Sign In
//                   <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Social login */}
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-gray-50 text-gray-500">or</span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => handleSocialLogin('Facebook')}
//                 className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                 </svg>
//                 <span className="ml-2">Facebook</span>
//               </button>
              
//               <button
//                 type="button"
//                 onClick={() => handleSocialLogin('Google')}
//                 className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 <svg className="w-5 h-5" viewBox="0 0 24 24">
//                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                   <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                 </svg>
//                 <span className="ml-2">Google</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right side - Stats */}
//       <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 items-center justify-center p-8">
//         <div className="max-w-lg text-center text-white">
//           <div className="grid grid-cols-3 gap-8 mb-12">
//             <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
//             <div className="w-32 h-32 bg-slate-600 rounded-2xl"></div>
//             <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
//             <div className="w-32 h-32 bg-slate-600 rounded-2xl"></div>
//             <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
//             <div className="w-32 h-32 bg-slate-600 rounded-2xl"></div>
//             <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
//             <div className="w-32 h-32 bg-slate-600 rounded-2xl"></div>
//             <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
//           </div>
          
//           <h2 className="text-4xl font-bold mb-8">
//             Over 1,75,324 candidates waiting for good employees.
//           </h2>
          
//           <div className="grid grid-cols-3 gap-8 text-center">
//             <div>
//               <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
//                 </svg>
//               </div>
//               <div className="text-2xl font-bold mb-1">1,75,324</div>
//               <div className="text-blue-200 text-sm">Live Job</div>
//             </div>
            
//             <div>
//               <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <div className="text-2xl font-bold mb-1">97,354</div>
//               <div className="text-blue-200 text-sm">Companies</div>
//             </div>
            
//             <div>
//               <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
//                 </svg>
//               </div>
//               <div className="text-2xl font-bold mb-1">7,532</div>
//               <div className="text-blue-200 text-sm">New Jobs</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/userContext';

export default function SignIn() {
  const router = useRouter();
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // ✅ Added success state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // ✅ Context login
      login(data.user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      setFormData({ email: '', password: '' });
      setSuccess(true); // ✅ Show success screen

      // Redirect by role
      setTimeout(() => {
        switch (data.user.role) {
          case 'ADMIN':
            router.push('/');
            break;
          case 'EMPLOYER':
            router.push('/');
            break;
          case 'CANDIDATE':
            router.push('/');
            break;
          default:
            router.push('/dashboard');
        }
      }, 2000); // Small delay to show success
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Login Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Welcome back! Redirecting you to your dashboard...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">MyJob</span>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/signUp"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-600 text-sm">Remember Me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <svg
                    className="ml-2 w-5 h-5"
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
                </>
              )}
            </button>
          </form>

          {/* Social login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Stats */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 items-center justify-center p-8">
        <div className="max-w-lg text-center text-white">
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
            <div className="w-32 h-32 bg-slate-600 rounded-2xl"></div>
            <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
            <div className="w-32 h-32 bg-slate-600 rounded-2xl"></div>
            <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
            <div className="w-32 h-32 bg-slate-600 rounded-2xl"></div>
            <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
            <div className="w-32 h-32 bg-slate-600 rounded-2xl"></div>
            <div className="opacity-60 w-32 h-32 bg-slate-700 rounded-2xl"></div>
          </div>

          <h2 className="text-4xl font-bold mb-8">
            Over 1,75,324 candidates waiting for good employees.
          </h2>

          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5"
                  />
                </svg>
              </div>
              <div className="text-2xl font-bold mb-1">1,75,324</div>
              <div className="text-blue-200 text-sm">Live Job</div>
            </div>

            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="text-2xl font-bold mb-1">97,354</div>
              <div className="text-blue-200 text-sm">Companies</div>
            </div>

            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5"
                  />
                </svg>
              </div>
              <div className="text-2xl font-bold mb-1">7,532</div>
              <div className="text-blue-200 text-sm">New Jobs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
