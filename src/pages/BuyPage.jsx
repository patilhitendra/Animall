import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals, ANIMAL_META } from '../store/slices/animalsSlice';
import { setActiveCategory, setPriceRange, clearFilters } from '../store/slices/uiSlice';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import AnimalCard from '../components/common/AnimalCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useLanguage from '../hooks/useLanguage';

const CATEGORIES = [
  { key: 'all',     label: 'सर्व',   emoji: '🐾' },
  { key: 'cow',     label: 'गाय',    emoji: '🐄' },
  { key: 'buffalo', label: 'म्हशी',  emoji: '🐃' },
  { key: 'goat',    label: 'बकरी',   emoji: '🐐' },
  { key: 'chicken', label: 'कोंबडी', emoji: '🐓' },
  { key: 'sheep',   label: 'मेंढी',  emoji: '🐑' },
  { key: 'pig',     label: 'डुक्कर', emoji: '🐷' },
];

export default function BuyPage() {
  const dispatch = useDispatch();
  const { tr } = useLanguage();
  const { list: animals, loading } = useSelector((s) => s.animals);
  const { activeCategory, priceRange } = useSelector((s) => s.ui);
  const [showFilter, setShowFilter] = useState(false);

  // useEffect(() => { dispatch(fetchAnimals()); }, [dispatch]);

  const filtered = animals.filter((a) => {
    const typeOk = activeCategory === 'all' || a.type === activeCategory;
    const priceOk = a.price >= priceRange[0] && a.price <= priceRange[1];
    return typeOk && priceOk;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="जनावर खरेदी करा" showBack />

      {/* Sticky category + filter strip */}
      <div className="sticky top-[57px] z-30 bg-white shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => dispatch(setActiveCategory(key))}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm
                          font-semibold whitespace-nowrap flex-shrink-0 transition-all active:scale-95
                          ${activeCategory === key
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'bg-white border-gray-200 text-gray-600'
                          }`}
            >
              {emoji} {label}
            </button>
          ))}
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-full border-2
                       border-blue-300 bg-blue-50 text-blue-600 text-sm font-semibold flex-shrink-0"
          >
            🔧 {tr('filters')}
          </button>
        </div>
      </div>

      {/* Listings */}
      <main className="px-4 pt-3 space-y-3">
        {loading ? (
          <LoadingSpinner />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-3">🐾</p>
            <p className="text-lg">{tr('no_listings')}</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400">{filtered.length} जाहिराती</p>
            {filtered.map((animal) => (
              <AnimalCard key={animal._id} animal={animal} />
            ))}
          </>
        )}
      </main>

      {/* Filter bottom sheet */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilter(false)} />
          <div className="relative bg-white rounded-t-3xl p-6 shadow-2xl">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-bold text-center mb-5">{tr('filters')}</h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-3">
                💰 {tr('price_range')}: ₹0 – ₹{priceRange[1].toLocaleString('en-IN')}
              </label>
              <input
                type="range" min={0} max={200000} step={5000}
                value={priceRange[1]}
                onChange={(e) => dispatch(setPriceRange([0, Number(e.target.value)]))}
                className="w-full accent-green-600 h-2"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹0</span><span>₹2,00,000+</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { dispatch(clearFilters()); setShowFilter(false); }}
                className="flex-1 py-3 border-2 border-gray-300 rounded-2xl font-semibold text-gray-600"
              >
                {tr('clear_filters')}
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="flex-1 py-3 bg-green-600 text-white rounded-2xl font-semibold shadow-button"
              >
                {tr('apply_filters')}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
