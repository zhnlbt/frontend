'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, FileText, Link, Phone } from 'lucide-react';

const AccountSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal data
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Profile info
    bio: '',
    website: '',
    skills: [],
    
    // Social links
    twitter: '',
    linkedin: '',
    github: '',
    
    // Contact preferences
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true
  });

  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: User,
      component: PersonalStep
    },
    {
      id: 'profile',
      title: 'Profile Info',
      icon: FileText,
      component: ProfileStep
    },
    {
      id: 'social',
      title: 'Social Links',
      icon: Link,
      component: SocialStep
    },
    {
      id: 'contact',
      title: 'Contact Preferences',
      icon: Phone,
      component: ContactStep
    }
  ];

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                    ${isActive ? 'border-blue-500 bg-blue-500 text-white' : 
                      isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                      'border-gray-300 bg-white text-gray-400'}
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-3 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 ml-6 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Step Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Account Setup
            </h2>
            <p className="text-gray-600">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </p>
          </div>

          {/* Dynamic Step Content */}
          <div className="mb-8 min-h-[400px]">
            <CurrentStepComponent 
              data={formData} 
              updateData={updateFormData}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={() => alert('Setup completed!')}
                className="flex items-center px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
              >
                Complete Setup
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Components
function PersonalStep({ data, updateData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your first name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => updateData({ phone: e.target.value })}
          className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your phone number"
        />
      </div>
    </div>
  );
}

function ProfileStep({ data, updateData }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          value={data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          rows={4}
          className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tell us about yourself..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website
        </label>
        <input
          type="url"
          value={data.website}
          onChange={(e) => updateData({ website: e.target.value })}
          className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://your-website.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills (comma-separated)
        </label>
        <input
          type="text"
          value={data.skills.join(', ')}
          onChange={(e) => updateData({ skills: e.target.value.split(',').map(s => s.trim()) })}
          className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="React, JavaScript, Design..."
        />
      </div>
    </div>
  );
}

function SocialStep({ data, updateData }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Twitter
        </label>
        <input
          type="url"
          value={data.twitter}
          onChange={(e) => updateData({ twitter: e.target.value })}
          className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://twitter.com/username"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          LinkedIn
        </label>
        <input
          type="url"
          value={data.linkedin}
          onChange={(e) => updateData({ linkedin: e.target.value })}
          className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://linkedin.com/in/username"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          GitHub
        </label>
        <input
          type="url"
          value={data.github}
          onChange={(e) => updateData({ github: e.target.value })}
          className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://github.com/username"
        />
      </div>
    </div>
  );
}

function ContactStep({ data, updateData }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={data.emailNotifications}
            onChange={(e) => updateData({ emailNotifications: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded text-black"
          />
          <label htmlFor="emailNotifications" className="ml-3 text-sm font-medium text-gray-700">
            Email Notifications
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="smsNotifications"
            checked={data.smsNotifications}
            onChange={(e) => updateData({ smsNotifications: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded text-black"
          />
          <label htmlFor="smsNotifications" className="ml-3 text-sm font-medium text-gray-700">
            SMS Notifications
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="newsletter"
            checked={data.newsletter}
            onChange={(e) => updateData({ newsletter: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded text-black"
          />
          <label htmlFor="newsletter" className="ml-3 text-sm font-medium text-gray-700">
            Subscribe to Newsletter
          </label>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Review Your Information</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountSetup;