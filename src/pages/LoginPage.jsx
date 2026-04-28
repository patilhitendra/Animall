import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../store/slices/authSlice';
import { toggleLang } from '../store/slices/uiSlice';
import useLanguage from '../hooks/useLanguage';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tr, lang } = useLanguage();
  const { loading } = useSelector((s) => s.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error('10 अंकी मोबाईल नंबर टाका');
      return;
    }
    const result = await dispatch(sendOTP(phone));
    if (sendOTP.fulfilled.match(result)) {
      toast.success(tr('otp_sent'));
      navigate('/otp');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5e6c8]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-2xl">🐄</span>
          <div>
            <p className="text-green-700 font-extrabold text-base leading-tight">Animall.in</p>
            <p className="text-gray-500 text-[10px] leading-tight">गाय भैस वाला ऐप</p>
          </div>
        </div>
        <button
          onClick={() => dispatch(toggleLang())}
          className="flex items-center gap-1 border-2 border-green-600 text-green-700 font-bold px-3 py-1.5 rounded-full text-sm"
        >
          <span className="text-blue-500">🌐</span>
          {lang === 'mr' ? 'मराठी' : 'English'}
          <span className="text-xs">▾</span>
        </button>
      </div>

      {/* Illustration area */}
      <div className="relative flex-1 flex flex-col">
        {/* Farmer + cow illustration background */}
        <div
          className="w-full flex-1 flex items-end justify-center pb-4 bg-gradient-to-b from-[#c8e6c9] to-[#f5e6c8]"
          style={{ minHeight: '45vh' }}
        >
          <div className="w-full max-w-md px-4">
            <img
              src="/images/farmer-illustration.png"
              alt="Farmer with cows illustration"
              className="w-full h-auto object-contain"
              style={{ aspectRatio: '4/3' }}
              onError={(e) => {
                // Fallback to SVG if image not found
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* White card bottom sheet */}
        <div className="bg-white rounded-t-3xl shadow-2xl px-6 pt-6 pb-8">
          <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-1">
            Animall मध्ये आपले स्वागत आहे
          </h2>
          <p className="text-center text-gray-500 text-sm mb-5">
            पशु खरेदी किंवा विक्री करण्यासाठी फोन नंबर द्या
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone */}
            <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden
                            focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100
                            bg-white shadow-sm transition-all">
              <div className="flex items-center px-4 py-4 border-r border-gray-200 bg-gray-50">
                <span className="text-base">🇮🇳</span>
                <span className="ml-2 font-bold text-gray-700">+91</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="आपला मोबाईल नंबर टाका"
                className="flex-1 px-4 py-4 text-base text-gray-900 bg-white outline-none placeholder:text-gray-400"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-2xl 
                         text-lg font-bold shadow-lg shadow-teal-200 active:scale-[0.98] 
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  थांबा...
                </span>
              ) : (
                'पुढे जा'
              )}
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
              <span className="text-green-600 text-sm">✓</span>
              <p className="text-xs text-green-700">1 कोटी+ शेतकऱ्यांनी विश्वास ठेवला</p>
            </div>
            
            <p className="text-center text-xs text-gray-400 leading-relaxed">
              Terms  |  Privacy  |  Animall Technologies © 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
