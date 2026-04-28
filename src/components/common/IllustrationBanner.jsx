/**
 * IllustrationBanner Component
 * High-quality illustration banner for Login/OTP pages
 * Proper image handling with aspect ratio preservation
 */

import { useState } from 'react';

export default function IllustrationBanner({ 
  imageSrc = '/images/farmer-illustration.png',
  altText = 'Farmer with cows illustration',
  aspectRatio = '16/9',
  showOverlay = true 
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="w-full flex items-end justify-center pb-4 bg-gradient-to-b from-[#c8e6c9] to-[#f5e6c8]"
      style={{ minHeight: '45vh' }}
    >
      <div className="w-full max-w-md px-4">
        {!imageError ? (
          <div 
            className="relative w-full"
            style={{ aspectRatio }}
          >
            <img
              src={imageSrc}
              alt={altText}
              className="w-full h-full object-contain"
              loading="eager"
              onError={() => setImageError(true)}
            />
            
            {showOverlay && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#f5e6c8]/30 to-transparent pointer-events-none" />
            )}
          </div>
        ) : (
          <FallbackIllustration />
        )}
      </div>
    </div>
  );
}

/**
 * Fallback SVG illustration when image fails to load
 * Simplified but professional-looking farmer scene
 */
function FallbackIllustration() {
  return (
    <svg 
      viewBox="0 0 400 300" 
      className="w-full h-auto" 
      preserveAspectRatio="xMidYMeet"
      aria-label="Farmer with cattle illustration"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#87CEEB', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#E0F2F1', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F5DEB3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D2B48C', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect x="0" y="0" width="400" height="180" fill="url(#skyGrad)" />
      <rect x="0" y="180" width="400" height="120" fill="url(#groundGrad)" />
      
      {/* Simple hills */}
      <ellipse cx="100" cy="200" rx="120" ry="40" fill="#9CCC65" opacity="0.6" />
      <ellipse cx="320" cy="210" rx="100" ry="35" fill="#8BC34A" opacity="0.5" />
      
      {/* Cattle silhouettes */}
      <g transform="translate(50,180)">
        <ellipse cx="30" cy="35" rx="35" ry="22" fill="#8D6E63" />
        <rect x="10" y="50" width="8" height="20" rx="4" fill="#6D4C41" />
        <rect x="42" y="50" width="8" height="20" rx="4" fill="#6D4C41" />
        <circle cx="45" cy="28" r="12" fill="#8D6E63" />
      </g>
      
      <g transform="translate(260,190)">
        <ellipse cx="30" cy="30" rx="30" ry="18" fill="#FFAB91" />
        <rect x="12" y="42" width="7" height="18" rx="3" fill="#FF8A65" />
        <rect x="38" y="42" width="7" height="18" rx="3" fill="#FF8A65" />
        <circle cx="42" cy="25" r="10" fill="#FFAB91" />
      </g>
      
      {/* Farmer figure */}
      <g transform="translate(150,120)">
        {/* Turban */}
        <ellipse cx="50" cy="18" rx="24" ry="10" fill="#FF7043" />
        <ellipse cx="50" cy="15" rx="20" ry="8" fill="#FF5722" />
        
        {/* Head */}
        <circle cx="50" cy="35" r="18" fill="#FFB74D" />
        
        {/* Eyes */}
        <circle cx="44" cy="33" r="2" fill="#3E2723" />
        <circle cx="56" cy="33" r="2" fill="#3E2723" />
        
        {/* Mustache */}
        <path d="M 44 40 Q 50 43 56 40" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        
        {/* Body */}
        <rect x="32" y="53" width="36" height="50" rx="6" fill="#FAFAFA" />
        
        {/* Arms crossed */}
        <ellipse cx="25" cy="65" rx="12" ry="6" fill="#FFB74D" />
        <ellipse cx="75" cy="65" rx="12" ry="6" fill="#FFB74D" />
        
        {/* Legs */}
        <rect x="36" y="100" width="12" height="35" rx="5" fill="#78909C" />
        <rect x="52" y="100" width="12" height="35" rx="5" fill="#78909C" />
      </g>
      
      {/* Grass tufts */}
      <path d="M 30 240 Q 32 230 34 240 M 150 245 Q 152 235 154 245 M 280 242 Q 282 232 284 242" 
            stroke="#689F38" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
