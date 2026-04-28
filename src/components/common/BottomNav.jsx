import { NavLink, useNavigate } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';

// Matches reference: खरेदी | विक्री करा | Animall (center) | आखाडा | अलर्ट
const NAV_ITEMS = [
  { to: '/buy',         icon: '🛒', label: 'खरेदी' },
  { to: '/sell',        icon: '➕', label: 'विक्री करा' },
  { to: '/',            icon: '🐄', label: 'Animall', center: true },
  { to: '/my-listings', icon: '📋', label: 'आखाडा' },
  { to: '/alerts',      icon: '🔔', label: 'अलर्ट', disabled: true },
];

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200
                    shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-end justify-around pb-safe">
        {NAV_ITEMS.map(({ to, icon, label, center, disabled }) => {
          if (disabled) {
            return (
              <div key={label} className="flex flex-col items-center py-2 px-2 text-gray-300 flex-1">
                <span className="text-2xl">{icon}</span>
                <span className="text-[10px] mt-0.5 font-medium">{label}</span>
              </div>
            );
          }

          if (center) {
            return (
              <NavLink key={label} to={to} end
                className={({ isActive }) =>
                  `flex flex-col items-center -mt-4 flex-1 ${isActive ? 'text-green-600' : 'text-gray-500'}`
                }
              >
                <div className="bg-green-600 rounded-full w-14 h-14 flex items-center justify-center
                                shadow-button border-4 border-white">
                  <span className="text-3xl">{icon}</span>
                </div>
                <span className="text-[10px] mt-1 font-bold text-green-700">{label}</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-2 flex-1 transition-colors min-h-[56px] justify-center
                 ${isActive ? 'text-green-600' : 'text-gray-500'}`
              }
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-[10px] mt-0.5 font-medium">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
