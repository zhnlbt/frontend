// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Header from '@/app/components/navbar';

// import { 
//   MapPin, 
//   Building2, 
//   Clock, 
//   DollarSign, 
//   Calendar, 
//   Users, 
//   Eye, 
//   Share2, 
//   Heart, 
//   HeartOff, 
//   ArrowLeft,
//   CheckCircle,
//   AlertCircle,
//   ExternalLink,
//   Mail,
//   Phone,
//   Globe,
//   Briefcase,
//   GraduationCap,
//   Star,
//   Facebook,
//   Twitter,
//   Linkedin
// } from 'lucide-react';
// import { jobAPI } from '@/app/utils/api';
// import { useUser } from '@/app/context/userContext';

// // Helper functions
// const getJobTypeColor = (jobType) => {
//   const colors = {
//     'FULL_TIME': 'bg-green-100 text-green-800 border-green-200',
//     'PART_TIME': 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     'CONTRACT': 'bg-purple-100 text-purple-800 border-purple-200',
//     'INTERNSHIP': 'bg-blue-100 text-blue-800 border-blue-200',
//     'REMOTE': 'bg-indigo-100 text-indigo-800 border-indigo-200'
//   };
//   return colors[jobType] || 'bg-gray-100 text-gray-800 border-gray-200';
// };

// const formatJobType = (jobType) => {
//   return jobType.split('_').map(word => 
//     word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//   ).join(' ');
// };

// const formatDate = (dateString) => {
//   if (!dateString) return 'No deadline';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   });
// };

// const formatSalary = (salaryMin, salaryMax, salary) => {
//   if (salary) return salary;
//   if (salaryMin && salaryMax) {
//     return `$${(salaryMin/1000).toFixed(0)}K - $${(salaryMax/1000).toFixed(0)}K`;
//   }
//   if (salaryMin) return `From $${(salaryMin/1000).toFixed(0)}K`;
//   if (salaryMax) return `Up to $${(salaryMax/1000).toFixed(0)}K`;
//   return 'Salary not specified';
// };

// const getCompanyInitials = (companyName) => {
//   return companyName
//     .split(' ')
//     .map(word => word.charAt(0))
//     .join('')
//     .toUpperCase()
//     .slice(0, 2);
// };

// const getTimeAgo = (dateString) => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
//   if (diffInHours < 24) {
//     return `${diffInHours}h ago`;
//   } else if (diffInHours < 24 * 7) {
//     return `${Math.floor(diffInHours / 24)}d ago`;
//   } else {
//     return formatDate(dateString);
//   }
// };

// const JobDetailPage = () => {
//   const router = useRouter();
//   const params = useParams();
//   const { user } = useUser();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [applying, setApplying] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [showApplicationForm, setShowApplicationForm] = useState(false);
//   const [coverLetter, setCoverLetter] = useState('');
//   const [selectedResume, setSelectedResume] = useState('');

//   useEffect(() => {
//     const fetchJobData = async () => {
//       try {
//         setLoading(true);
//         const response = await jobAPI.getJobById(params.id);
//         setJob(response);
//       } catch (error) {
//         console.error('Error fetching job:', error);
//         alert('Failed to load job details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (params.id) {
//       fetchJobData();
//     }
//   }, [params.id]);

//   // Add this modal component to your JobDetailPage component
// const ApplicationModal = () => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-semibold text-gray-900">Apply for {job.title}</h3>
//         <button
//           onClick={() => setShowApplicationForm(false)}
//           className="text-gray-400 hover:text-gray-600"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>

//       {/* Company Info */}
//       <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
//         <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
//           {getCompanyInitials(job.company)}
//         </div>
//         <div className="ml-4">
//           <h4 className="font-semibold text-gray-900">{job.company}</h4>
//           <p className="text-sm text-gray-600">Social networking service</p>
//         </div>
//       </div>

//       {/* Resume Selection */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Choose Resume
//         </label>
//         <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//           <option value="">Select resume...</option>
//           <option value="resume1">John_Developer_Resume.pdf</option>
//           <option value="resume2">Frontend_Developer_Portfolio.pdf</option>
//         </select>
//         <p className="text-xs text-gray-500 mt-1">
//           Make sure your resume is up to date before applying.
//         </p>
//       </div>

//       {/* Cover Letter */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Cover Letter
//         </label>
//         <textarea
//           value={coverLetter}
//           onChange={(e) => setCoverLetter(e.target.value)}
//           placeholder="Write a cover letter explaining why you're a good fit for this position. Include your relevant experience and skills..."
//           className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <p className="text-xs text-gray-500 mt-1">
//           Write down your biography here. Let the employers know who you are...
//         </p>
//       </div>

//       {/* Application Deadline */}
//       {job.applicationDeadline && (
//         <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex items-center">
//             <Calendar className="w-4 h-4 text-yellow-600 mr-2" />
//             <span className="text-sm text-yellow-800">
//               Application deadline: {formatDate(job.applicationDeadline)}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex gap-3">
//         <button
//           onClick={handleApply}
//           disabled={applying || !coverLetter.trim()}
//           className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {applying ? 'Submitting Application...' : 'Apply Now'}
//         </button>
//         <button
//           onClick={() => setShowApplicationForm(false)}
//           className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
//         >
//           Cancel
//         </button>
//       </div>

//       {/* Company Details */}
//       <div className="mt-6 pt-6 border-t border-gray-200">
//         <h4 className="font-semibold text-gray-900 mb-3">About {job.company}</h4>
//         <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//           <div>
//             <span className="font-medium">Founded in:</span>
//             <p>March 21, 2008</p>
//           </div>
//           <div>
//             <span className="font-medium">Organization type:</span>
//             <p>Private Company</p>
//           </div>
//           <div>
//             <span className="font-medium">Company size:</span>
//             <p>120-300 Employees</p>
//           </div>
//           <div>
//             <span className="font-medium">Location:</span>
//             <p>{job.location}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

//   const handleApply = async () => {
//     if (!user || user.role !== 'CANDIDATE') {
//       router.push('/login');
//       return;
//     }
//      const handleApply = async () => {
//   if (!user || user.role !== 'CANDIDATE') {
//     router.push('/login');
//     return;
//   }

//   if (!selectedResume) {
//     alert('Please select a resume');
//     return;
//   }

//   try {
//     setApplying(true);
//     await applicationAPI.applyToJob(job.id, { 
//       coverLetter,
//       resume: selectedResume 
//     });
//     setJob(prev => ({ ...prev, hasApplied: true, applicationStatus: 'PENDING' }));
//     setShowApplicationForm(false);
//     setCoverLetter('');
//     setSelectedResume('');
//     alert('Application submitted successfully!');
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     alert('Failed to submit application. Please try again.');
//   } finally {
//     setApplying(false);
//   }
// };

//     try {
//       setApplying(true);
//       await jobAPI.applyToJob(job.id, { coverLetter });
//       setJob(prev => ({ ...prev, hasApplied: true, applicationStatus: 'PENDING' }));
//       setShowApplicationForm(false);
//       setCoverLetter('');
//       alert('Application submitted successfully!');
//     } catch (error) {
//       console.error('Error applying to job:', error);
//       alert('Failed to submit application. Please try again.');
//     } finally {
//       setApplying(false);
//     }
//   };

//   const handleSaveJob = async () => {
//     if (!user || user.role !== 'CANDIDATE') {
//       router.push('/login');
//       return;
//     }

//     try {
//       setSaving(true);
//       await jobAPI.toggleSaveJob(job.id);
//       setJob(prev => ({ ...prev, isSaved: !prev.isSaved }));
//     } catch (error) {
//       console.error('Error saving job:', error);
//       alert('Failed to save job. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

//   const ShareModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//         <h3 className="text-lg font-semibold mb-4">Share this job</h3>
//         <div className="flex gap-3 mb-4">
//           <button
//             onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
//             className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700"
//           >
//             <Facebook className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this job: ${job.title} at ${job.company}`)}`, '_blank')}
//             className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500"
//           >
//             <Twitter className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
//             className="flex items-center justify-center w-12 h-12 bg-blue-800 text-white rounded-full hover:bg-blue-900"
//           >
//             <Linkedin className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="flex items-center gap-2 bg-gray-100 p-3 rounded">
//           <input
//             type="text"
//             value={shareUrl}
//             readOnly
//             className="flex-1 bg-transparent text-sm"
//           />
//           <button
//             onClick={() => navigator.clipboard.writeText(shareUrl)}
//             className="text-blue-600 text-sm font-medium hover:text-blue-700"
//           >
//             Copy
//           </button>
//         </div>
//         <button
//           onClick={() => setShowShareModal(false)}
//           className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );

//   const ApplicationModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//         <h3 className="text-xl font-semibold mb-4">Apply for {job.title}</h3>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Cover Letter
//           </label>
//           <textarea
//             value={coverLetter}
//             onChange={(e) => setCoverLetter(e.target.value)}
//             placeholder="Write a cover letter explaining why you're interested in this position..."
//             className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={handleApply}
//             disabled={applying || !coverLetter.trim()}
//             className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {applying ? 'Submitting...' : 'Submit Application'}
//           </button>
//           <button
//             onClick={() => setShowApplicationForm(false)}
//             className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="flex items-center justify-center py-20">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           <span className="ml-3 text-gray-600">Loading job details...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to jobs
//           </button>
//           <div className="text-center py-12">
//             <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
//             <p className="text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Back Button */}
//         <button
//           onClick={() => router.back()}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to jobs
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Job Details */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               {/* Job Header */}
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex items-start gap-4">
//                   {/* Company Logo */}
//                   <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
//                     {getCompanyInitials(job.company)}
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
//                         <div className="flex items-center gap-4 text-gray-600 mb-3">
//                           <div className="flex items-center">
//                             <Building2 className="w-4 h-4 mr-1" />
//                             {job.company}
//                           </div>
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-1" />
//                             {job.location}
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getJobTypeColor(job.jobType)}`}>
//                             {formatJobType(job.jobType)}
//                           </span>
//                           <div className="flex items-center text-green-600 font-semibold">
//                             <DollarSign className="w-4 h-4 mr-1" />
//                             {formatSalary(job.salaryMin, job.salaryMax, job.salary)}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Job Stats */}
//                 <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <Clock className="w-4 h-4 mr-1" />
//                     Posted {getTimeAgo(job.createdAt)}
//                   </div>
//                   <div className="flex items-center">
//                     <Eye className="w-4 h-4 mr-1" />
//                     {job.viewCount} views
//                   </div>
//                   <div className="flex items-center">
//                     <Users className="w-4 h-4 mr-1" />
//                     {job._count?.applications || 0} applicants
//                   </div>
//                   {job.applicationDeadline && (
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       Deadline: {formatDate(job.applicationDeadline)}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Job Description */}
//               <div className="p-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
//                 <div className="prose max-w-none text-gray-700">
//                   {job.description.split('\n\n').map((paragraph, index) => (
//                     <p key={index} className="mb-4 last:mb-0 leading-relaxed">
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>
//               </div>

//               {/* Requirements */}
//               {job.requirements && job.requirements.length > 0 && (
//                 <div className="p-6 border-t border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
//                   <ul className="space-y-2">
//                     {job.requirements.map((requirement, index) => (
//                       <li key={index} className="flex items-start">
//                         <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700">{requirement}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Benefits */}
//               {job.benefits && job.benefits.length > 0 && (
//                 <div className="p-6 border-t border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
//                   <ul className="space-y-2">
//                     {job.benefits.map((benefit, index) => (
//                       <li key={index} className="flex items-start">
//                         <Star className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700">{benefit}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             {/* Application Actions */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//               {job.hasApplied ? (
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <CheckCircle className="w-8 h-8 text-green-600" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted</h3>
//                   <p className="text-gray-600 text-sm mb-4">
//                     Your application is {job.applicationStatus?.toLowerCase() || 'pending'}
//                   </p>
//                   <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
//                     Application Status: {job.applicationStatus || 'Pending'}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   <button
//                     onClick={() => setShowApplicationForm(true)}
//                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
//                   >
//                     <Briefcase className="w-4 h-4 mr-2" />
//                     Apply Now
//                   </button>
                  
//                   {user && user.role === 'CANDIDATE' && (
//                     <button
//                       onClick={handleSaveJob}
//                       disabled={saving}
//                       className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                     >
//                       {job.isSaved ? (
//                         <Heart className="w-4 h-4 mr-2 text-red-500 fill-red-500" />
//                       ) : (
//                         <HeartOff className="w-4 h-4 mr-2" />
//                       )}
//                       {saving ? 'Saving...' : (job.isSaved ? 'Saved' : 'Save Job')}
//                     </button>
//                   )}
                  
//                   <button
//                     onClick={() => setShowShareModal(true)}
//                     className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                   >
//                     <Share2 className="w-4 h-4 mr-2" />
//                     Share Job
//                   </button>
//                 </div>
//               )}

//               {job.applicationDeadline && new Date() < new Date(job.applicationDeadline) && (
//                 <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <div className="flex items-center">
//                     <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
//                     <span className="text-sm text-yellow-800">
//                       Application deadline: {formatDate(job.applicationDeadline)}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Company Information */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
//                   {getCompanyInitials(job.company)}
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="font-semibold text-gray-900">{job.company}</h3>
//                   <p className="text-sm text-gray-500">Technology Company</p>
//                 </div>
//               </div>

//               {job.employer && (
//                 <div className="space-y-3 text-sm mb-4">
//                   <div className="flex items-center">
//                     <span className="text-gray-500">Posted by:</span>
//                     <span className="ml-2 text-gray-900">
//                       {job.employer.firstName} {job.employer.lastName}
//                     </span>
//                   </div>
//                   {job.employer.email && (
//                     <div className="flex items-center">
//                       <Mail className="w-4 h-4 mr-2 text-gray-500" />
//                       <span className="text-gray-900">{job.employer.email}</span>
//                     </div>
//                   )}
//                 </div>
//               )}

//               <div className="flex gap-2 mt-4">
//                 <button className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700">
//                   <Facebook className="w-4 h-4" />
//                 </button>
//                 <button className="w-8 h-8 bg-blue-400 text-white rounded flex items-center justify-center hover:bg-blue-500">
//                   <Twitter className="w-4 h-4" />
//                 </button>
//                 <button className="w-8 h-8 bg-blue-800 text-white rounded flex items-center justify-center hover:bg-blue-900">
//                   <Linkedin className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       {showShareModal && <ShareModal />}
//       {showApplicationForm && <ApplicationModal />}
//     </div>
//   );
// };

// export default JobDetailPage;


'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/app/components/navbar';
import { 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign, 
  Calendar, 
  Users, 
  Eye, 
  Share2, 
  Heart, 
  HeartOff, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Briefcase,
  GraduationCap,
  Star,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { jobAPI } from '@/app/utils/api';
import { useUser } from '@/app/context/userContext';

// Helper functions
const getJobTypeColor = (jobType) => {
  const colors = {
    'FULL_TIME': 'bg-green-100 text-green-800 border-green-200',
    'PART_TIME': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'CONTRACT': 'bg-purple-100 text-purple-800 border-purple-200',
    'INTERNSHIP': 'bg-blue-100 text-blue-800 border-blue-200',
    'REMOTE': 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };
  return colors[jobType] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const formatJobType = (jobType) => {
  return jobType.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

const formatDate = (dateString) => {
  if (!dateString) return 'No deadline';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatSalary = (salaryMin, salaryMax, salary) => {
  if (salary) return salary;
  if (salaryMin && salaryMax) {
    return `$${(salaryMin/1000).toFixed(0)}K - $${(salaryMax/1000).toFixed(0)}K`;
  }
  if (salaryMin) return `From $${(salaryMin/1000).toFixed(0)}K`;
  if (salaryMax) return `Up to $${(salaryMax/1000).toFixed(0)}K`;
  return 'Salary not specified';
};

const getCompanyInitials = (companyName) => {
  return companyName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInHours < 24 * 7) {
    return `${Math.floor(diffInHours / 24)}d ago`;
  } else {
    return formatDate(dateString);
  }
};

const JobDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await jobAPI.getJobById(params.id);
        setJob(response);
      } catch (error) {
        console.error('Error fetching job:', error);
        alert('Failed to load job details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchJobData();
    }
  }, [params.id]);

  const handleApply = async () => {
    if (!user || user.role !== 'CANDIDATE') {
      router.push('/login');
      return;
    }

    try {
      setApplying(true);
      await jobAPI.applyToJob(job.id, { coverLetter });
      setJob(prev => ({ ...prev, hasApplied: true, applicationStatus: 'PENDING' }));
      setShowApplicationForm(false);
      setCoverLetter('');
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  const handleSaveJob = async () => {
    if (!user || user.role !== 'CANDIDATE') {
      router.push('/login');
      return;
    }

    try {
      setSaving(true);
      await jobAPI.toggleSaveJob(job.id);
      setJob(prev => ({ ...prev, isSaved: !prev.isSaved }));
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const ShareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Share this job</h3>
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            <Facebook className="w-5 h-5" />
          </button>
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this job: ${job.title} at ${job.company}`)}`, '_blank')}
            className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button
            onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
            className="flex items-center justify-center w-12 h-12 bg-blue-800 text-white rounded-full hover:bg-blue-900"
          >
            <Linkedin className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 bg-transparent text-sm"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            className="text-blue-600 text-sm font-medium hover:text-blue-700"
          >
            Copy
          </button>
        </div>
        <button
          onClick={() => setShowShareModal(false)}
          className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Close
        </button>
      </div>
    </div>
  );


  // Add this modal component to your JobDetailPage component
const ApplicationModal = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Apply for {job.title}</h3>
        <button
          onClick={() => setShowApplicationForm(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
          {getCompanyInitials(job.company)}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-gray-900">{job.company}</h4>
          <p className="text-sm text-gray-600">Social networking service</p>
        </div>
      </div>

      {/* Resume Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Resume
        </label>
        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select resume...</option>
          <option value="resume1">John_Developer_Resume.pdf</option>
          <option value="resume2">Frontend_Developer_Portfolio.pdf</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Make sure your resume is up to date before applying.
        </p>
      </div>

      {/* Cover Letter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Letter
        </label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Write a cover letter explaining why you're a good fit for this position. Include your relevant experience and skills..."
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Write down your biography here. Let the employers know who you are...
        </p>
      </div>

      {/* Application Deadline */}
      {job.applicationDeadline && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-800">
              Application deadline: {formatDate(job.applicationDeadline)}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleApply}
          disabled={applying || !coverLetter.trim()}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {applying ? 'Submitting Application...' : 'Apply Now'}
        </button>
        <button
          onClick={() => setShowApplicationForm(false)}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>

      {/* Company Details */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">About {job.company}</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Founded in:</span>
            <p>March 21, 2008</p>
          </div>
          <div>
            <span className="font-medium">Organization type:</span>
            <p>Private Company</p>
          </div>
          <div>
            <span className="font-medium">Company size:</span>
            <p>120-300 Employees</p>
          </div>
          <div>
            <span className="font-medium">Location:</span>
            <p>{job.location}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading job details...</span>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to jobs
          </button>
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
            <p className="text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Job Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {getCompanyInitials(job.company)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                        <div className="flex items-center gap-4 text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-1" />
                            {job.company}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getJobTypeColor(job.jobType)}`}>
                            {formatJobType(job.jobType)}
                          </span>
                          <div className="flex items-center text-green-600 font-semibold">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {formatSalary(job.salaryMin, job.salaryMax, job.salary)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Stats */}
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Posted {getTimeAgo(job.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {job.viewCount} views
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {job._count?.applications || 0} applicants
                  </div>
                  {job.applicationDeadline && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Deadline: {formatDate(job.applicationDeadline)}
                    </div>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
                <div className="prose max-w-none text-gray-700">
                  {job.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="p-6 border-t border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="p-6 border-t border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Application Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              {job.hasApplied ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Your application is {job.applicationStatus?.toLowerCase() || 'pending'}
                  </p>
                  <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
                    Application Status: {job.applicationStatus || 'Pending'}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Apply Now
                  </button>
                  
                  {user && user.role === 'CANDIDATE' && (
                    <button
                      onClick={handleSaveJob}
                      disabled={saving}
                      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      {job.isSaved ? (
                        <Heart className="w-4 h-4 mr-2 text-red-500 fill-red-500" />
                      ) : (
                        <HeartOff className="w-4 h-4 mr-2" />
                      )}
                      {saving ? 'Saving...' : (job.isSaved ? 'Saved' : 'Save Job')}
                    </button>
                  )}
                  
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Job
                  </button>
                </div>
              )}

              {job.applicationDeadline && new Date() < new Date(job.applicationDeadline) && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-800">
                      Application deadline: {formatDate(job.applicationDeadline)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Company Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {getCompanyInitials(job.company)}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{job.company}</h3>
                  <p className="text-sm text-gray-500">Technology Company</p>
                </div>
              </div>

              {job.employer && (
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-500">Posted by:</span>
                    <span className="ml-2 text-gray-900">
                      {job.employer.firstName} {job.employer.lastName}
                    </span>
                  </div>
                  {job.employer.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-900">{job.employer.email}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-blue-400 text-white rounded flex items-center justify-center hover:bg-blue-500">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-blue-800 text-white rounded flex items-center justify-center hover:bg-blue-900">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showShareModal && <ShareModal />}
      {showApplicationForm && <ApplicationModal />}
    </div>
  );
};

export default JobDetailPage;