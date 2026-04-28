import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMyListings, deleteAnimal, ANIMAL_META } from '../store/slices/animalsSlice';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useLanguage from '../hooks/useLanguage';
import toast from 'react-hot-toast';

export default function MyListingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const { myListings, loading } = useSelector((s) => s.animals);
  const { token } = useSelector((s) => s.auth);

  useEffect(() => { dispatch(fetchMyListings()); }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm(tr('confirm_delete'))) return;
    dispatch(deleteAnimal({ id, token }));
    toast.success(tr('listing_deleted'));
  };

  const formatPrice = (n) => '₹' + Number(n).toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-green-50 pb-24">
      <Header title={tr('my_listings')} showBack />

      <main className="px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">{myListings.length} जाहिराती</p>
          <button
            onClick={() => navigate('/sell')}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold
                       shadow-button active:scale-95 transition-transform"
          >
            {tr('add_listing')}
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : myListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-6xl mb-4">🐾</p>
            <p className="text-lg mb-6">{tr('no_listings')}</p>
            <button
              onClick={() => navigate('/sell')}
              className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold shadow-button"
            >
              {tr('sell_animal')}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {myListings.map((animal) => {
              const meta = ANIMAL_META[animal.type] || ANIMAL_META.other;
              return (
                <div
                  key={animal._id}
                  className={`${meta.bg} border-2 ${meta.border} rounded-2xl p-4 flex items-center gap-4`}
                >
                  {/* Emoji */}
                  <div className="text-5xl flex-shrink-0">
                    {animal.images?.[0]
                      ? <img src={animal.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      : animal.emoji || meta.emoji
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800">{meta.emoji} {tr(animal.type)}</p>
                    <p className="text-xl font-extrabold text-green-700">{formatPrice(animal.price)}</p>
                    <p className="text-xs text-gray-500 truncate">📍 {animal.location}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => navigate(`/buy/${animal._id}`)}
                      className="bg-blue-500 text-white px-3 py-2 rounded-xl text-xs font-bold
                                 active:scale-95 transition-transform"
                    >
                      पाहा
                    </button>
                    <button
                      onClick={() => handleDelete(animal._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-xl text-xs font-bold
                                 active:scale-95 transition-transform"
                    >
                      {tr('delete')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
