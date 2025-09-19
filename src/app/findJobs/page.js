// 'use client'
// import React, { useState, useEffect } from 'react';
// import Header from '../components/navbar';
// import { 
//   Search, 
//   MapPin, 
//   Filter, 
//   Grid, 
//   List, 
//   ChevronLeft, 
//   ChevronRight,
//   Clock,
//   DollarSign,
//   Building2,
//   Eye,
//   Heart,
//   HeartOff
// } from 'lucide-react';
// import { jobAPI } from '../utils/api';
// import { useUser } from '../context/userContext';

// // Job Type color mapping
// const getJobTypeColor = (jobType) => {
//   const colors = {
//     'FULL_TIME': 'bg-green-100 text-green-800',
//     'PART_TIME': 'bg-yellow-100 text-yellow-800',
//     'CONTRACT': 'bg-purple-100 text-purple-800',
//     'INTERNSHIP': 'bg-blue-100 text-blue-800',
//     'REMOTE': 'bg-indigo-100 text-indigo-800'
//   };
//   return colors[jobType] || 'bg-gray-100 text-gray-800';
// };

// // Format job type display
// const formatJobType = (jobType) => {
//   return jobType.split('_').map(word => 
//     word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//   ).join(' ');
// };

// // Format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
//   if (diffInHours < 24) {
//     return `${diffInHours}h ago`;
//   } else if (diffInHours < 24 * 7) {
//     return `${Math.floor(diffInHours / 24)}d ago`;
//   } else {
//     return date.toLocaleDateString();
//   }
// };

// // Format salary range
// const formatSalary = (salaryMin, salaryMax, salary) => {
//   if (salary) return salary;
//   if (salaryMin && salaryMax) {
//     return `$${(salaryMin/1000).toFixed(0)}K - $${(salaryMax/1000).toFixed(0)}K`;
//   }
//   if (salaryMin) return `From $${(salaryMin/1000).toFixed(0)}K`;
//   if (salaryMax) return `Up to $${(salaryMax/1000).toFixed(0)}K`;
//   return 'Salary not specified';
// };

// // Job Card Component
// const JobCard = ({ job, onToggleFavorite, isFavorite }) => {
//   const { user } = useUser();
  
//   // Generate company logo placeholder
//   const getCompanyInitials = (companyName) => {
//     return companyName
//       .split(' ')
//       .map(word => word.charAt(0))
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const logoColors = [
//     'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
//     'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'
//   ];
  
//   const logoColor = logoColors[job.id % logoColors.length];

//   const handleFavoriteClick = (e) => {
//     e.stopPropagation();
//     onToggleFavorite(job.id);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer relative">
//       {/* Favorite Button - Only for candidates */}
//       {user && user.role === 'CANDIDATE' && (
//         <button
//           onClick={handleFavoriteClick}
//           className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
//           title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
//         >
//           {isFavorite ? (
//             <Heart className="w-5 h-5 text-red-500 fill-red-500" />
//           ) : (
//             <HeartOff className="w-5 h-5 text-gray-400 hover:text-red-500" />
//           )}
//         </button>
//       )}

//       {/* Header */}
//       <div className="flex items-start justify-between mb-4 pr-10">
//         <div className="flex items-start space-x-4">
//           {/* Company Logo */}
//           <div className={`${logoColor} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
//             {getCompanyInitials(job.company)}
//           </div>
          
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold text-gray-900 mb-1">
//               {job.title}
//             </h3>
//             <div className="flex items-center text-sm text-gray-600 mb-2">
//               <Building2 className="w-4 h-4 mr-1" />
//               {job.company}
//             </div>
//             <div className="flex items-center text-sm text-gray-600">
//               <MapPin className="w-4 h-4 mr-1" />
//               {job.location}
//             </div>
//           </div>
//         </div>
        
//         {/* Job Type Badge */}
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
//           {formatJobType(job.jobType)}
//         </span>
//       </div>

//       {/* Salary */}
//       <div className="flex items-center text-green-600 font-semibold mb-3">
//         <DollarSign className="w-4 h-4 mr-1" />
//         {formatSalary(job.salaryMin, job.salaryMax, job.salary)}
//       </div>

//       {/* Requirements */}
//       {job.requirements && job.requirements.length > 0 && (
//         <div className="mb-4">
//           <div className="flex flex-wrap gap-2">
//             {job.requirements.slice(0, 3).map((requirement, index) => (
//               <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
//                 {requirement}
//               </span>
//             ))}
//             {job.requirements.length > 3 && (
//               <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-sm">
//                 +{job.requirements.length - 3} more
//               </span>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
//         <div className="flex items-center">
//           <Clock className="w-4 h-4 mr-1" />
//           {formatDate(job.createdAt)}
//         </div>
//         <div className="flex items-center">
//           <Eye className="w-4 h-4 mr-1" />
//           {job.viewCount} views
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Component
// const JobListingPage = () => {
//   const { user } = useUser();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagination, setPagination] = useState({});
//   const [viewType, setViewType] = useState('grid');
//   const [savedJobs, setSavedJobs] = useState(new Set());
  
//   // Enhanced filters state
//   const [filters, setFilters] = useState({
//     search: '',
//     location: '',
//     jobType: '',
//     salaryMin: '',
//     salaryMax: '',
//     sortBy: 'createdAt',
//     order: 'desc'
//   });

//   // Available filter options
//   const [filterOptions, setFilterOptions] = useState({
//     locations: [],
//     companies: [],
//     jobTypes: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE']
//   });

//   const jobsPerPage = 4;

//   // Fetch saved jobs for current user
//   const fetchSavedJobs = async () => {
//     if (user && user.role === 'CANDIDATE') {
//       try {
//         const response = await jobAPI.getSavedJobs({ page: 1, limit: 1000 });
//         const savedJobIds = new Set(response.savedJobs.map(job => job.id));
//         setSavedJobs(savedJobIds);
//       } catch (error) {
//         console.error('Error fetching saved jobs:', error);
//       }
//     }
//   };

//   // Toggle favorite job
//   const handleToggleFavorite = async (jobId) => {
//     if (!user || user.role !== 'CANDIDATE') return;

//     try {
//       await jobAPI.toggleSaveJob(jobId);
      
//       // Update local state
//       setSavedJobs(prev => {
//         const newSet = new Set(prev);
//         if (newSet.has(jobId)) {
//           newSet.delete(jobId);
//         } else {
//           newSet.add(jobId);
//         }
//         return newSet;
//       });
//     } catch (error) {
//       console.error('Error toggling favorite job:', error);
//       alert('Failed to update favorite status. Please try again.');
//     }
//   };

//   // Extract unique filter options from jobs
//   const extractFilterOptions = (jobsData) => {
//     const locations = [...new Set(jobsData.map(job => job.location))].sort();
//     const companies = [...new Set(jobsData.map(job => job.company))].sort();
    
//     setFilterOptions(prev => ({
//       ...prev,
//       locations,
//       companies
//     }));
//   };

//   // Fetch jobs from backend
//   const loadJobs = async (page = 1, newFilters = filters) => {
//     setLoading(true);
//     try {
//       // Build query parameters
//       const queryParams = {
//         page,
//         limit: jobsPerPage,
//         isActive: 'true'
//       };
      
//       // Add filters if they exist
//       if (newFilters.search) queryParams.search = newFilters.search;
//       if (newFilters.location) queryParams.location = newFilters.location;
//       if (newFilters.jobType) queryParams.jobType = newFilters.jobType;
//       if (newFilters.salaryMin) queryParams.salaryMin = newFilters.salaryMin;
//       if (newFilters.salaryMax) queryParams.salaryMax = newFilters.salaryMax;
//       if (newFilters.sortBy) queryParams.sortBy = newFilters.sortBy;
//       if (newFilters.order) queryParams.order = newFilters.order;
      
//       // Call the API
//       const response = await jobAPI.getAllJobs(queryParams);
      
//       setJobs(response.jobs);
//       setPagination({
//         total: response.pagination.total,
//         page: response.pagination.page,
//         limit: response.pagination.limit,
//         totalPages: response.pagination.totalPages
//       });

//       // Extract filter options from first load
//       if (page === 1 && (!filterOptions.locations.length || !filterOptions.companies.length)) {
//         extractFilterOptions(response.jobs);
//       }
//     } catch (error) {
//       console.error('Error fetching jobs:', error);
//       alert('Failed to fetch jobs. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load jobs on component mount
//   useEffect(() => {
//     loadJobs(1);
//     fetchSavedJobs();
//   }, []);

//   // Reload when page changes
//   useEffect(() => {
//     loadJobs(currentPage);
//   }, [currentPage]);

//   // Handle search
//   const handleSearch = () => {
//     setCurrentPage(1);
//     loadJobs(1, filters);
//   };

//   // Handle filter change
//   const handleFilterChange = (key, value) => {
//     const newFilters = { ...filters, [key]: value };
//     setFilters(newFilters);
    
//     // Auto-apply filters (except for search which needs manual trigger)
//     if (key !== 'search') {
//       setCurrentPage(1);
//       loadJobs(1, newFilters);
//     }
//   };

//   // Handle sort change
//   const handleSortChange = (sortBy, order) => {
//     const newFilters = { ...filters, sortBy, order };
//     setFilters(newFilters);
//     setCurrentPage(1);
//     loadJobs(1, newFilters);
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     const clearedFilters = {
//       search: '',
//       location: '',
//       jobType: '',
//       salaryMin: '',
//       salaryMax: '',
//       sortBy: 'createdAt',
//       order: 'desc'
//     };
//     setFilters(clearedFilters);
//     setCurrentPage(1);
//     loadJobs(1, clearedFilters);
//   };

//   // Handle pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Generate page numbers
//   const getPageNumbers = () => {
//     const pages = [];
//     const totalPages = pagination.totalPages || 1;
    
//     pages.push(1);
    
//     let startPage = Math.max(2, currentPage - 1);
//     let endPage = Math.min(totalPages - 1, currentPage + 1);
    
//     if (currentPage <= 2) {
//       endPage = Math.min(4, totalPages);
//     }
    
//     if (currentPage >= totalPages - 1) {
//       startPage = Math.max(2, totalPages - 2);
//     }
    
//     if (startPage > 2) {
//       pages.push('...');
//     }
    
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }
    
//     if (endPage < totalPages - 1) {
//       pages.push('...');
//     }
    
//     if (totalPages > 1) {
//       pages.push(totalPages);
//     }
    
//     return pages;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <Header/>
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="py-8">
//             <div className="flex items-center justify-between mb-6">
//               <h1 className="text-3xl font-bold text-gray-900">Find Job</h1>
//               <div className="text-sm text-gray-500">
//                 Home / Find Job
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="flex flex-wrap gap-4 items-center">
//               <div className="flex-1 min-w-0">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     placeholder="Job title, keyword, company..."
//                     value={filters.search}
//                     onChange={(e) => handleFilterChange('search', e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                     className="text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <select
//                     value={filters.location}
//                     onChange={(e) => handleFilterChange('location', e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
//                   >
//                     <option value="">All Locations</option>
//                     {filterOptions.locations.map(location => (
//                       <option key={location} value={location}>{location}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <select
//                 value={filters.jobType}
//                 onChange={(e) => handleFilterChange('jobType', e.target.value)}
//                 className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">All Job Types</option>
//                 {filterOptions.jobTypes.map(type => (
//                   <option key={type} value={type}>{formatJobType(type)}</option>
//                 ))}
//               </select>

//               <button
//                 onClick={handleSearch}
//                 className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//               >
//                 Find Job
//               </button>
//             </div>

//             {/* Salary Filter */}
//             <div className="mt-4 flex gap-4 items-center">
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium text-gray-700">Salary:</label>
//                 <input
//                   type="number"
//                   placeholder="Min ($)"
//                   value={filters.salaryMin}
//                   onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
//                   className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="text-gray-500">-</span>
//                 <input
//                   type="number"
//                   placeholder="Max ($)"
//                   value={filters.salaryMax}
//                   onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
//                   className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               {(filters.search || filters.location || filters.jobType || filters.salaryMin || filters.salaryMax) && (
//                 <button
//                   onClick={clearFilters}
//                   className="text-sm text-blue-600 hover:text-blue-800 underline"
//                 >
//                   Clear all filters
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Controls */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <div className="text-sm text-gray-600">
//               {pagination.total ? `${pagination.total} jobs found` : 'Loading...'}
//             </div>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <select 
//               value={`${filters.sortBy}_${filters.order}`}
//               onChange={(e) => {
//                 const [sortBy, order] = e.target.value.split('_');
//                 handleSortChange(sortBy, order);
//               }}
//               className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
//             >
//               <option value="createdAt_desc">Latest</option>
//               <option value="createdAt_asc">Oldest</option>
//               <option value="title_asc">Title A-Z</option>
//               <option value="title_desc">Title Z-A</option>
//               <option value="company_asc">Company A-Z</option>
//               <option value="company_desc">Company Z-A</option>
//               <option value="salaryMax_desc">Salary High to Low</option>
//               <option value="salaryMin_asc">Salary Low to High</option>
//               <option value="viewCount_desc">Most Viewed</option>
//             </select>
            
//             <select 
//               value={jobsPerPage}
//               className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
//               disabled
//             >
//               <option value={jobsPerPage}>{jobsPerPage} per page</option>
//             </select>
            
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewType('grid')}
//                 className={`p-2 ${viewType === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
//               >
//                 <Grid className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setViewType('list')}
//                 className={`p-2 ${viewType === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
//               >
//                 <List className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Job Listings */}
//         {loading ? (
//           <div className="flex items-center justify-center py-12">
//             <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//             <span className="ml-3 text-gray-600">Loading jobs...</span>
//           </div>
//         ) : jobs.length > 0 ? (
//           <>
//             <div className={`grid gap-6 mb-8 ${
//               viewType === 'grid' 
//                 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' 
//                 : 'grid-cols-1'
//             }`}>
//               {jobs.map((job) => (
//                 <JobCard 
//                   key={job.id} 
//                   job={job} 
//                   onToggleFavorite={handleToggleFavorite}
//                   isFavorite={savedJobs.has(job.id)}
//                 />
//               ))}
//             </div>

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//               <div className="flex items-center justify-center space-x-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
                
//                 {getPageNumbers().map((page, index) => (
//                   page === '...' ? (
//                     <span key={index} className="px-4 py-2 text-gray-500">
//                       ...
//                     </span>
//                   ) : (
//                     <button
//                       key={index}
//                       onClick={() => handlePageChange(page)}
//                       className={`px-4 py-2 border border-gray-300 rounded-lg font-medium ${
//                         currentPage === page 
//                           ? 'bg-blue-600 text-white border-blue-600' 
//                           : 'hover:bg-gray-50'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   )
//                 ))}
                
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === pagination.totalPages}
//                   className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <div className="text-gray-500 text-lg mb-2">No jobs found</div>
//             <div className="text-gray-400 mb-4">Try adjusting your search filters</div>
//             {(filters.search || filters.location || filters.jobType || filters.salaryMin || filters.salaryMax) && (
//               <button
//                 onClick={clearFilters}
//                 className="text-blue-600 hover:text-blue-800 underline"
//               >
//                 Clear all filters and try again
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

'use client'
import React, { useState, useEffect } from 'react';
import Header from '../components/navbar';
import { 
  Search, 
  MapPin, 
  Filter, 
  Grid, 
  List, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  DollarSign,
  Building2,
  Eye,
  Heart,
  HeartOff
} from 'lucide-react';
import { jobAPI } from '../utils/api';
import { useUser } from '../context/userContext';
import { useRouter } from 'next/navigation';

// Job Type color mapping
const getJobTypeColor = (jobType) => {
  const colors = {
    'FULL_TIME': 'bg-green-100 text-green-800',
    'PART_TIME': 'bg-yellow-100 text-yellow-800',
    'CONTRACT': 'bg-purple-100 text-purple-800',
    'INTERNSHIP': 'bg-blue-100 text-blue-800',
    'REMOTE': 'bg-indigo-100 text-indigo-800'
  };
  return colors[jobType] || 'bg-gray-100 text-gray-800';
};

// Format job type display
const formatJobType = (jobType) => {
  return jobType.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInHours < 24 * 7) {
    return `${Math.floor(diffInHours / 24)}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

// Format salary range
const formatSalary = (salaryMin, salaryMax, salary) => {
  if (salary) return salary;
  if (salaryMin && salaryMax) {
    return `$${(salaryMin/1000).toFixed(0)}K - $${(salaryMax/1000).toFixed(0)}K`;
  }
  if (salaryMin) return `From $${(salaryMin/1000).toFixed(0)}K`;
  if (salaryMax) return `Up to $${(salaryMax/1000).toFixed(0)}K`;
  return 'Salary not specified';
};

// Job Card Component (unchanged)
const JobCard = ({ job, onToggleFavorite, isFavorite, onClick }) => {
  const { user } = useUser();

  const getCompanyInitials = (companyName) => {
    return companyName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const logoColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
    'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'
  ];
  
  const logoColor = logoColors[job.id % logoColors.length];

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(job.id);
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer relative"
      onClick={onClick}
    >
      {user && user.role === 'CANDIDATE' && (
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          ) : (
            <HeartOff className="w-5 h-5 text-gray-400 hover:text-red-500" />
          )}
        </button>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4 pr-10">
        <div className="flex items-start space-x-4">
          <div className={`${logoColor} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
            {getCompanyInitials(job.company)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {job.title}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Building2 className="w-4 h-4 mr-1" />
              {job.company}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
          {formatJobType(job.jobType)}
        </span>
      </div>

      <div className="flex items-center text-green-600 font-semibold mb-3">
        <DollarSign className="w-4 h-4 mr-1" />
        {formatSalary(job.salaryMin, job.salaryMax, job.salary)}
      </div>

      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job.requirements.slice(0, 3).map((requirement, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                {requirement}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-sm">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {formatDate(job.createdAt)}
        </div>
        <div className="flex items-center">
          <Eye className="w-4 h-4 mr-1" />
          {job.viewCount} views
        </div>
      </div>
    </div>
  );
};

// Main Component with enhanced error handling
const JobListingPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [viewType, setViewType] = useState('grid');
  const [savedJobs, setSavedJobs] = useState(new Set());
  
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    sortBy: 'createdAt',
    order: 'desc'
  });

  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    companies: [],
    jobTypes: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE']
  });

  const jobsPerPage = 4;

  // Fetch saved jobs for current user
  const fetchSavedJobs = async () => {
    if (user && user.role === 'CANDIDATE') {
      try {
        const response = await jobAPI.getSavedJobs({ page: 1, limit: 1000 });
        const savedJobIds = new Set(response.savedJobs.map(job => job.id));
        setSavedJobs(savedJobIds);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    }
  };

  // Toggle favorite job
  const handleToggleFavorite = async (jobId) => {
    if (!user || user.role !== 'CANDIDATE') return;

    try {
      await jobAPI.toggleSaveJob(jobId);
      
      setSavedJobs(prev => {
        const newSet = new Set(prev);
        if (newSet.has(jobId)) {
          newSet.delete(jobId);
        } else {
          newSet.add(jobId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error toggling favorite job:', error);
      alert('Failed to update favorite status. Please try again.');
    }
  };

  // Extract unique filter options from jobs
  const extractFilterOptions = (jobsData) => {
    const locations = [...new Set(jobsData.map(job => job.location))].sort();
    const companies = [...new Set(jobsData.map(job => job.company))].sort();
    
    setFilterOptions(prev => ({
      ...prev,
      locations,
      companies
    }));
  };

  // Fetch jobs from backend with enhanced error handling
  const loadJobs = async (page = 1, newFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const queryParams = {
        page,
        limit: jobsPerPage,
        isActive: 'true'
      };
      
      // Add filters if they exist
      if (newFilters.search) queryParams.search = newFilters.search;
      if (newFilters.location) queryParams.location = newFilters.location;
      if (newFilters.jobType) queryParams.jobType = newFilters.jobType;
      if (newFilters.salaryMin) queryParams.salaryMin = newFilters.salaryMin;
      if (newFilters.salaryMax) queryParams.salaryMax = newFilters.salaryMax;
      if (newFilters.sortBy) queryParams.sortBy = newFilters.sortBy;
      if (newFilters.order) queryParams.order = newFilters.order;
      
      console.log('Fetching jobs with params:', queryParams);
      
      // Call the API
      const response = await jobAPI.getAllJobs(queryParams);
      
      console.log('API response:', response);
      
      setJobs(response.jobs);
      setPagination({
        total: response.pagination.total,
        page: response.pagination.page,
        limit: response.pagination.limit,
        totalPages: response.pagination.totalPages
      });

      // Extract filter options from first load
      if (page === 1 && (!filterOptions.locations.length || !filterOptions.companies.length)) {
        extractFilterOptions(response.jobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs. Please check your connection and try again.');
      
      // Set empty data for debugging
      setJobs([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  // Load jobs on component mount
  useEffect(() => {
    loadJobs(1);
    fetchSavedJobs();
  }, []);

  // Reload when page changes
  useEffect(() => {
    loadJobs(currentPage);
  }, [currentPage]);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    loadJobs(1, filters);
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (key !== 'search') {
      setCurrentPage(1);
      loadJobs(1, newFilters);
    }
  };

  // Handle sort change
  const handleSortChange = (sortBy, order) => {
    const newFilters = { ...filters, sortBy, order };
    setFilters(newFilters);
    setCurrentPage(1);
    loadJobs(1, newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      location: '',
      jobType: '',
      salaryMin: '',
      salaryMax: '',
      sortBy: 'createdAt',
      order: 'desc'
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    loadJobs(1, clearedFilters);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const totalPages = pagination.totalPages || 1;
    
    pages.push(1);
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    if (currentPage <= 2) {
      endPage = Math.min(4, totalPages);
    }
    
    if (currentPage >= totalPages - 1) {
      startPage = Math.max(2, totalPages - 2);
    }
    
    if (startPage > 2) {
      pages.push('...');
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Test API connection
  const testAPIConnection = async () => {
    try {
      console.log('Testing API connection...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/health`);
      const data = await response.json();
      console.log('API health check:', data);
      return data;
    } catch (error) {
      console.error('API connection test failed:', error);
      return null;
    }
  };

  // Debug function to check what's happening
  useEffect(() => {
    console.log('Current state:', {
      loading,
      error,
      jobs,
      pagination,
      filters
    });
    
    // Test API connection on component mount
    testAPIConnection();
  }, [loading, error, jobs, pagination]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Find Job</h1>
              <div className="text-sm text-gray-500">
                Home / Find Job
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Job title, keyword, company..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="">All Locations</option>
                    {filterOptions.locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              <select
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Job Types</option>
                {filterOptions.jobTypes.map(type => (
                  <option key={type} value={type}>{formatJobType(type)}</option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Find Job
              </button>
            </div>

            {/* Salary Filter */}
            <div className="mt-4 flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Salary:</label>
                <input
                  type="number"
                  placeholder="Min ($)"
                  value={filters.salaryMin}
                  onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max ($)"
                  value={filters.salaryMax}
                  onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {(filters.search || filters.location || filters.jobType || filters.salaryMin || filters.salaryMax) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {pagination.total ? `${pagination.total} jobs found` : 'Loading...'}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              value={`${filters.sortBy}_${filters.order}`}
              onChange={(e) => {
                const [sortBy, order] = e.target.value.split('_');
                handleSortChange(sortBy, order);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="title_asc">Title A-Z</option>
              <option value="title_desc">Title Z-A</option>
              <option value="company_asc">Company A-Z</option>
              <option value="company_desc">Company Z-A</option>
              <option value="salaryMax_desc">Salary High to Low</option>
              <option value="salaryMin_asc">Salary Low to High</option>
              <option value="viewCount_desc">Most Viewed</option>
            </select>
            
            <select 
              value={jobsPerPage}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              disabled
            >
              <option value={jobsPerPage}>{jobsPerPage} per page</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 ${viewType === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-2 ${viewType === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
            <button
              onClick={() => loadJobs(currentPage)}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Job Listings */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading jobs...</span>
          </div>
        ) : jobs.length > 0 ? (
          <>
            <div className={`grid gap-6 mb-8 ${
              viewType === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {jobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={savedJobs.has(job.id)}
                  onClick={() => router.push(`/jobs/${job.id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={index} className="px-4 py-2 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 border border-gray-300 rounded-lg font-medium ${
                        currentPage === page 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No jobs found</div>
            <div className="text-gray-400 mb-4">Try adjusting your search filters</div>
            {(filters.search || filters.location || filters.jobType || filters.salaryMin || filters.salaryMax) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Clear all filters and try again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingPage;