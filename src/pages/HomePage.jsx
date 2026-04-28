import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals, ANIMAL_META } from '../store/slices/animalsSlice';
import { setActiveCategory } from '../store/slices/uiSlice';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import AnimalCard from '../components/common/AnimalCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import HeroBanner from '../components/common/HeroBanner';
import useLanguage from '../hooks/useLanguage';

// Category strip — animal type chips with emoji
const CATEGORIES = [
  { key: 'all', label: 'सर्व', emoji: '🐾' },
  { key: 'cow', label: 'गाय', emoji: '🐄' },
  { key: 'buffalo', label: 'म्हशी', emoji: '🐃' },
  { key: 'goat', label: 'प्राइम', emoji: '🐐' },
  { key: 'chicken', label: 'वासरा', emoji: '🐓' },
  { key: 'sheep', label: 'मेंढी', emoji: '🐑' },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const { list: animals, loading } = useSelector((s) => s.animals);
  const { activeCategory } = useSelector((s) => s.ui);
  const { user } = useSelector((s) => s.auth);

  // useEffect(() => { dispatch(fetchAnimals()); }, [dispatch]);

  const filtered = activeCategory === 'all'
    ? animals
    : animals.filter((a) => a.type === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header />

      {/* Location bar — matching reference */}
      <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span>📍</span>
          <span className="font-semibold">{user?.location || 'Pune, Maharashtra, 411001'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>आपल्या जवळील गुरे</span>
          <div className="w-10 h-5 bg-gray-200 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full shadow absolute right-0 border border-gray-300" />
          </div>
        </div>
      </div>

      {/* === Hero buy/sell blocks with real images === */}
      <div className="px-4 pt-4 space-y-3">
        <HeroBanner
          title="जनावर खरेदी करा"
          subtitle="परिसरात्या जनावरबर कॉल करा आणि जनावर घरी मागा"
          ctaText="200+ नवीन जनावर नोंदवले गेले आहेत"
          onClick={() => navigate('/buy')}
          images={[
            { src: '/images/banners/cattleGrp.png', alt: 'पांढरी गाय' },
            { src: '/images/banners/singleCattle.png', alt: 'तपकिरी गाय' }
          ]}
          variant="primary"
        />

        <HeroBanner
          title="जनावर विक्री करा"
          subtitle="आपला विकाऊ जनावर नोंदवा आणि चांगले सौदे करा"
          ctaText="200+ विक्रेते ऑनलाईन आहेत"
          onClick={() => navigate('/sell')}
          images={[
            { src: '/images/banners/person1.png', alt: 'विक्रेता' },
            { src: '/images/banners/person2.png', alt: 'विक्रेता' },
            { src: '/images/banners/person3.png', alt: 'विक्रेता' },
            { src: '/images/banners/singleCattle.png', alt: 'गाय' }
          ]}
          variant="secondary"
        />
      </div>

      {/* Tagline strip */}
      <div className="mx-4 mt-3 bg-green-600 rounded-xl px-4 py-2 text-center">
        <p className="text-white text-xs font-semibold">
          प्रत्येक प्रक्रिया सोप्या पद्धतीने समजून घ्या!
        </p>
      </div>



      <div>
        <div className="mx-4 pb-2 sm:max-w-md sm:mx-auto">

          {/* Fixed: Added flex-nowrap and justify-start */}
          <div className="w-full pb-4 flex gap-3 justify-start overflow-x-auto flex-nowrap scrollbar-hide">

            {/* Item 1 */}
            <div className="flex-none flex flex-col bg-white gap-2 items-center w-28 p-2 rounded-md shadow-md cursor-pointer">
              <div className="relative w-24 h-[70px] overflow-hidden rounded">
                <img
                  alt="howToBuyPashu"
                  src="https://static-assets.animall.in/static/images/Home_page/pashu_kharide_video_thumb.png"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-xs text-gray-800 text-center leading-tight">
                Animall वरून जनावर कसे खरेदी करायचे?
              </p>
            </div>

            {/* Repeat for other items... */}
            <div className="flex-none flex flex-col bg-white gap-2 items-center w-28 p-2 rounded-md shadow-md cursor-pointer">
              <div className="relative w-24 h-[70px] overflow-hidden rounded">
                <img
                  alt="howToSellPashu"
                  src="https://static-assets.animall.in/static/images/Home_page/pashu_bechein_video_thumb.png"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-xs text-gray-800 text-center leading-tight">
                जनावर विकण्याचा योग्य मार्ग जाणून घ्या
              </p>
            </div>

            <div className="flex-none flex flex-col bg-white gap-2 items-center w-28 p-2 rounded-md shadow-md cursor-pointer">
              <div className="relative w-24 h-[70px] overflow-hidden rounded">
                <img
                  alt="howToSellPashuQuick"
                  src="https://static-assets.animall.in/static/images/Home_page/make_pashu_prime_video_thumb.png"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-xs text-gray-800 text-center leading-tight">
                1 दिवसात जनावर कसे विकायचे?
              </p>
            </div>

          </div>
        </div>
      </div>


      {/* === Category strip === */}
      {/* <div className="mt-4 px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => dispatch(setActiveCategory(key))}
              className={`flex flex-col items-center flex-shrink-0 rounded-xl px-4 py-3 border-2
                          transition-all active:scale-95 min-w-[72px]
                          ${activeCategory === key
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700'
                          }`}
            >
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-semibold mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div> */}

      {/* === Listings === */}
      {/* <div className="px-4 mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-800">{tr('recent_listings')}</p>
          <button onClick={() => navigate('/buy')} className="text-green-600 text-sm font-semibold">
            {tr('see_all')} →
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-5xl mb-3">🐾</p>
            <p>{tr('no_listings')}</p>
          </div>
        ) : (
          filtered.slice(0, 5).map((animal) => (
            <AnimalCard key={animal._id} animal={animal} />
          ))
        )}
      </div> */}

      {/* Voice search placeholder */}
      {/* <div className="px-4 mt-4 mb-2">
        <button
          className="w-full border-2 border-dashed border-green-300 rounded-2xl py-3
                     text-green-600 flex items-center justify-center gap-2 text-sm font-semibold
                     bg-green-50 active:bg-green-100 transition-colors"
          onClick={() => alert('🎤 आवाज शोध लवकरच येत आहे!')}
        >
          🎤 {tr('voice_search')}
        </button>
      </div> */}

      <BottomNav />
    </div>
  );
}
