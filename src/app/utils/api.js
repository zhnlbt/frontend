// utils/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  return handleResponse(response);
};

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  logout: async () => {
    return makeAuthenticatedRequest('/users/logout', { method: 'POST' });
  },

  refreshToken: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/users/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    return handleResponse(response);
  },
};

// Job API calls
export const jobAPI = {
  // Create a new job
  createJob: async (jobData) => {
    return makeAuthenticatedRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  // Get all jobs
  getAllJobs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/jobs${queryString ? `?${queryString}` : ''}`;
    return makeAuthenticatedRequest(url);
  },

  // Get job by ID
  getJobById: async (jobId) => {
    return makeAuthenticatedRequest(`/jobs/${jobId}`);
  },

  // Update job
  updateJob: async (jobId, jobData) => {
    return makeAuthenticatedRequest(`/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  },

  // Delete job
  deleteJob: async (jobId) => {
    return makeAuthenticatedRequest(`/jobs/${jobId}`, { method: 'DELETE' });
  },

  // Get employer's jobs
  getEmployerJobs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/jobs/employer/my-jobs${queryString ? `?${queryString}` : ''}`;
    return makeAuthenticatedRequest(url);
  },

  // Save/unsave job (for candidates)
  toggleSaveJob: async (jobId) => {
    return makeAuthenticatedRequest(`/jobs/${jobId}/save`, { method: 'POST' });
  },

  // Get saved jobs
  getSavedJobs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/jobs/saved/my-jobs${queryString ? `?${queryString}` : ''}`;
    return makeAuthenticatedRequest(url);
  },
};

// Application API calls
export const applicationAPI = {
  // Apply to job
  applyToJob: async (jobId, applicationData) => {
    return makeAuthenticatedRequest(`/applications/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },

  // Get candidate's applications
  getMyApplications: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/applications/my-applications${queryString ? `?${queryString}` : ''}`;
    return makeAuthenticatedRequest(url);
  },

  // Get applications for a job (employer)
  getJobApplications: async (jobId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/applications/jobs/${jobId}/applications${queryString ? `?${queryString}` : ''}`;
    return makeAuthenticatedRequest(url);
  },

  // Update application status
  updateApplicationStatus: async (applicationId, status, notes) => {
    return makeAuthenticatedRequest(`/applications/${applicationId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  },

  // Withdraw application
  withdrawApplication: async (applicationId) => {
    return makeAuthenticatedRequest(`/applications/${applicationId}/withdraw`, {
      method: 'DELETE',
    });
  },
};

// User API calls
export const userAPI = {
  // Get profile
  getProfile: async () => {
    return makeAuthenticatedRequest('/users/profile');
  },

  // Update profile
  updateProfile: async (profileData) => {
    return makeAuthenticatedRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return makeAuthenticatedRequest('/users/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};