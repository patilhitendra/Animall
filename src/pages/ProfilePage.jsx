import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { toggleLang } from '../store/slices/uiSlice';
import useLanguage from '../hooks/useLanguage';

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { lang } = useLanguage();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-700 text-2xl min-w-[44px] min-h-[44px] flex items-center"
            >
              ←
            </button>
            <h1 className="text-lg font-bold text-gray-800">प्रोफाइल</h1>
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleLang())}
              className="bg-purple-400 text-white font-semibold px-4 py-2 rounded-full text-sm flex items-center gap-1"
            >
              {lang === 'mr' ? 'En | मर' : 'मर | En'}
              <span className="text-xs">▾</span>
            </button>
            <button className="text-gray-700 text-xl">⋮</button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-6 mb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-400 overflow-hidden">
              {user?.profilePhoto ? (
                <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span>👤</span>
              )}
            </div>
            
            {/* User Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Hitendra'}</h2>
              <p className="text-gray-600 text-sm">{user?.location || 'Pune'} | {user?.phone || '7798865981'}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-orange-500 flex items-center gap-1">
                  ⭐ 0 (0)
                </span>
                <span className="text-orange-500 text-sm">75% अपूर्ण</span>
              </div>
            </div>
          </div>
          
          {/* Edit Button */}
          <button 
            onClick={() => navigate('/edit-profile')}
            className="text-green-600 text-sm font-semibold flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg"
          >
            ✏️ बदला
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white p-6 mb-4">
        <p className="text-sm text-gray-600 mb-3">Animall वर 5 वर्ष 2 महिने चा प्रवास</p>
        <div className="grid grid-cols-3 gap-3">
          {/* Listings Posted */}
          <div className="bg-purple-100 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl text-purple-600">🐄</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-600 mt-1">जनावरे टाकली</p>
          </div>
          
          {/* Calls Made */}
          <div className="bg-purple-100 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl text-purple-600">📞</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-600 mt-1">कॉल केले</p>
          </div>
          
          {/* Calls Received */}
          <div className="bg-purple-100 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl text-purple-600">📞</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-600 mt-1">कॉल आले</p>
          </div>
        </div>
      </div>

      {/* Selling Related Section */}
      <div className="bg-white mb-2">
        <div className="px-6 py-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">विक्रीशी संबंधित</h3>
        </div>
        
        <MenuItem icon="💰" title="माझा प्लान" />
        <MenuItem icon="🐄" title="जनावरे" />
        <MenuItem icon="📞" title="कॉल आले" />
      </div>

      {/* Buying Related Section */}
      <div className="bg-white mb-2">
        <div className="px-6 py-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">खरेदीशी संबंधित</h3>
        </div>
        
        <MenuItem icon="📞" title="कॉल केले" />
        <MenuItem icon="🐾" title="आवडलेली जनावरे" />
      </div>

      {/* Other Section */}
      <div className="bg-white mb-2">
        <div className="px-6 py-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">इतर</h3>
        </div>
        
        <MenuItem icon="🪙" title="कॉईन्स" />
        <MenuItem icon="💬" title="जनाव चर्चा पोस्ट" />
      </div>

      {/* Help Section */}
      <div className="bg-white mb-20">
        <div className="px-6 py-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">मदत घ्या</h3>
        </div>
        
        <MenuItem icon="💬" title="आम्हाला संदेश द्या" isWhatsApp />
      </div>
    </div>
  );
}

// Menu Item Component
function MenuItem({ icon, title, isWhatsApp = false }) {
  return (
    <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50 last:border-b-0">
      <div className="flex items-center gap-3">
        <span className={`text-2xl ${isWhatsApp ? '' : 'text-gray-600'}`}>
          {isWhatsApp ? '💬' : icon}
        </span>
        <span className={`font-medium ${isWhatsApp ? 'text-green-600' : 'text-gray-900'}`}>
          {title}
        </span>
      </div>
      <span className="text-gray-400 text-xl">›</span>
    </button>
  );
}
