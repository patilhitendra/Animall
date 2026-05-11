import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { sendOTP } from '../store/slices/authSlice';
import useLanguage from '../hooks/useLanguage';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import { Button, Input } from '../components/ui';
import { isValidIndianMobile } from '../utils/formatters';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const { loading } = useSelector((s) => s.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidIndianMobile(phone)) {
      setError(tr('invalid_mobile'));
      return;
    }
    setError('');
    const result = await dispatch(sendOTP(phone));
    if (sendOTP.fulfilled.match(result)) {
      toast.success(tr('otp_sent'));
      navigate('/otp');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-100 via-accent-50 to-accent-100">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-surface-0/70 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐄</span>
          <div className="leading-tight">
            <p className="text-primary-700 font-extrabold text-base">Animall</p>
            <p className="text-surface-500 text-[10px]">{tr('app_tagline')}</p>
          </div>
        </div>
        <LanguageSwitcher />
      </header>

      {/* Illustration */}
      <div className="flex-1 flex items-end justify-center px-4 pt-4">
        <motion.img
          src="/images/farmer-illustration.png"
          alt={tr('home_banner_buy_alt')}
          className="w-full max-w-md object-contain"
          style={{ aspectRatio: '4/3' }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* Bottom sheet card */}
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 240 }}
        className="bg-surface-0 rounded-t-3xl shadow-2xl px-6 pt-7 pb-8 -mt-2"
      >
        <h2 className="text-2xl font-extrabold text-surface-900 text-center">{tr('welcome_to_animall')}</h2>
        <p className="text-center text-surface-500 text-sm mt-1 mb-5">{tr('enter_phone_to_continue')}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={tr('mobile_number')}
            type="tel"
            inputMode="numeric"
            autoFocus
            leftAddon={<span className="flex items-center gap-1.5">🇮🇳 +91</span>}
            value={phone}
            onChange={(e) => {
              setError('');
              setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
            }}
            placeholder={tr('mobile_placeholder')}
            error={error}
          />

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading || phone.length !== 10}
          >
            {tr('get_otp')}
          </Button>
        </form>

        <div className="mt-5 inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-2xl px-3 py-2 w-full">
          <CheckCircle2 className="text-primary-600 shrink-0" size={16} />
          <p className="text-xs text-primary-700 font-semibold">{tr('trusted_by_farmers')}</p>
        </div>

        <p className="text-center text-[11px] text-surface-400 mt-4">{tr('terms_privacy')}</p>
      </motion.div>
    </div>
  );
}
