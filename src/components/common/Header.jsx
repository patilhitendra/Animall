import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import IconButton from '../ui/IconButton';
import Avatar from '../ui/Avatar';

// Compact header for inner pages (with title + back).
function InnerHeader({ title, showBack, onBack }) {
  const navigate = useNavigate();
  const back = onBack || (() => navigate(-1));

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-brand-700 to-brand-600 shadow-sm">
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-1 min-w-0">
          {showBack && (
            <IconButton
              icon={ArrowLeft}
              label="Back"
              variant="ghost"
              onClick={back}
              className="text-white hover:bg-white/15"
            />
          )}
          <h1 className="text-base font-bold text-white truncate">{title}</h1>
        </div>
        <LanguageSwitcher variant="solid" />
      </div>
    </header>
  );
}

InnerHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool,
  onBack: PropTypes.func,
};

// Default home header with logo and avatar.
function HomeHeader() {
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const { user } = useSelector((s) => s.auth);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 group"
          aria-label={tr('app_name')}
        >
          <span className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-inner border border-white/20 transition-transform group-hover:scale-105">
            🐄
          </span>
          <div className="text-left leading-tight">
            <p className="text-white font-extrabold text-base tracking-tight">Animall</p>
            <p className="text-white/80 text-[10px]">{tr('app_tagline')}</p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="solid" />
          <button
            type="button"
            onClick={() => navigate('/profile')}
            aria-label={tr('nav_profile')}
            className="focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 rounded-full"
          >
            <Avatar name={user?.name} size="sm" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default function Header({ title, showBack = false, onBack }) {
  if (title) return <InnerHeader title={title} showBack={showBack} onBack={onBack} />;
  return <HomeHeader />;
}

Header.propTypes = {
  title: PropTypes.string,
  showBack: PropTypes.bool,
  onBack: PropTypes.func,
};
