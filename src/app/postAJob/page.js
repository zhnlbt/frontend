// app/employer/post-job/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/userContext';
import { jobAPI } from '../utils/api';
import ProtectedRoute from '../components/ProtectedRoute';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  GraduationCap, 
  Briefcase,
  Clock,
  Mail,
  Globe,
  LogOut,
  Plus,
  X,
  ChevronDown
} from 'lucide-react';

const PostJobPage = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    tags: [],
    jobRole: '',
    minSalary: '',
    maxSalary: '',
    salaryType: '',
    education: '',
    experience: '',
    jobType: '',
    vacancies: '',
    expirationDate: '',
    jobLevel: '',
    location: '',
    applicationMethod: 'jobpilot',
    externalUrl: '',
    email: '',
    description: '',
    responsibilities: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [showDropdown, setShowDropdown] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropdown options
  const jobRoles = ['Software Developer', 'Product Manager', 'Designer', 'Data Analyst', 'Marketing Specialist'];
  const salaryTypes = ['Monthly', 'Yearly', 'Hourly', 'Project Based'];
  const educationLevels = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Certification'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  const jobTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE'];
  const jobLevels = ['Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director'];
  const locations = ['Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL'];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle tag addition
  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle dropdown selection
  const handleDropdownSelect = (field, value) => {
    handleInputChange(field, value);
    setShowDropdown(prev => ({ ...prev, [field]: false }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.jobRole) newErrors.jobRole = 'Job role is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.jobType) newErrors.jobType = 'Job type is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Job responsibilities are required';
    
    if (formData.applicationMethod === 'external' && !formData.externalUrl.trim()) {
      newErrors.externalUrl = 'External URL is required';
    }
    
    if (formData.applicationMethod === 'email' && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for API
      const jobData = {
        title: formData.title,
        description: formData.description,
        company: user.company || 'Company Name',
        location: formData.location,
        salary: formData.minSalary && formData.maxSalary ? 
          `$${formData.minSalary} - $${formData.maxSalary}` : null,
        salaryMin: formData.minSalary ? parseInt(formData.minSalary) : null,
        salaryMax: formData.maxSalary ? parseInt(formData.maxSalary) : null,
        jobType: formData.jobType,
        requirements: [
          ...formData.tags,
          ...(formData.education ? [`Education: ${formData.education}`] : []),
          ...(formData.experience ? [`Experience: ${formData.experience}`] : []),
          ...(formData.jobLevel ? [`Level: ${formData.jobLevel}`] : [])
        ],
        benefits: [], // You might want to add a benefits field later
        applicationDeadline: formData.expirationDate ? new Date(formData.expirationDate).toISOString() : null
      };

      // Call API to create job
      const response = await jobAPI.createJob(jobData);
      
      alert('Job posted successfully!');
      
      // Redirect to jobs list or dashboard
      router.push('/employer/jobs');
      
    } catch (error) {
      console.error('Error posting job:', error);
      alert(error.message || 'Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom Dropdown Component
  const CustomDropdown = ({ field, options, placeholder, value }) => (
    <div className="relative">
      <button
        type="button"
        className="w-full px-4 py-3 text-left bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 flex items-center justify-between"
        onClick={() => setShowDropdown(prev => ({ ...prev, [field]: !prev[field] }))}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {showDropdown[field] && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              onClick={() => handleDropdownSelect(field, option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <ProtectedRoute requiredRole="EMPLOYER">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="bg-blue-600 p-2 rounded-lg mr-3">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">MyJob</span>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <a href="/employer/dashboard" className="text-gray-500 hover:text-gray-900">Home</a>
                <a href="/employer/candidates" className="text-gray-500 hover:text-gray-900">Find Candidate</a>
                <a href="/employer/dashboard" className="text-blue-600 font-medium">Dashboard</a>
                <a href="/employer/jobs" className="text-gray-500 hover:text-gray-900">My Jobs</a>
                <a href="/employer/applications" className="text-gray-500 hover:text-gray-900">Applications</a>
                <a href="/support" className="text-gray-500 hover:text-gray-900">Customer Supports</a>
              </nav>
              
              {/* User Actions */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">+1-202-555-0178</span>
                <span className="text-sm text-gray-600">English</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Post A Jobs
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-4">EMPLOYERS DASHBOARD</div>
                <nav className="space-y-2">
                  <a href="/employer/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 py-2">
                    <div className="w-4 h-4 mr-3 border rounded"></div>
                    Overview
                  </a>
                  <a href="/employer/profile" className="flex items-center text-gray-600 hover:text-blue-600 py-2">
                    <div className="w-4 h-4 mr-3 border rounded"></div>
                    Employers Profile
                  </a>
                  <a href="/employer/post-job" className="flex items-center text-blue-600 font-medium py-2">
                    <div className="w-4 h-4 mr-3 bg-blue-600 rounded"></div>
                    Post a Job
                  </a>
                  <a href="/employer/jobs" className="flex items-center text-gray-600 hover:text-blue-600 py-2">
                    <div className="w-4 h-4 mr-3 border rounded"></div>
                    My Jobs
                  </a>
                  <a href="/employer/saved-candidates" className="flex items-center text-gray-600 hover:text-blue-600 py-2">
                    <div className="w-4 h-4 mr-3 border rounded"></div>
                    Saved Candidate
                  </a>
                  <a href="/employer/billing" className="flex items-center text-gray-600 hover:text-blue-600 py-2">
                    <div className="w-4 h-4 mr-3 border rounded"></div>
                    Plans & Billing
                  </a>
                  <a href="/employer/companies" className="flex items-center text-gray-600 hover:text-blue-600 py-2">
                    <div className="w-4 h-4 mr-3 border rounded"></div>
                    All Companies
                  </a>
                  <a href="/employer/settings" className="flex items-center text-gray-600 hover:text-blue-600 py-2">
                    <div className="w-4 h-4 mr-3 border rounded"></div>
                    Settings
                  </a>
                </nav>
                
                <div className="mt-8 pt-4 border-t">
                  <button
                    onClick={logout}
                    className="flex items-center text-gray-600 hover:text-red-600 py-2"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Log-out
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-8">Post a job</h1>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Job Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="Add job title, role, vacancies etc"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.title ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                      </div>

                      {/* Job Role */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Role
                        </label>
                        <CustomDropdown
                          field="jobRole"
                          options={jobRoles}
                          placeholder="Select..."
                          value={formData.jobRole}
                        />
                        {errors.jobRole && <p className="text-red-500 text-sm mt-1">{errors.jobRole}</p>}
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <CustomDropdown
                          field="location"
                          options={locations}
                          placeholder="Select location..."
                          value={formData.location}
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                      </div>

                      {/* Job Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Type
                        </label>
                        <CustomDropdown
                          field="jobType"
                          options={jobTypes}
                          placeholder="Select..."
                          value={formData.jobType}
                        />
                        {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
                      </div>

                      {/* Tags - Full Width */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tags
                        </label>
                        <div className="space-y-2">
                          <div className="flex">
                            <input
                              type="text"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              placeholder="Job keyword, tags etc..."
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onKeyPress={(e) => e.key === 'Enter' && addTag(e)}
                            />
                            <button
                              type="button"
                              onClick={addTag}
                              className="px-4 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {formData.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="hover:text-blue-600"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Salary Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Salary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Min Salary
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={formData.minSalary}
                              onChange={(e) => handleInputChange('minSalary', e.target.value)}
                              placeholder="Minimum salary..."
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                              <span className="text-gray-500 sm:text-sm">USD</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Salary
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={formData.maxSalary}
                              onChange={(e) => handleInputChange('maxSalary', e.target.value)}
                              placeholder="Maximum salary..."
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                              <span className="text-gray-500 sm:text-sm">USD</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Salary Type
                          </label>
                          <CustomDropdown
                            field="salaryType"
                            options={salaryTypes}
                            placeholder="Select..."
                            value={formData.salaryType}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Advanced Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Advance Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Education
                          </label>
                          <CustomDropdown
                            field="education"
                            options={educationLevels}
                            placeholder="Select..."
                            value={formData.education}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Experience
                          </label>
                          <CustomDropdown
                            field="experience"
                            options={experienceLevels}
                            placeholder="Select..."
                            value={formData.experience}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vacancies
                          </label>
                          <CustomDropdown
                            field="vacancies"
                            options={['1', '2-5', '5-10', '10+']}
                            placeholder="Select..."
                            value={formData.vacancies}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiration Date
                          </label>
                          <input
                            type="date"
                            value={formData.expirationDate}
                            onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Level
                          </label>
                          <CustomDropdown
                            field="jobLevel"
                            options={jobLevels}
                            placeholder="Select..."
                            value={formData.jobLevel}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Application Method */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Apply Job on:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <label className="relative">
                          <input
                            type="radio"
                            name="applicationMethod"
                            value="jobpilot"
                            checked={formData.applicationMethod === 'jobpilot'}
                            onChange={(e) => handleInputChange('applicationMethod', e.target.value)}
                            className="sr-only"
                          />
                          <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            formData.applicationMethod === 'jobpilot' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">On Jobpilot</h4>
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                formData.applicationMethod === 'jobpilot' 
                                  ? 'bg-blue-500 border-blue-500' 
                                  : 'border-gray-300'
                              }`}>
                                {formData.applicationMethod === 'jobpilot' && (
                                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              Candidate will apply job using jobpilot & all application will show on your dashboard.
                            </p>
                          </div>
                        </label>

                        <label className="relative">
                          <input
                            type="radio"
                            name="applicationMethod"
                            value="external"
                            checked={formData.applicationMethod === 'external'}
                            onChange={(e) => handleInputChange('applicationMethod', e.target.value)}
                            className="sr-only"
                          />
                          <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            formData.applicationMethod === 'external' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">External Platform</h4>
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                formData.applicationMethod === 'external' 
                                  ? 'bg-blue-500 border-blue-500' 
                                  : 'border-gray-300'
                              }`}>
                                {formData.applicationMethod === 'external' && (
                                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              Candidate apply job on your website, all application will redirect to your own website.
                            </p>
                          </div>
                        </label>

                        <label className="relative">
                          <input
                            type="radio"
                            name="applicationMethod"
                            value="email"
                            checked={formData.applicationMethod === 'email'}
                            onChange={(e) => handleInputChange('applicationMethod', e.target.value)}
                            className="sr-only"
                          />
                          <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            formData.applicationMethod === 'email' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">On Your Email</h4>
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                formData.applicationMethod === 'email' 
                                  ? 'bg-blue-500 border-blue-500' 
                                  : 'border-gray-300'
                              }`}>
                                {formData.applicationMethod === 'email' && (
                                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              Candidate apply job on your email address, and all application in your email.
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Conditional inputs */}
                      {formData.applicationMethod === 'external' && (
                        <div className="mt-4">
                          <input
                            type="url"
                            value={formData.externalUrl}
                            onChange={(e) => handleInputChange('externalUrl', e.target.value)}
                            placeholder="External application URL"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.externalUrl ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.externalUrl && <p className="text-red-500 text-sm mt-1">{errors.externalUrl}</p>}
                        </div>
                      )}

                      {formData.applicationMethod === 'email' && (
                        <div className="mt-4">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Application email address"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                      )}
                    </div>

                    {/* Description & Responsibility */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Description & Responsibility</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Add your job description..."
                            rows={6}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                              errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Responsibilities
                          </label>
                          <textarea
                            value={formData.responsibilities}
                            onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                            placeholder="Add your job responsibilities..."
                            rows={6}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                              errors.responsibilities ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.responsibilities && <p className="text-red-500 text-sm mt-1">{errors.responsibilities}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6 border-t">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center gap-2 ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Posting Job...
                          </>
                        ) : (
                          <>
                            Post Job
                            <span className="text-lg">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-500">
              © 2024 MyJob - Job Portal. All rights Reserved
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
};

export default PostJobPage;


