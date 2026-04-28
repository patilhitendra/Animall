import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLang } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import useLanguage from '../../hooks/useLanguage';

export default function Header({ title, showBack = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { user } = useSelector((s) => s.auth);

  // If a custom title is given (inner pages), show compact header
  if (title) {
    return (
      <header className="sticky top-0 z-40 bg-teal-700 border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="text-white text-2xl min-w-[44px] min-h-[44px] flex items-center"
              >
                ←
              </button>
            )}
            <h1 className="text-lg font-bold text-white">{title}</h1>
          </div>
          <button
            onClick={() => dispatch(toggleLang())}
            className="border-2 border-white-600 text-white font-bold px-3 py-1 rounded-full text-sm"
          >
            {lang === 'mr' ? 'EN' : 'मर'}
          </button>
        </div>
      </header>
    );
  }

  // Home header — matches reference: logo left, coin counter + avatar right
  return (
    <header className="sticky top-0 z-40 bg-teal-700 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-2xl">🐄</span>
          <div>
            <p className="text-green-700 font-bold text-white leading-tight">Animall.in</p>
            <p className="text-gray-400 text-white leading-tight">गाय भैस वाला ऐप</p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          {/* <button
            onClick={() => dispatch(toggleLang())}
            className="border-2 border-green-600 text-green-700 font-bold px-3 py-1 rounded-full text-sm"
          >
            {lang === 'mr' ? 'मराठी' : 'English'}
          </button> */}

          {/* User avatar - navigate to profile */}
          <button
            onClick={() => navigate('/profile')}
            className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center
                       text-orange-600 font-bold text-base border-2 border-orange-200"
          >
            {user?.name?.[0]?.toUpperCase() || 'HP'}
          </button>
        </div>
      </div>
    </header>
  );
}
