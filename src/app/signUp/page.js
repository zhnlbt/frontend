// "use client";
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { BriefcaseBusiness } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// const SignUp = () => {
//     const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'employers',
//     agreeToTerms: false
//   });
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };
//   const handleNavigation = () => {
//     router.push('/verifyEmail');
//   }

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     }

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (!formData.agreeToTerms) {
//       newErrors.agreeToTerms = 'You must agree to the Terms of Services';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       // Here you would make API call to your backend
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.fullName,
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//           role: formData.role
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Store token and redirect
//         localStorage.setItem('token', data.token);
//         // Redirect to dashboard or login page
//         console.log('Registration successful:', data);
//       } else {
//         setErrors({ submit: data.message });
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setErrors({ submit: 'Registration failed. Please try again.' });
//     }
//   };

//   return (
//    <div className="min-h-screen flex">
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

//         {/* Sign Up Form */}
//         <div className="flex-1 flex flex-col justify-center">
//           <div className="max-w-md mx-auto w-full">
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account.</h1>
//                   <p className="text-gray-600">
//                     Already have account?{' '}
//                     <Link href="/signIn" className="text-blue-600 hover:text-blue-500">
//                       Log In
//                     </Link>
//                   </p>
//                 </div>
                
//                 {/* Role Selector */}
//                 <div className="relative">
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleInputChange}
//                     className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   >
//                     <option value="employers">Employers</option>
//                     <option value="candidate">Candidates</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Name Fields Row */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <input
//                       type="text"
//                       name="fullName"
//                       placeholder="Full Name"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 text-black py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
//                         errors.fullName ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       required
//                     />
//                     {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//                   </div>
//                   <div>
//                     <input
//                       type="text"
//                       name="username"
//                       placeholder="Username"
//                       value={formData.username}
//                       onChange={handleInputChange}
//                       className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
//                         errors.username ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       required
//                     />
//                     {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//                   </div>
//                 </div>

//                 {/* Email Field */}
//                 <div>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email address"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
//                       errors.email ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     required
//                   />
//                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                 </div>

//                 {/* Password Field */}
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12 ${
//                       errors.password ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       {showPassword ? (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                       ) : (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       )}
//                     </svg>
//                   </button>
//                   {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                 </div>

//                 {/* Confirm Password Field */}
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12 ${
//                       errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       {showConfirmPassword ? (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                       ) : (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       )}
//                     </svg>
//                   </button>
//                   {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//                 </div>

//                 {/* Terms Agreement */}
//                 <div className="flex items-start space-x-3">
//                   <input
//                     type="checkbox"
//                     name="agreeToTerms"
//                     id="terms"
//                     checked={formData.agreeToTerms}
//                     onChange={handleInputChange}
//                     className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <label htmlFor="terms" className="text-sm text-gray-600 leading-5">
//                    {` I've read and agree with your`}
//                     <Link href="/terms" className="text-blue-600 hover:text-blue-500">
//                       Terms of Services
//                     </Link>
//                   </label>
//                 </div>
//                 {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

//                 {/* Submit Error */}
//                 {errors.submit && (
//                   <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//                     {errors.submit}
//                   </div>
//                 )}

//                 {/* Create Account Button */}
//                 <button
//                   onClick={handleNavigation}
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
//                 >
//                   Create Account
//                   <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>

//                 {/* Divider */}
//                 <div className="relative">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300"></div>
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-white text-gray-500">or</span>
//                   </div>
//                 </div>

//                 {/* Social Sign Up Buttons */}
//                 <div className="space-y-3">
//                   <button
//                     type="button"
//                     className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <svg className="w-5 h-5 mr-3 text-blue-600" viewBox="0 0 24 24">
//                       <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                     </svg>
//                     <span className="text-gray-700">Sign up with Facebook</span>
//                   </button>

//                   <button
//                     type="button"
//                     className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
//                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                     </svg>
//                     <span className="text-gray-700">Sign up with Google</span>
//                   </button>
//                 </div>
//               </form>
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

// export default SignUp;


'use client';

import { useState } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CANDIDATE',
    phone: '',
    location: '',
    company: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
    setDropdownOpen(false);
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required';
    if (!formData.lastName.trim()) return 'Last name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!agreedToTerms) return 'Please agree to the Terms of Service';
    if (formData.role === 'EMPLOYER' && !formData.company.trim()) return 'Company name is required for employers';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Prepare data for API
      const registrationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        ...(formData.phone && { phone: formData.phone.trim() }),
        ...(formData.location && { location: formData.location.trim() }),
        ...(formData.company && { company: formData.company.trim() })
      };

      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Registration successful
      setSuccess(true);
      
      // Store tokens if needed (optional - you might want to redirect to login instead)
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'CANDIDATE',
        phone: '',
        location: '',
        company: ''
      });
      setAgreedToTerms(false);

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Login with ${provider}`);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your account has been created successfully. You can now start using MyJob.
          </p>
          <Link 
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue to Login
          </Link>
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
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">MyJob</span>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account.</h1>
            <p className="text-gray-600">
              Already have account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Log In
              </Link>
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className="text-gray-700">
                  {formData.role === 'CANDIDATE' ? 'Job Seekers' : 
                   formData.role === 'EMPLOYER' ? 'Employers' : 'Select Role'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('CANDIDATE')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg"
                  >
                    Job Seekers
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('EMPLOYER')}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 last:rounded-b-lg border-t border-gray-100"
                  >
                    Employers
                  </button>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

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

            {/* Optional fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="location"
                  placeholder="Location (optional)"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Company field for employers */}
            {formData.role === 'EMPLOYER' && (
              <div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Password fields */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
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
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                I've read and agree with your{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                  Terms of Services
                </Link>
              </label>
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
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
                </svg>
              </div>
              <div className="text-2xl font-bold mb-1">1,75,324</div>
              <div className="text-blue-200 text-sm">Live Job</div>
            </div>
            
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-2xl font-bold mb-1">97,354</div>
              <div className="text-blue-200 text-sm">Companies</div>
            </div>
            
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
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