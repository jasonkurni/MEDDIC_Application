import React, { useState } from 'react';

interface InfoTooltipProps {
  content: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex items-center justify-center w-4 h-4 text-xs text-blue-600 hover:text-blue-800 focus:outline-none transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-label="More information"
      >
        <span className="font-bold">ℹ️</span>
      </button>
      
      {isVisible && (
        <div className="absolute z-50 w-80 p-3 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-lg left-0 top-full">
          <div className="whitespace-pre-line leading-relaxed">
            {content}
          </div>
          <div className="absolute w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-45 -top-1.5 left-2"></div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;

// Made with Bob
