import { useNavigate } from 'react-router-dom';
import { ANIMAL_META } from '../../store/slices/animalsSlice';
import useLanguage from '../../hooks/useLanguage';

/**
 * Full-width listing card — styled to match reference app.
 * Shows: title/price at top, image area, Call + WhatsApp buttons, seller name.
 */
export default function AnimalCard({ animal }) {
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const meta = ANIMAL_META[animal.type] || ANIMAL_META.other;

  const formatPrice = (n) => '₹' + Number(n).toLocaleString('en-IN');

  const formatAge = (age, unit) =>
    unit === 'months' ? `${age} ${tr('months')}` : `${age} ${tr('years')}`;

  const timeAgo = (iso) => {
    const h = Math.floor((Date.now() - new Date(iso)) / 3600000);
    if (h < 1) return 'आत्ता';
    if (h < 24) return `${h} तासापूर्वी`;
    return `${Math.floor(h / 24)} दिवसांपूर्वी`;
  };

  // Build a realistic title like the reference app
  const title = [
    animal.breed ? animal.breed : '',
    animal.calving ? animal.calving + ' Calving' : '',
    animal.milkPerDay ? `${animal.milkPerDay}L दुधाची क्षमता` : '',
    formatPrice(animal.price),
  ].filter(Boolean).join(' | ');

  const handleCall = (e) => {
    e.stopPropagation();
    window.location.href = `tel:+91${animal.sellerPhone}`;
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `नमस्कार! मला तुमच्या ${tr(animal.type)} बद्दल जाणून घ्यायचे आहे (${formatPrice(animal.price)}). Animall वरून.`
    );
    window.open(`https://wa.me/91${animal.sellerPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100">
      {/* Title row */}
      <div
        className="px-4 pt-3 pb-2 cursor-pointer"
        onClick={() => navigate(`/buy/${animal._id}`)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800 leading-snug line-clamp-2">
              {title || `${meta.emoji} ${tr(animal.type)}`}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
              <span>🕐 {timeAgo(animal.createdAt)}</span>
              <span>📍 {animal.location}</span>
            </div>
          </div>
          {/* Wishlist */}
          <button onClick={(e) => e.stopPropagation()} className="text-gray-300 text-xl mt-0.5">☆</button>
        </div>
      </div>

      {/* Image area */}
      <div
        className={`relative flex items-center justify-center bg-gray-50 cursor-pointer`}
        style={{ minHeight: '160px' }}
        onClick={() => navigate(`/buy/${animal._id}`)}
      >
        {animal.images?.[0] ? (
          <img
            src={animal.images[0]}
            alt={tr(animal.type)}
            className="w-full object-contain object-center"
            style={{ maxHeight: '200px' }}
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-300">
            <span className="text-7xl">{animal.emoji || meta.emoji}</span>
            <p className="text-xs mt-2">पशु मालकाने फोटो अपलोड केलेला नाही</p>
            <button className="text-green-600 text-xs font-bold mt-1">फोटो मागा ›</button>
          </div>
        )}
        {/* Share badge */}
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold
                     px-3 py-1 rounded-full flex items-center gap-1"
        >
          ↗ वाटा
        </button>
      </div>

      {/* Price + rate info */}
      <div className="px-4 py-2 border-t border-gray-100 cursor-pointer" onClick={() => navigate(`/buy/${animal._id}`)}>
        <div className="flex items-center justify-between">
          <p className="text-lg font-extrabold text-gray-900">{formatPrice(animal.price)}</p>
          <p className="text-xs text-green-600 font-semibold">या पशूचा योग्य दर जाणून घ्या</p>
        </div>
      </div>

      {/* Seller + CTA buttons */}
      <div className="px-4 pb-3 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(`/buy/${animal._id}`)}
          className="flex items-center gap-2 text-sm font-bold text-gray-700"
        >
          <span className="text-2xl">👨‍🌾</span>
          <span className="text-green-700">पशुपालक {animal.sellerName || 'जी'} &gt;</span>
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleCall}
            className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2.5
                       rounded-full text-sm font-bold shadow-sm active:scale-95 transition-transform"
          >
            📞 कॉल
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center bg-[#25D366] text-white
                       w-10 h-10 rounded-full shadow-sm active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
