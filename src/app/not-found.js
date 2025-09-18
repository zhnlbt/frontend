'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-5 h-5 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[20%] right-[15%] w-4 h-4 bg-blue-500 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[20%] left-[20%] w-6 h-6 bg-blue-300 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[30%] right-[25%] w-3 h-3 bg-blue-600 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '3s' }}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-[15%] left-[70%] w-2 h-2 bg-gray-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-[60%] left-[5%] w-1 h-1 bg-gray-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[80%] right-[10%] w-2 h-2 bg-gray-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-6 flex items-center justify-between max-w-6xl">
        {/* Content Section */}
        <div className="flex-1 max-w-md">
          <h1 className="text-4xl lg:text-5xl font-semibold text-slate-800 mb-6">
            Opps! Page not found
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {`Something went wrong. It's look like the link is broken or the page is removed.`}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
            href="/"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Home
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <button 
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1"
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative">
            <Image 
              src="/Illustration.png" 
              alt="404 Robot Illustration" 
              className="w-auto h-96 max-w-full animate-bounce"
              style={{ animationDuration: '3s' }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Custom404;