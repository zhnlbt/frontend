'use client'
import { Search, MapPin, Briefcase, Building2, Users, FileText } from 'lucide-react';
import Header from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';

const StatCard = ({ icon, number, label, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-6 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow duration-200`}>
    <div className="text-blue-600">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-800">{number}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  </div>
);

const JobCategory = ({ title, positions, isHighlighted = false }) => (
  <div className="mb-6 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
    <h3 className={`font-medium ${isHighlighted ? 'text-blue-600 border-b border-blue-600' : 'text-gray-800'} mb-1 text-lg`}>
      {title}
    </h3>
    <p className="text-gray-500 text-sm">{positions}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="container w-full bg-[#F1F2F4] font-in">
      <Header />
      {/* Hero Section */}
      <section className="bg-[#f1f2f4] py-20">
        <div className="w-[68.75%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Find a job that suits<br />
                your interest & skills.
              </h1>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Aliquam vitae turpis in diam convallis finibus in at risus. Nullam 
                in scelerisque leo, eget sollicitudin velit bestibulum.
              </p>

              {/* Search Bar */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center space-x-3 mb-6 shadow-sm">
                <div className="flex-1 flex items-center space-x-3">
                  <Search className="h-5 w-5 text-[#0A65CC]" />
                  <input
                    type="text"
                    placeholder="Job title, Keyword..."
                    className="flex-1 outline-none text-gray-700 text-base"
                  />
                </div>
                <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
                  <MapPin className="h-5 w-5 text-[#0A65CC]" />
                  <input
                    type="text"
                    placeholder="Your Location"
                    className="outline-none text-gray-700 text-base w-32"
                  />
                </div>
                <button className="bg-[#0A65CC] text-white px-8 py-3 rounded-sm hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Find Job
                </button>
              </div>

              {/* Suggestions */}
              <div className="text-sm text-gray-500">
                <span className="font-medium">Suggestion:</span>{' '}
                <span className="text-gray-700">Designer, Programming, </span>
                <span className="text-blue-600 cursor-pointer hover:underline">Digital Marketing</span>
                <span className="text-gray-700">, Video, Animation.</span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <Image
                src="/image.png"
                width={400}
                height={300}
                alt="Job search illustration"
                className="w-auto h-96"
                priority
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                icon={<Briefcase className="h-8 w-8" />}
                number="1,75,324"
                label="Live Jobs"
                bgColor="bg-white"
              />
              <StatCard
                icon={<Building2 className="h-8 w-8 text-[#0A65CC] " />}
                number="97,354"
                label="Companies"
                bgColor="bg-blue-50"
              />
              <StatCard
                icon={<Users className="h-8 w-8" />}
                number="38,47,154"
                label="Candidates"
                bgColor="bg-white"
              />
              <StatCard
                icon={<FileText className="h-8 w-8" />}
                number="7,532"
                label="New Jobs"
                bgColor="bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Vacancies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-5">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
              Most Popular Vacancies
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Column 1 */}
            <div className="space-y-1 font-medium">
              <JobCategory title="Anesthesiologists" positions="45,904 Open Positions" />
              <JobCategory title="Maxillofacial Surgeons" positions="74,875 Open Positions" />
              <JobCategory title="Financial Manager" positions="61,391 Open Positions" />
            </div>

            {/* Column 2 */}
            <div className="space-y-1">
              <JobCategory title="Surgeons" positions="50,364 Open Positions" />
              <JobCategory title="Software Developer" positions="43,359 Open Positions" />
              <JobCategory title="Management Analysis" positions="93,046 Open Positions" />
            </div>

            {/* Column 3 */}
            <div className="space-y-1">
              <JobCategory title="Obstetricians-Gynecologists" positions="4,339 Open Positions" />
              <JobCategory title="Psychiatrists" positions="18,599 Open Positions" />
              <JobCategory title="IT Manager" positions="50,963 Open Positions" />
            </div>

            {/* Column 4 */}
            <div className="space-y-1">
              <JobCategory title="Orthodontists" positions="20,079 Open Positions" />
              <JobCategory title="Data Scientist" positions="28,200 Open Positions" isHighlighted />
              <JobCategory title="Operations Research Analysis" positions="16,627 Open Positions" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;