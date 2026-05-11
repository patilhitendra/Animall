import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';

import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import AnimalCard from '../components/common/AnimalCard';
import AnimalCardSkeleton from '../components/animal/AnimalCardSkeleton';
import CategoryChips from '../components/animal/CategoryChips';
import AnimalFilters from '../components/animal/AnimalFilters';

import { EmptyState, Select, IconButton } from '../components/ui';
import useLanguage from '../hooks/useLanguage';
import {
  setActiveCategory, setPriceRange, setSortBy, setSearchQuery, clearFilters,
} from '../store/slices/uiSlice';
import { BREEDS, breedI18nKey } from '../constants/animals';

export default function BuyPage() {
  const dispatch = useDispatch();
  const { tr } = useLanguage();
  const { list: animals, loading } = useSelector((s) => s.animals);
  const { activeCategory, priceRange, sortBy, searchQuery } = useSelector((s) => s.ui);

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeBreed, setActiveBreed] = useState('');

  // Reset breed filter when category changes.
  useEffect(() => { setActiveBreed(''); }, [activeCategory]);

  const sortOptions = useMemo(() => ([
    { value: 'newest',     label: tr('sort_newest') },
    { value: 'price_asc',  label: tr('sort_price_asc') },
    { value: 'price_desc', label: tr('sort_price_desc') },
  ]), [tr]);

  const breedOptions = useMemo(() => {
    if (activeCategory === 'all') return [];
    const list = BREEDS[activeCategory] || [];
    return list.map((b) => ({ value: b, label: tr(breedI18nKey(activeCategory, b)) }));
  }, [activeCategory, tr]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let arr = animals.filter((a) => {
      if (activeCategory !== 'all' && a.type !== activeCategory) return false;
      if (activeBreed && a.breed !== activeBreed) return false;
      if (a.price < priceRange[0] || a.price > priceRange[1]) return false;
      if (q) {
        const hay = `${a.breed || ''} ${a.location || ''} ${a.sellerName || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price_asc') arr = [...arr].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') arr = [...arr].sort((a, b) => b.price - a.price);
    else arr = [...arr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return arr;
  }, [animals, activeCategory, activeBreed, priceRange, searchQuery, sortBy]);

  const filtersDirty =
    activeCategory !== 'all' ||
    activeBreed ||
    priceRange[1] < 200000 ||
    searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen pb-28">
      <Header title={tr('buy_title')} showBack />

      {/* Search + sort */}
      <div className="bg-surface-0 sticky top-[57px] z-30 shadow-sm">
        <div className="px-3 pt-3 pb-2 flex items-center gap-2">
          <div className="flex-1 flex items-center bg-surface-100 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-primary-300">
            <Search size={18} className="text-surface-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder={tr('search_placeholder')}
              className="flex-1 bg-transparent px-2 py-1 text-sm outline-none"
              aria-label={tr('search')}
            />
            {searchQuery && (
              <IconButton
                icon={X}
                label={tr('clear')}
                size="sm"
                variant="ghost"
                onClick={() => dispatch(setSearchQuery(''))}
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            aria-label={tr('filter')}
            className="relative inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-surface-0 border-2 border-surface-200 text-surface-700 hover:border-primary-400 hover:text-primary-700 transition-colors"
          >
            <SlidersHorizontal size={18} />
            {filtersDirty && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
            )}
          </button>
        </div>

        <div className="px-3 pb-3">
          <CategoryChips
            active={activeCategory}
            onChange={(k) => dispatch(setActiveCategory(k))}
          />
        </div>
      </div>

      {/* Result count + sort */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between gap-3">
        <p className="text-xs text-surface-500">
          {loading ? tr('loading') : tr('buy_results', { n: filtered.length })}
        </p>
        <Select
          value={sortBy}
          options={sortOptions}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="!w-44"
          aria-label={tr('buy_sort_label')}
        />
      </div>

      <main className="px-4 pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <AnimalCardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon="🐾"
              title={tr('no_listings')}
              subtitle={tr('clear')}
              action={
                filtersDirty ? (
                  <button
                    type="button"
                    onClick={() => dispatch(clearFilters())}
                    className="px-5 py-2.5 bg-primary-600 text-white rounded-2xl font-bold"
                  >
                    {tr('clear')}
                  </button>
                ) : null
              }
            />
          </div>
        ) : (
          filtered.map((animal, i) => (
            <motion.div
              key={animal._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
            >
              <AnimalCard animal={animal} />
            </motion.div>
          ))
        )}
      </main>

      <AnimalFilters
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={() => setFilterOpen(false)}
        onClear={() => {
          dispatch(clearFilters());
          setActiveBreed('');
          setFilterOpen(false);
        }}
        priceRange={priceRange}
        setPriceRange={(range) => dispatch(setPriceRange(range))}
        breedOptions={breedOptions}
        activeBreed={activeBreed}
        setActiveBreed={setActiveBreed}
      />

      <BottomNav />
    </div>
  );
}
