'use client'

import { useState } from 'react';
import { ChevronUp, X, Plus } from 'lucide-react';

const AccordionItem = ({ title, children, isExpanded, onToggle, onClose }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 bg-white shadow-sm overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <span className="text-gray-700 font-medium">{title}</span>
        <div className="flex items-center space-x-2">
          {onClose && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
SIGMA BIY
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-500" />
          ) : (
            <Plus size={20} className="text-gray-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
          <div className="pt-3 text-gray-600 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const Accordion = () => {
  const [expandedItems, setExpandedItems] = useState(new Set(['account-1'])); // Default expanded

  const toggleItem = (id) => {
    const newExpanded = new Set(expandedItems);
    newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
    setExpandedItems(newExpanded);
  };

  const closeItem = (id) => {
    const newExpanded = new Set(expandedItems);
    newExpanded.delete(id);
    setExpandedItems(newExpanded);
  };

  const baseData = [
    {
      title: "Donec in ipsum sit amet mi tincidunt lacinia ut id risus.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus ac ex tempus, sed dictum libero lacinia."
    },
    {
      title: "Etiam rutrum ligula at dui tempor, eu tempus ligula tristique.",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
    },
    {
      title: "Morbi vitae neque eu sapien aliquet rhoncus.",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto bg-white rounded-xl shadow-lg p-8" style={{ maxWidth: '68.5%' }}>
        
        {/* Your Account Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Account</h2>
          <div>
            {baseData.map((item, index) => {
              const id = `account-${index}`;
              return (
                <AccordionItem
                  key={id}
                  title={item.title}
                  isExpanded={expandedItems.has(id)}
                  onToggle={() => toggleItem(id)}
                  onClose={index === 1 ? () => closeItem(id) : null}
                >
                  {item.content}
                </AccordionItem>
              );
            })}
          </div>
        </div>

        {/* Employers and Jobs Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Employers and Jobs</h2>
          <div>
            {baseData.map((item, index) => {
              const id = `employer-${index}`;
              return (
                <AccordionItem
                  key={id}
                  title={item.title}
                  isExpanded={expandedItems.has(id)}
                  onToggle={() => toggleItem(id)}
                >
                  {item.content}
                </AccordionItem>
              );
            })}
          </div>
        </div>

        {/* Candidate & Resume Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Candidate & Resume</h2>
          <div>
            {baseData.map((item, index) => {
              const id = `candidate-${index}`;
              return (
                <AccordionItem
                  key={id}
                  title={item.title}
                  isExpanded={expandedItems.has(id)}
                  onToggle={() => toggleItem(id)}
                >
                  {item.content}
                </AccordionItem>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Accordion;
