/**
 * HeroBanner Component
 * Reusable banner component for HomePage Buy/Sell sections
 * Matches design mockups with proper image handling
 */

import PropTypes from 'prop-types';

export default function HeroBanner({ 
  title, 
  subtitle, 
  ctaText, 
  onClick, 
  images = [], 
  variant = 'primary' 
}) {
  const bgColor = variant === 'primary' ? 'bg-teal-700' : 'bg-teal-600';
  
  return (
    <button
      onClick={onClick}
      className={`w-full ${bgColor} rounded-2xl shadow-lg p-5 flex items-center gap-4
                 active:scale-[0.98] transition-transform text-left relative overflow-hidden`}
      aria-label={title}
    >
      {/* Content Section */}
      <div className="flex-1 z-10">
        <h2 className="text-xl font-extrabold text-white mb-1 flex items-center gap-2">
          {title} <span className="text-lg">›</span>
        </h2>
        <p className="text-sm text-white/90 mb-2">{subtitle}</p>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
          <p className="text-xs text-lime-300 font-semibold">{ctaText}</p>
        </div>
      </div>

      {/* Image Section - Exact positioning like screenshot */}
      <div className="flex-shrink-0 relative h-32 w-36">
        {images.length > 0 ? (
          variant === 'primary' ? (
            /* Buy Banner - Two cows side by side */
            <div className="relative h-full flex items-end justify-end">
              {/* White cow - left, larger */}
              <img
                src={images[0]?.src || ''}
                alt={images[0]?.alt || ''}
                className="absolute bottom-0 left-0 w-40 h-30 object-contain z-10"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Brown cow - right, slightly smaller */}
              {/* <img
                src={images[1]?.src || ''}
                alt={images[1]?.alt || ''}
                className="absolute bottom-0 right-0 w-20 h-24 object-contain"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              /> */}
            </div>
          ) : (
            /* Sell Banner - Sellers + cow in circular layout */
            <div className="relative h-full w-full">
              {/* Top seller - top right */}
              <img
                src={images[0]?.src || ''}
                alt={images[0]?.alt || ''}
                className="absolute top-0 right-4 w-14 h-14 rounded-full object-contain border-2 border-white z-20"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Left seller - middle left */}
              <img
                src={images[1]?.src || ''}
                alt={images[1]?.alt || ''}
                className="absolute top-8 left-0 w-14 h-14 rounded-full object-contain border-2 border-white z-20"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Bottom right seller - bottom right */}
              <img
                src={images[2]?.src || ''}
                alt={images[2]?.alt || ''}
                className="absolute bottom-4 right-0 w-14 h-14 rounded-full object-contain border-2 border-white z-20"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {/* Cow - center bottom */}
              <img
                src={images[3]?.src || ''}
                alt={images[3]?.alt || ''}
                className="absolute top-20 right-10 w-20 h-20 rounded-full object-contain border-2 border-white z-20"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )
        ) : (
          <span className="text-6xl filter drop-shadow-lg">🐄</span>
        )}
      </div>
    </button>
  );
}

HeroBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
  variant: PropTypes.oneOf(['primary', 'secondary']),
};
