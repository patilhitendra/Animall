import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Play } from 'lucide-react';

import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import AnimalCard from '../components/common/AnimalCard';
import AnimalCardSkeleton from '../components/animal/AnimalCardSkeleton';
import HeroBanner from '../components/common/HeroBanner';
import { fetchAnimals } from '../store/slices/animalsSlice';
import useLanguage from '../hooks/useLanguage';
import { HOME_BANNERS } from '../constants/banners';
import { HOME_VIDEOS } from '../constants/videos';

const greetingKey = () => {
  const h = new Date().getHours();
  if (h < 12) return 'greeting_morning';
  if (h < 17) return 'greeting_afternoon';
  return 'greeting_evening';
};

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const { list: animals, loading } = useSelector((s) => s.animals);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => { dispatch(fetchAnimals()); }, [dispatch]);

  const greeting = useMemo(() => tr(greetingKey()), [tr]);
  const recent = useMemo(
    () => [...animals].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4),
    [animals]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-surface-50 to-accent-50/40 pb-28">
      <Header />

      {/* Greeting + location */}
      <section className="px-4 pt-4 pb-3">
        <p className="text-xs text-surface-500">{greeting}{user?.name ? `, ${user.name}` : ''} 👋</p>
        <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-surface-700 font-semibold">
          <MapPin size={14} className="text-primary-600" />
          {user?.location || 'Pune, Maharashtra'}
        </div>
      </section>

      {/* Hero banners */}
      <div className="px-4 space-y-3">
        {HOME_BANNERS.map((b, i) => (
          <motion.div
            key={b.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <HeroBanner
              title={tr(b.titleKey)}
              subtitle={tr(b.subtitleKey)}
              ctaText={tr(b.ctaKey)}
              onClick={() => navigate(b.to)}
              variant={b.variant}
              images={b.images.map((img) => ({ src: img.src, alt: tr(img.altKey) }))}
            />
          </motion.div>
        ))}
      </div>

      {/* Tutorial carousel */}
      <section className="mt-6 px-4">
        <h2 className="text-sm font-bold text-surface-900 mb-2">{tr('home_tutorials_title')}</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {HOME_VIDEOS.map((v, i) => (
            <motion.button
              key={v.key}
              type="button"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0 w-40 bg-surface-0 rounded-2xl border border-surface-200 shadow-sm overflow-hidden text-left"
              aria-label={tr(v.titleKey)}
            >
              <div className="relative aspect-video bg-surface-100">
                <img src={v.thumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                    <Play size={16} className="ml-0.5 text-primary-600 fill-primary-600" />
                  </span>
                </span>
              </div>
              <p className="px-2.5 py-2 text-xs font-semibold text-surface-700 leading-snug line-clamp-2">
                {tr(v.titleKey)}
              </p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Recent listings preview */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-surface-900">{tr('recent_listings')}</h2>
          <button
            type="button"
            onClick={() => navigate('/buy')}
            className="text-xs font-bold text-primary-700 inline-flex items-center gap-0.5"
          >
            {tr('see_all')} <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => <AnimalCardSkeleton key={i} />)
            : recent.map((animal) => <AnimalCard key={animal._id} animal={animal} />)
          }
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
