
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const dropdownRef = useRef(null);

  const languages = [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'ru',
      name: 'Russian',
      flag: '🇷🇺'
    }
  ];

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 min-w-[140px]"
  >
    <span className="text-lg">{selectedLang.flag}</span>
    <span className="text-sm font-medium text-gray-700">{selectedLang.name}</span>
    <ChevronDown 
      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
        isOpen ? 'rotate-180' : ''
      }`} 
    />
  </button>

  {isOpen && (
    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-in fade-in duration-200">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageSelect(language.code)}
          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
            selectedLanguage === language.code 
              ? 'bg-blue-50 text-blue-700' 
              : 'text-gray-700'
          }`}
        >
          <span className="text-lg">{language.flag}</span>
          <span className="text-sm font-medium">{language.name}</span>
          {selectedLanguage === language.code && (
            <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  )}
</div>

  );
};

export default LanguageDropdown;