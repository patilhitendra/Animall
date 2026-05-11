import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Eye, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import { fetchMyListings, deleteAnimal } from '../store/slices/animalsSlice';
import useLanguage from '../hooks/useLanguage';
import { ANIMAL_META } from '../constants/animals';
import { formatPrice } from '../utils/formatters';
import { Card, EmptyState, Button, Chip, ImageWithFallback, IconButton } from '../components/ui';

export default function MyListingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const { myListings, loading } = useSelector((s) => s.animals);
  const { token } = useSelector((s) => s.auth);

  const [tab, setTab] = useState('active');

  useEffect(() => { dispatch(fetchMyListings()); }, [dispatch]);

  const filtered = useMemo(() => {
    if (tab === 'active') return myListings.filter((a) => !a.sold);
    if (tab === 'sold')   return myListings.filter((a) => a.sold);
    return [];
  }, [myListings, tab]);

  const handleDelete = (id) => {
    if (!window.confirm(tr('confirm_delete'))) return;
    dispatch(deleteAnimal({ id, token }));
    toast.success(tr('listing_deleted'));
  };

  return (
    <div className="min-h-screen pb-28">
      <Header title={tr('nav_my_listings')} showBack />

      <main className="px-4 pt-4">
        {/* Tabs + add */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div role="tablist" className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Chip active={tab === 'active'} onClick={() => setTab('active')}>{tr('tab_active')}</Chip>
            <Chip active={tab === 'sold'} onClick={() => setTab('sold')}>{tr('tab_sold')}</Chip>
            <Chip active={tab === 'drafts'} onClick={() => setTab('drafts')}>{tr('tab_drafts')}</Chip>
          </div>
          <Button size="sm" leftIcon={Plus} onClick={() => navigate('/sell')}>
            {tr('add_listing')}
          </Button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="h-24 animate-pulse-soft" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="📋"
            title={tr('my_listings_empty')}
            action={<Button onClick={() => navigate('/sell')}>{tr('my_listings_cta')}</Button>}
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((animal, i) => {
              const meta = ANIMAL_META[animal.type] || ANIMAL_META.other;
              return (
                <motion.div
                  key={animal._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.3) }}
                >
                  <Card className="p-3 flex items-center gap-3">
                    <ImageWithFallback
                      src={animal.images?.[0]}
                      alt={tr(animal.type)}
                      fallback={animal.emoji || meta.emoji}
                      className="w-20 h-20 rounded-xl flex-shrink-0"
                      imgClassName="object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-surface-900 truncate">
                        {meta.emoji} {tr(animal.type)}
                      </p>
                      <p className="text-lg font-extrabold text-primary-700">{formatPrice(animal.price)}</p>
                      <p className="text-xs text-surface-500 truncate">📍 {animal.location}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <IconButton
                        icon={Eye}
                        label={tr('view')}
                        size="sm"
                        variant="filled"
                        onClick={() => navigate(`/buy/${animal._id}`)}
                      />
                      <IconButton
                        icon={Trash2}
                        label={tr('delete')}
                        size="sm"
                        variant="filled"
                        onClick={() => handleDelete(animal._id)}
                        className="!bg-red-50 text-red-500 hover:!bg-red-100"
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
