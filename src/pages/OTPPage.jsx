import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOTP, sendOTP } from '../store/slices/authSlice';
import useLanguage from '../hooks/useLanguage';
import AuthLoadingScreen from '../components/common/AuthLoadingScreen';
import toast from 'react-hot-toast';

export default function OTPPage() {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const { loading, pendingPhone, demoOtp } = useSelector((s) => s.auth);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { if (!pendingPhone) navigate('/login'); }, [pendingPhone, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) { toast.error('6 अंकी OTP टाका'); return; }
    
    setIsVerifying(true);
    
    const result = await dispatch(verifyOTP({ phone: pendingPhone, otp }));
    if (verifyOTP.fulfilled.match(result)) {
      toast.success(tr('login_success'));
      // Keep loading screen visible while navigating
      setTimeout(() => navigate('/'), 500);
    } else {
      setIsVerifying(false);
      toast.error('चुकीचा OTP, पुन्हा प्रयत्न करा');
      setOtp('');
    }
  };

  // Show loading screen when verifying
  if (isVerifying) {
    return <AuthLoadingScreen message="आपला OTP सत्यापित केला जात आहे..." />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5e6c8]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm">
        <span className="text-green-600 text-2xl">🐄</span>
        <div>
          <p className="text-green-700 font-extrabold text-base leading-tight">Animall.in</p>
          <p className="text-gray-500 text-[10px]">गाय भैस वाला ऐप</p>
        </div>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-gradient-to-b from-[#c8e6c9] to-[#f5e6c8]" style={{ minHeight: '45vh' }}>
          <div className="w-full max-w-md mx-auto px-4 pt-8">
            <img
              src="/images/farmer-illustration.png"
              alt="Farmer with cows illustration"
              className="w-full h-auto object-contain"
              style={{ aspectRatio: '4/3' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-t-3xl shadow-2xl px-6 pt-6 pb-8">
          <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-1">
            Animall मध्ये आपले स्वागत आहे
          </h2>
          <p className="text-center text-gray-600 font-semibold text-base mb-1">
            6 अंकी OTP टाका
          </p>

          {/* Demo OTP hint */}
          {demoOtp && (
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-2 mb-3 text-center">
              <p className="text-xs text-yellow-700">
                आम्ही 6 अंकी सत्यापन कोड पाठवला आहे
              </p>
              <p className="text-base font-bold text-yellow-900">+91 {pendingPhone}</p>
              <p className="text-xs text-yellow-600 mt-1">
                Demo OTP: <span className="font-extrabold text-lg text-yellow-800">{demoOtp}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Single 6-digit OTP input */}
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="6 अंकी OTP टाका"
              className="w-full text-center text-2xl font-bold tracking-[0.5em] py-4 px-6
                         border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none
                         bg-gray-50 transition-colors"
            />

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-2xl 
                         text-lg font-bold shadow-lg shadow-teal-200 active:scale-[0.98] 
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  तपासत आहे...
                </span>
              ) : (
                'OTP तपासा'
              )}
            </button>
          </form>

          <div className="flex justify-between mt-4 text-sm font-semibold">
            <button onClick={() => navigate('/login')} className="text-gray-500">
              फोन नंबर बदला
            </button>
            <button
              onClick={async () => { await dispatch(sendOTP(pendingPhone)); toast.success(tr('otp_sent')); }}
              className="text-green-600"
            >
              OTP पुन्हा पाठवा | 30 सेकंदांनी
            </button>
          </div>

          <p className="text-center text-xs text-gray-300 mt-4">
            Terms · Privacy · Animall Technologies © 2026
          </p>
        </div>
      </div>
    </div>
  );
}
