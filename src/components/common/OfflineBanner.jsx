import useOffline from '../../hooks/useOffline';
import useLanguage from '../../hooks/useLanguage';

export default function OfflineBanner() {
  const isOnline = useOffline();
  const { tr } = useLanguage();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-center py-2 text-sm font-semibold">
      {tr('no_internet')}
    </div>
  );
}
