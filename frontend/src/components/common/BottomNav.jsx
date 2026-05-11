import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import useLanguage from '../../hooks/useLanguage';
import { BOTTOM_NAV_ITEMS } from '../../constants/nav';

// 5-tab bottom navigation with a glassy surface and a floating center button.
export default function BottomNav() {
  const { tr } = useLanguage();

  return (
    <nav
      role="navigation"
      aria-label={tr('nav_home')}
      className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-surface-200 shadow-glass safe-bottom"
    >
      <ul className="flex items-end justify-around px-1 pt-1 pb-1">
        {BOTTOM_NAV_ITEMS.map(({ key, to, icon: Icon, labelKey, center, disabled }) => {
          if (disabled) {
            return (
              <li key={key} className="flex-1">
                <div
                  aria-disabled="true"
                  className="flex flex-col items-center py-2 px-1 text-surface-300"
                >
                  <Icon size={22} />
                  <span className="text-[10px] mt-0.5 font-semibold">{tr(labelKey)}</span>
                </div>
              </li>
            );
          }

          if (center) {
            return (
              <li key={key} className="flex-1 flex justify-center">
                <NavLink
                  to={to}
                  end
                  aria-label={tr(labelKey)}
                  className={({ isActive }) =>
                    `relative flex flex-col items-center -mt-5 ${isActive ? 'text-primary-700' : 'text-surface-500'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.div
                        whileTap={{ scale: 0.92 }}
                        animate={isActive ? { y: [-1, 1, -1] } : {}}
                        transition={{ repeat: isActive ? Infinity : 0, duration: 2.2 }}
                        className={`w-14 h-14 rounded-full flex items-center justify-center
                                    bg-gradient-to-br from-brand-500 to-brand-600
                                    shadow-lg shadow-brand-500/40 border-4 border-surface-0`}
                      >
                        <Icon size={26} className="text-white" />
                      </motion.div>
                      <span className="text-[10px] mt-1 font-bold">{tr(labelKey)}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          }

          return (
            <li key={key} className="flex-1">
              <NavLink
                to={to}
                aria-label={tr(labelKey)}
                className={({ isActive }) =>
                  `relative flex flex-col items-center py-2 px-1 transition-colors min-h-touch justify-center
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-xl
                  ${isActive ? 'text-primary-700' : 'text-surface-500 hover:text-surface-700'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-brand-500"
                        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                      />
                    )}
                    <Icon size={22} />
                    <span className="text-[10px] mt-0.5 font-semibold">{tr(labelKey)}</span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
