import React from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-blue-600 font-medium mb-4">Who we are</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {`We're highly skilled and professionals team.`}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Praesent non sem facilisis, hendrerit nisi vitae, volutpat quam. Aliquam 
              mattis mauris, semper eu eros vitae, blandit tristique metus. Vestibulum 
              maximus nec justo sed maximus.
            </p>
          </div>

          {/* Right Stats */}
          <div className="space-y-6">
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,75,324</div>
                <div className="text-gray-500">Live Job</div>
              </div>
            </div>
            
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">97,354</div>
                <div className="text-gray-500">Companies</div>
              </div>
            </div>
            
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">38,47,154</div>
                <div className="text-gray-500">Candidates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="mt-16">
          <div className="flex flex-wrap justify-center lg:justify-between items-center opacity-40 space-x-8">
            <div className="text-2xl font-bold text-gray-400">amazon</div>
            <div className="text-2xl font-bold text-gray-400">Google</div>
            <div className="text-2xl font-bold text-gray-400">ENSIGMA</div>
            <div className="text-2xl font-bold text-gray-400">NIO</div>
            <div className="text-2xl font-bold text-gray-400">IEEE</div>
            <div className="text-2xl font-bold text-gray-400">VSA</div>
          </div>
        </div>

        {/* Checker Pattern */}
        <div className="mt-16 flex justify-center">
          <Image
            src="/Checker.png"
            alt="Checker pattern"
            width={600}
            height={200}
            className="object-contain"
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-blue-600 font-medium mb-4">Our Mission</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Our mission is help people to find the perfect job.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Praesent non sem facilisis, hendrerit nisi vitae, volutpat quam. Aliquam 
                mattis mauris, semper eu eros vitae, blandit tristique metus. Vestibulum 
                maximus nec justo sed maximus.
              </p>
            </div>

            {/* Right Illustration */}
            <div className="relative">
              <div className="bg-blue-50 rounded-2xl p-8 relative overflow-hidden">
                {/* Simple illustration representation */}
                <div className="relative z-10 flex justify-center">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
                {/* Background elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-200 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-blue-300 rounded-full opacity-50"></div>
                <div className="absolute top-1/2 left-8 w-4 h-4 bg-blue-400 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Another Checker Pattern */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-start">
            <Image
              src="/Checker.png"
              alt="Checker pattern"
              width={400}
              height={150}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-medium mb-4">Testimonials</p>
            <h2 className="text-4xl font-bold text-gray-900">What our people says</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 relative">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-center text-gray-700 text-lg leading-relaxed mb-8">
                {`"Curabitur vitae aliquam risus. Mauris quis vehicula nisl, sed commodo 
                ipsum. Praesent semper diam ut diam elementum, ut scelerisque nibh 
                commodo. Integer faucibus pretium vehicula. Maecenas venenatis dictum 
                ligula. Orci varius nibh porttitor et magnis dis parturient montes."`}
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <p className="font-semibold text-gray-900">John Wick</p>
                <p className="text-gray-500">Google Engineer</p>
              </div>

              {/* Quote mark */}
              <div className="absolute bottom-4 right-8 text-6xl text-gray-300 font-serif">{`"`}</div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-8 space-x-2">
              <button className="w-3 h-3 bg-blue-600 rounded-full"></button>
              <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
              <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Checker Pattern */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-end">
            <Image
              src="/Checker.png"
              alt="Checker pattern"
              width={300}
              height={120}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Become a Candidate */}
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Become a Candidate
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Cum in harum definitione, multo unum rem facturum esse arbitrabimur, curis et omnibus juste magna dis parturient montes, nascetur ridiculus.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center">
                Register Now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Become an Employer */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Become an Employer
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Cum in harum definitione, multo unum rem facturum esse arbitrabimur, curis et omnibus juste magna nascetur ridiculus mus.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center">
                Register Now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;