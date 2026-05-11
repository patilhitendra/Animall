import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Share2, MapPin, Clock, Phone } from 'lucide-react';

import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import useLanguage from '../hooks/useLanguage';

import { ANIMAL_META, breedI18nKey, calvingI18nKey } from '../constants/animals';
import { formatPrice, timeAgo, formatAge, formatPhoneDisplay } from '../utils/formatters';
import { callPhone, openWhatsApp } from '../utils/contact';
import { shareOrCopy } from '../utils/share';
import { isWishlisted, toggleWishlist, subscribeWishlist } from '../utils/wishlist';

import {
  Card, Badge, Avatar, ImageWithFallback, IconButton, EmptyState, Button,
} from '../components/ui';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tr } = useLanguage();

  const animal = useSelector((s) => s.animals.list.find((a) => a._id === id));
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(() => animal && isWishlisted(animal._id));

  useEffect(() => {
    if (!animal) return;
    return subscribeWishlist((list) => setLiked(list.includes(animal._id)));
  }, [animal]);

  if (!animal) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title={tr('detail_not_found')} showBack />
        <EmptyState
          icon="🐾"
          title={tr('detail_not_found')}
          action={
            <Button onClick={() => navigate('/buy')}>{tr('nav_buy')}</Button>
          }
        />
      </div>
    );
  }

  const meta = ANIMAL_META[animal.type] || ANIMAL_META.other;
  const images = (animal.images && animal.images.length ? animal.images : [null]);

  const titleParts = [
    animal.breed && tr(breedI18nKey(animal.type, animal.breed)),
    animal.calving && animal.calving !== 'none' && `${tr(calvingI18nKey(animal.calving))} ${tr('calving')}`,
  ].filter(Boolean);
  const titleText = titleParts.length ? titleParts.join(' · ') : `${meta.emoji} ${tr(animal.type)}`;

  const handleCall = () => callPhone(animal.sellerPhone, { tr });
  const handleWhatsApp = () => {
    const msg = tr('whatsapp_prefill', {
      type: tr(animal.type),
      price: formatPrice(animal.price),
    });
    openWhatsApp(animal.sellerPhone, msg);
  };
  const handleShare = () => shareOrCopy({
    title: titleText,
    text: `${tr(animal.type)} — ${formatPrice(animal.price)}`,
    url: window.location.href,
    tr,
  });
  const handleLike = () => setLiked(toggleWishlist(animal._id));

  return (
    <div className="min-h-screen pb-40">
      <Header title={tr(animal.type)} showBack />

      {/* Image gallery */}
      <div className={`${meta.bg} relative`}>
        <ImageWithFallback
          src={images[activeImg]}
          alt={`${tr(animal.type)} — ${animal.breed || ''}`}
          fallback={animal.emoji || meta.emoji}
          className="w-full aspect-[4/3]"
          imgClassName="object-contain"
          loading="eager"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <IconButton icon={Share2} label={tr('share')} onClick={handleShare} />
          <IconButton
            icon={Heart}
            label={tr('detail_wishlist')}
            onClick={handleLike}
            className={liked ? '!bg-red-50 text-red-500 border-red-200' : ''}
          />
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(i)}
                aria-label={`Image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImg === i ? 'bg-primary-600 w-6' : 'bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-3 -mt-4"
      >
        <Card className="p-4 space-y-4">
          <div>
            <p className="text-2xl font-extrabold text-primary-700">{formatPrice(animal.price)}</p>
            <p className="text-sm font-bold text-surface-900 mt-0.5">{titleText}</p>
            <p className="text-xs text-surface-500 mt-1 flex items-center gap-1">
              <MapPin size={12} /> {animal.location || '—'}
              <span className="mx-1">·</span>
              <Clock size={12} /> {timeAgo(animal.createdAt, tr)}
            </p>
          </div>

          {/* Info chips */}
          <div className="flex flex-wrap gap-2">
            <Badge tone="teal">{meta.emoji} {tr(animal.type)}</Badge>
            {animal.age && (
              <Badge tone="amber">⏱ {formatAge(animal.age, animal.ageUnit, tr)}</Badge>
            )}
            {animal.milkPerDay && (
              <Badge tone="blue">🥛 {animal.milkPerDay} {tr('litre')}/{tr('day')}</Badge>
            )}
            {animal.calving && animal.calving !== 'none' && (
              <Badge tone="purple">{tr(calvingI18nKey(animal.calving))} {tr('calving')}</Badge>
            )}
          </div>

          {/* Description */}
          {animal.description && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-surface-400 mb-1">
                {tr('detail_description')}
              </p>
              <p className="text-sm text-surface-700 leading-relaxed">{animal.description}</p>
            </div>
          )}

          {/* Seller card */}
          <div className="bg-surface-50 rounded-2xl p-3 flex items-center gap-3 border border-surface-200">
            <Avatar name={animal.sellerName} size="md" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-surface-500">{tr('detail_seller_card')}</p>
              <p className="font-bold text-surface-900 text-sm truncate">{animal.sellerName || tr('seller')}</p>
              <p className="text-xs text-surface-500 truncate">{formatPhoneDisplay(animal.sellerPhone)}</p>
            </div>
          </div>

          {/* Fair-price hint */}
          <div className="bg-primary-50 border border-primary-200 rounded-2xl px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-bold text-primary-700">{tr('detail_fair_price')}</p>
            <span className="text-primary-600 text-xs font-semibold">›</span>
          </div>
        </Card>
      </motion.div>

      {/* Sticky bottom action bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-surface-0 border-t border-surface-200 px-3 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex gap-3">
        <button
          onClick={handleCall}
          aria-label={tr('call')}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 text-base font-bold shadow-lg shadow-blue-500/30 active:scale-[0.97] transition-transform"
        >
          <Phone size={20} /> {tr('call')}
        </button>
        <button
          onClick={handleWhatsApp}
          aria-label={tr('whatsapp')}
          className="flex-1 bg-[#25D366] text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 text-base font-bold shadow-lg shadow-primary-500/30 active:scale-[0.97] transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
