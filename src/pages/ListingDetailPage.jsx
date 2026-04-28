import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ANIMAL_META } from '../store/slices/animalsSlice';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import useLanguage from '../hooks/useLanguage';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const animal = useSelector((s) => s.animals.list.find((a) => a._id === id));

  if (!animal) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-6xl">🐾</p>
        <p className="text-gray-500">{tr('no_listings')}</p>
        <button onClick={() => navigate('/buy')} className="text-green-600 font-bold">
          ← परत जा
        </button>
      </div>
    );
  }

  const meta = ANIMAL_META[animal.type] || ANIMAL_META.other;
  const formatPrice = (n) => '₹' + Number(n).toLocaleString('en-IN');
  const ageText = `${animal.age} ${animal.ageUnit === 'months' ? tr('months') : tr('years')}`;

  // Build detail title from enriched data
  const infoChips = [
    animal.breed,
    animal.calving ? animal.calving + ' Calving' : null,
    animal.milkPerDay ? `${animal.milkPerDay}L/दिवस दूध` : null,
  ].filter(Boolean);

  const handleCall = () => window.location.href = `tel:+91${animal.sellerPhone}`;
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `नमस्कार! मला तुमच्या ${tr(animal.type)} बद्दल जाणून घ्यायचे आहे (${formatPrice(animal.price)}). Animall वरून संपर्क करत आहे.`
    );
    window.open(`https://wa.me/91${animal.sellerPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-36">
      <Header title={tr(animal.type)} showBack />

      {/* Image / Emoji hero */}
      <div className={`${meta.bg} flex items-center justify-center relative`} style={{ minHeight: '240px' }}>
        {animal.images?.[0] ? (
          <img src={animal.images[0]} alt={tr(animal.type)} className="w-full object-none max-h-72" />
        ) : (
          <span className="text-[100px] select-none py-8">{animal.emoji || meta.emoji}</span>
        )}
        {/* Share */}
        <button className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold
                           px-3 py-1.5 rounded-full">
          ↗ वाटा
        </button>
        {/* Wishlist */}
        <button className="absolute top-3 right-20 text-2xl text-gray-300">☆</button>
      </div>

      {/* Detail card */}
      <div className="bg-white mx-3 -mt-4 rounded-2xl shadow-card p-4 space-y-4">
        {/* Title row */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-gray-800 text-base leading-snug">
                {infoChips.length > 0
                  ? infoChips.join(' | ') + ' | ' + formatPrice(animal.price)
                  : `${meta.emoji} ${tr(animal.type)}`
                }
              </p>
              <p className="text-xs text-gray-400 mt-1">📍 {animal.location}</p>
            </div>
          </div>
        </div>

        {/* Info chips */}
        <div className="flex flex-wrap gap-2">
          <span className={`${meta.bg} ${meta.border} border text-gray-700 text-xs font-bold px-3 py-1 rounded-full`}>
            {meta.emoji} {tr(animal.type)}
          </span>
          <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
            🕐 {ageText}
          </span>
          {animal.milkPerDay && (
            <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
              🥛 {animal.milkPerDay} L/दिवस
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3 border border-green-100">
          <div>
            <p className="text-xs text-gray-500">भाव</p>
            <p className="text-2xl font-extrabold text-green-700">{formatPrice(animal.price)}</p>
          </div>
          <button className="text-xs text-green-600 font-semibold border border-green-300 rounded-full px-3 py-1.5">
            योग्य दर जाणून घ्या
          </button>
        </div>

        {/* Description */}
        {animal.description && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-sm text-gray-600">{animal.description}</p>
          </div>
        )}

        {/* Seller row */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 border border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-4xl">👨‍🌾</span>
            <div>
              <p className="font-bold text-green-700 text-sm">
                पशुपालक {animal.sellerName || 'जी'} &gt;
              </p>
              <p className="text-xs text-gray-400">+91 {animal.sellerPhone}</p>
            </div>
          </div>
          {/* Sleeping indicator - matching reference */}
          <div className="flex items-center gap-1 text-gray-300 text-xs">
            <span>💤</span>
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3
                      shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex gap-3">
        <button
          onClick={handleCall}
          className="flex-1 bg-blue-600 text-white py-4 rounded-2xl flex items-center
                     justify-center gap-2 text-lg font-bold active:scale-95 transition-transform"
        >
          📞 कॉल
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl flex items-center
                     justify-center gap-2 text-lg font-bold active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
