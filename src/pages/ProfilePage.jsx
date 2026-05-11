import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight, Edit3, LogOut, Phone, PhoneIncoming,
  Heart, Coins, MessageSquare, Wallet,
} from 'lucide-react';
import toast from 'react-hot-toast';

import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import ThemeToggle from '../components/common/ThemeToggle';
import { logout } from '../store/slices/authSlice';
import useLanguage from '../hooks/useLanguage';
import { Avatar, Card, Button } from '../components/ui';
import { formatPhoneDisplay } from '../utils/formatters';

function Section({ title, children }) {
  return (
    <section className="mb-3">
      <h3 className="px-4 pt-3 pb-2 text-xs font-bold uppercase tracking-wide text-surface-500">{title}</h3>
      <Card className="!rounded-none border-x-0">{children}</Card>
    </section>
  );
}

function MenuItem({ icon: Icon, label, onClick, accent }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-surface-50 active:bg-surface-100 transition-colors border-b border-surface-50 last:border-b-0
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300`}
    >
      <span className="flex items-center gap-3">
        <span className={`w-9 h-9 rounded-full flex items-center justify-center ${accent || 'bg-surface-100 text-surface-700'}`}>
          <Icon size={18} />
        </span>
        <span className="text-sm font-semibold text-surface-800">{label}</span>
      </span>
      <ChevronRight size={18} className="text-surface-400" />
    </button>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tr } = useLanguage();
  const { user } = useSelector((s) => s.auth);

  const handleLogout = () => {
    if (!window.confirm(tr('profile_confirm_logout'))) return;
    dispatch(logout());
    toast.success(tr('done'));
    navigate('/login');
  };

  return (
    <div className="min-h-screen pb-28">
      <Header title={tr('profile_title')} showBack />

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 pt-4"
      >
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <Avatar src={user?.profilePhoto} name={user?.name || 'A'} size="xl" />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-extrabold text-surface-900 truncate">
                {user?.name || tr('seller')}
              </h2>
              <p className="text-sm text-surface-500 truncate">
                {user?.location ? `${user.location} · ` : ''}{formatPhoneDisplay(user?.phone)}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
            <Button size="sm" variant="secondary" leftIcon={Edit3} onClick={() => navigate('/edit-profile')}>
              {tr('edit')}
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <section className="px-4 mt-4">
        <p className="text-xs text-surface-500 mb-2">{tr('profile_journey')}</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 0, label: tr('profile_listings_posted'), icon: '🐄' },
            { value: 0, label: tr('profile_calls_made'),     icon: '📞' },
            { value: 0, label: tr('profile_calls_received'), icon: '📲' },
          ].map((s) => (
            <Card key={s.label} className="p-4 text-center !shadow-sm">
              <span className="text-2xl">{s.icon}</span>
              <p className="text-2xl font-extrabold text-surface-900 mt-1">{s.value}</p>
              <p className="text-[11px] text-surface-500 leading-tight mt-1">{s.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Sections */}
      <div className="mt-4">
        <Section title={tr('profile_section_selling')}>
          <MenuItem icon={Wallet} label={tr('profile_my_plan')} onClick={() => {}} accent="bg-accent-100 text-accent-700" />
          <MenuItem icon={PhoneIncoming} label={tr('profile_my_animals')} onClick={() => navigate('/my-listings')} accent="bg-primary-100 text-primary-700" />
          <MenuItem icon={Phone} label={tr('profile_calls_received')} onClick={() => {}} accent="bg-blue-100 text-blue-700" />
        </Section>

        <Section title={tr('profile_section_buying')}>
          <MenuItem icon={Phone} label={tr('profile_calls_made')} onClick={() => {}} accent="bg-purple-100 text-purple-700" />
          <MenuItem icon={Heart} label={tr('profile_liked')} onClick={() => {}} accent="bg-rose-100 text-rose-600" />
        </Section>

        <Section title={tr('profile_section_other')}>
          <MenuItem icon={Coins} label={tr('profile_coins')} onClick={() => {}} accent="bg-yellow-100 text-yellow-700" />
          <MenuItem icon={MessageSquare} label={tr('profile_help')} onClick={() => {}} accent="bg-primary-100 text-primary-700" />
        </Section>

        <Section title={tr('profile_section_help')}>
          <MenuItem icon={LogOut} label={tr('profile_logout')} onClick={handleLogout} accent="bg-red-50 text-red-500" />
        </Section>
      </div>

      <BottomNav />
    </div>
  );
}
