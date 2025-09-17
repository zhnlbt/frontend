'use client'

import { useState, useEffect } from 'react'
import Header from '../components/navbar'
import Footer from '../components/footer'

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('terms-condition')

  const sections = [
    { id: 'terms-condition', title: '01. Terms & Condition' },
    { id: 'limitations', title: '02. Limitations' },
    { id: 'security', title: '03. Security' },
    { id: 'privacy-policy', title: '04. Privacy Policy' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      sections.forEach(section => {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Terms & Conditions</span>
          </nav>
        </div>

        <div className="flex gap-8">
          <aside className="w-64 shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left text-sm py-2 px-3 rounded transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="flex-1 bg-white rounded-lg p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>

            <section id="terms-condition" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">01. Terms & Condition</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Praesent placerat dictum elementum. Nam pulvinar urna vel lectus maximus, eget faucibus turpis hendrerit. Sed 
                lacinia molestie arcu, et accumsan nisl. Quisque molestiae velit vitae ligula luctus bibendum. Duis et amet eros 
                mollis, viverra dictum sed, convallis sapien. Donec justo arcu, pharetra vitae dui ut, finibus auctor enim. Donec vell 
                tortor, mollis ac tortor suscipit, gravida lacinia arcu.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  In sit turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Curabitur luctus sapien augue, mattis faucibus elit vehicula nec. Mauris at scelerisque lorem. Nullam tempus 
                  felis ipsum, sagittis malesuada nulla vulputate et.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Aenean vel metus leo. Vivamus nec neque a libero sodales aliquam a et dolor.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Vestibulum rhoncus sagittis dolor vel finibus.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Integer feugiat lacus ut efficitur mattis. Sed quis molestae velit.
                </li>
              </ul>
            </section>

            <section id="limitations" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">02. Limitations</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Integer ut luctus libero, at cursus dui tempor ultricies. Curabitur ut consectetur lorem mauris mattis hendrerit lorem 
                tincidunt. Sed consectetur lacinia arcu. Ut ut auctor mauris. Lorem ipsum dolor sit amet, consectetur adipiscing 
                elit. Fusce vel erat elit. In vitae turpis tempor, accumsan sapien vitae, rutrum eros. Integer pulvinar mauris turpis, ac 
                fermentum leo ullamcorper a. Nam finibus orci lorem, et amet mauris lacus tristique eu. Donec nec ex convallis, 
                ultricies orci et, mollis libero. Ut scelerisque lacus interdum consectetur sodales.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  In sit turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Curabitur luctus sapien augue.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Mattis faucibus elit vehicula nec. Mauris at scelerisque lorem.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et. Aenean vel metus leo.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Vivamus nec neque a libero sodales aliquam a et dolor.
                </li>
              </ul>
            </section>

            <section id="security" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">02. Security</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex neque, elementum eu blandit in, ornare eu 
                purus. Fusce nec rhoncus mi, quis ultrices lacus. Phasellus ut pellentesque nulla. Cras erat nisl, mattis et efficitur et, 
                lacinia a lacus. Fusce gravida augue quis leo facilisis.
              </p>
            </section>

            <section id="privacy-policy" className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">04. Privacy Policy</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Praesent non sem faucibus, nonorern mi vitae, volutpat quam. Aliquam metus mauris, tempor eu, eros vitae, blandit 
                tristique metus. Vestibulum maximus nec justo sed maximus. Vivamus at amet turpis sem. Integer vitae tortor ac ex 
                scelerisque faucibus at vitae urna. In hac habitasse platea dictumst. Maecenas imperdiet tortor arcu, nec tincidunt 
                neque malesuada volutpat.
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  In sit turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Aenean vel metus leo.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Vestibulum rhoncus sagittis dolor vel finibus.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 shrink-0"></span>
                  Integer feugiat lacus ut efficitur mattis. Sed quis molestae velit.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Fusce rutrum mauris sit amet justo rutrum, ut sodales lorem ullamcorper. Aliquam vitae iaculis urna. Nulla vitae mi 
                vel nisl viverra ullamcorper vel elementum est. Mauris vitae elit nec enim tincidunt aliquet. Donec ultrices nulla a 
                enim pulvinar, quis pulvinar lacus consectetur. Donec dignissim, risus nec mollis efficitur, turpis erat blandit urna, 
                eget elementum lacus lectus eget lorem.
              </p>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}