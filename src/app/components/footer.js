import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#18191C] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BriefcaseBusiness className="w-8 h-8 text-white" />
              <span className="text-xl font-semibold">MyJob</span>
            </div>

            <div className="text-gray-400 mb-4">
              <p className="mb-2">
                Call now: <strong className="text-white">(319) 555-0115</strong>
              </p>
              <p className="text-sm leading-relaxed">
                6391 Elgin St. Celina, Delaware 10299, New York, United States
                of America
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  Contact
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Candidate</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/browse-jobs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/browse-employers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Employers
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate-dashboard"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/saved-jobs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Employers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/post-job"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/browse-candidates"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link
                  href="/employers-dashboard"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Employers Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/applications"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Applications
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faqs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Faqs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 MyJob - Job Portal. All rights Reserved
          </p>

          {/* Social Media Icons */}
          {/* <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
