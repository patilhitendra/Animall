/**
 * AuthLoadingScreen Component
 * Loading screen with animated cow icon for Login/OTP verification
 * Matches the design from screenshots
 */

import { useEffect, useState } from 'react';

export default function AuthLoadingScreen({ 
  message = 'आपला OTP सत्यापित केला जात आहे...',
  onComplete 
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) onComplete();
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#c8e6c9] to-[#f5e6c8] flex flex-col items-center justify-center">
      {/* Animated Cow Icon with Circular Background */}
      <div className="relative mb-8">
        {/* Rotating circular border */}
        <div className="absolute inset-0 animate-spin">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#0d9488"
              strokeWidth="4"
              strokeDasharray="70 200"
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        {/* Cow Icon Center */}
        <div className="w-24 h-24 rounded-full bg-teal-600 flex items-center justify-center shadow-lg">
          <svg
            className="w-12 h-12 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {/* Simple cow silhouette */}
            <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.42.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
          </svg>
        </div>
      </div>

      {/* Loading Message */}
      {message && (
        <p className="text-lg font-semibold text-gray-700 mb-2 text-center px-6">
          {message}
        </p>
      )}

      {/* Progress dots */}
      <div className="flex gap-2 mt-4">
        <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
    </div>
  );
}
