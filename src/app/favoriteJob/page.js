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
  HeartOff,
  Trash2
} from 'lucide-react';
import { jobAPI } from '../utils/api';
import { useUser } from '../context/userContext';

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

// Favorite Job Card Component
const FavoriteJobCard = ({ job, onRemoveFavorite, savedAt }) => {
  // Generate company logo placeholder
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

  const handleRemoveFavorite = (e) => {
    e.stopPropagation();
    onRemoveFavorite(job.id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer relative">
      {/* Remove from favorites button */}
      <button
        onClick={handleRemoveFavorite}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors group"
        title="Remove from favorites"
      >
        <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover:text-red-600" />
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-4 pr-10">
        <div className="flex items-start space-x-4">
          {/* Company Logo */}
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
        
        {/* Job Type Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
          {formatJobType(job.jobType)}
        </span>
      </div>

      {/* Salary */}
      <div className="flex items-center text-green-600 font-semibold mb-3">
        <DollarSign className="w-4 h-4 mr-1" />
        {formatSalary(job.salaryMin, job.salaryMax, job.salary)}
      </div>

      {/* Requirements */}
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

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Posted {formatDate(job.createdAt)}
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-1 text-red-500" />
            Saved {formatDate(savedAt)}
          </div>
        </div>
        <div className="flex items-center">
          <Eye className="w-4 h-4 mr-1" />
          {job.viewCount} views
        </div>
      </div>
    </div>
  );
};

// Main Component
const FavoriteJobsPage = () => {
  const { user } = useUser();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [viewType, setViewType] = useState('grid');
  
  // Local filters for saved jobs
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    sortBy: 'savedAt',
    order: 'desc'
  });

  // Filter options based on saved jobs
  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    jobTypes: []
  });

  const jobsPerPage = 4;

  // Extract filter options from saved jobs
  const extractFilterOptions = (jobsData) => {
    const locations = [...new Set(jobsData.map(job => job.location))].sort();
    const jobTypes = [...new Set(jobsData.map(job => job.jobType))].sort();
    
    setFilterOptions({
      locations,
      jobTypes
    });
  };

  // Filter jobs locally
  const filterJobs = (jobs, filters) => {
    let filtered = [...jobs];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job => job.jobType === filters.jobType);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (filters.sortBy) {
        case 'savedAt':
          aVal = new Date(a.savedAt);
          bVal = new Date(b.savedAt);
          break;
        case 'title':
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
          break;
        case 'company':
          aVal = a.company.toLowerCase();
          bVal = b.company.toLowerCase();
          break;
        case 'createdAt':
          aVal = new Date(a.createdAt);
          bVal = new Date(b.createdAt);
          break;
        default:
          return 0;
      }

      if (filters.order === 'desc') {
        return bVal > aVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });

    return filtered;
  };

  // Fetch saved jobs
  const fetchSavedJobs = async () => {
    if (!user || user.role !== 'CANDIDATE') {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await jobAPI.getSavedJobs({ page: 1, limit: 1000 }); // Get all saved jobs
      setSavedJobs(response.savedJobs);
      extractFilterOptions(response.savedJobs);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      alert('Failed to fetch saved jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Remove job from favorites
  const handleRemoveFavorite = async (jobId) => {
    try {
      await jobAPI.toggleSaveJob(jobId);
      
      // Remove from local state
      setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error removing favorite job:', error);
      alert('Failed to remove job from favorites. Please try again.');
    }
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobType: '',
      sortBy: 'savedAt',
      order: 'desc'
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [user]);

  // Get filtered and paginated jobs
  const filteredJobs = filterJobs(savedJobs, filters);
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 1) return pages;
    
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

  // Redirect if not a candidate
  if (user && user.role !== 'CANDIDATE') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">Only candidates can view favorite jobs.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">My Favorite Jobs</h1>
              <div className="text-sm text-gray-500">
                Home / Favorite Jobs
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search favorite jobs..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
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

              {(filters.search || filters.location || filters.jobType) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear filters
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
              {totalJobs} favorite {totalJobs === 1 ? 'job' : 'jobs'}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              value={`${filters.sortBy}_${filters.order}`}
              onChange={(e) => {
                const [sortBy, order] = e.target.value.split('_');
                setFilters(prev => ({ ...prev, sortBy, order }));
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="savedAt_desc">Recently Saved</option>
              <option value="savedAt_asc">Oldest Saved</option>
              <option value="createdAt_desc">Latest Posted</option>
              <option value="createdAt_asc">Oldest Posted</option>
              <option value="title_asc">Title A-Z</option>
              <option value="title_desc">Title Z-A</option>
              <option value="company_asc">Company A-Z</option>
              <option value="company_desc">Company Z-A</option>
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

        {/* Job Listings */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading favorite jobs...</span>
          </div>
        ) : paginatedJobs.length > 0 ? (
          <>
            <div className={`grid gap-6 mb-8 ${
              viewType === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {paginatedJobs.map((job) => (
                <FavoriteJobCard 
                  key={job.id} 
                  job={job} 
                  onRemoveFavorite={handleRemoveFavorite}
                  savedAt={job.savedAt}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                      onClick={() => setCurrentPage(page)}
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
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            {savedJobs.length === 0 ? (
              // No saved jobs at all
              <div>
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-500 text-lg mb-2">No favorite jobs yet</div>
                <div className="text-gray-400 mb-4">Start browsing jobs and save the ones you like!</div>
                <button
                  onClick={() => window.location.href = '/findJob'}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              // No jobs match current filters
              <div>
                <div className="text-gray-500 text-lg mb-2">No jobs match your filters</div>
                <div className="text-gray-400 mb-4">Try adjusting your search criteria</div>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteJobsPage;