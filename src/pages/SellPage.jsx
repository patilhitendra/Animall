import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAnimal, ANIMAL_META } from '../store/slices/animalsSlice';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import useLanguage from '../hooks/useLanguage';
import { compressImage, fileToPreview } from '../services/imageService';
import toast from 'react-hot-toast';

// Animal type options — matching reference
const ANIMAL_TYPES = [
  { key: 'cow',     label: 'गाय',    emoji: '🐄' },
  { key: 'buffalo', label: 'म्हैस',  emoji: '🐃' },
  { key: 'goat',    label: 'बकरी',   emoji: '🐐' },
  { key: 'other',   label: 'इतर',    emoji: '🐾' },
];

// Breed options per type
const BREEDS = {
  cow:     ['जर्सी क्रॉस', 'एच.एफ.', 'गीर', 'साहिवाल', 'खिल्लार', 'इतर'],
  buffalo: ['मुर्ग क्रॉस', 'मुर्रा', 'हरयाणवी', 'सुरती', 'मेहसाणा', 'इतर'],
  goat:    ['उस्मानाबादी', 'संगमनेरी', 'बेरारी', 'इतर'],
  other:   ['इतर'],
};

// Calving options
const CALVING_OPTIONS = ['प्रसूत झाले नाही', 'पहिले', 'दुसरे', 'तिसरे', 'इतर'];

export default function SellPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const { token, user } = useSelector((s) => s.auth);
  const fileInputRef1 = useRef();
  const fileInputRef2 = useRef();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    type: 'cow',
    breed: '',
    calving: '',
    milkPerDay: '',
    price: '',
    location: '',
    description: '',
    contactPhone: user?.phone || '',
  });
  const [previews, setPreviews] = useState([null, null]); // Side + head photo
  const [files, setFiles] = useState([null, null]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  // Handle photo slot (0 = side, 1 = head)
  const handlePhoto = async (e, slot) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    const preview = await fileToPreview(compressed);
    const newFiles = [...files]; newFiles[slot] = compressed;
    const newPreviews = [...previews]; newPreviews[slot] = preview;
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!form.price) { toast.error('भाव टाका'); return; }
    if (!form.location) { toast.error('स्थान टाका'); return; }
    if (!/^[6-9]\d{9}$/.test(form.contactPhone)) { toast.error('संपर्क नंबर बरोबर नाही'); return; }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => { if (f) fd.append('images', f); });
      fd.append('sellerName', user?.name || '');
      fd.append('sellerPhone', form.contactPhone);
      fd.append('age', 2); fd.append('ageUnit', 'years'); // default
      fd.append('description', `${form.breed || ''} | ${form.calving || ''} | ${form.milkPerDay ? form.milkPerDay + ' लिटर/दिवस' : ''}`);

      await dispatch(addAnimal({ formData: fd, token }));
      toast.success('✅ जनावर अपलोड झाले!');
      navigate('/my-listings');
    } catch {
      toast.error(tr('error_generic'));
    } finally {
      setSubmitting(false);
    }
  };

  const BreedOptions = BREEDS[form.type] || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Header title="गुरेढोरे विक्री करा" showBack />

      {/* My listings link */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
          <span>ⓘ</span>
          <span>FREE मध्ये जनावर नोंदणी करा</span>
        </div>
        <button onClick={() => navigate('/my-listings')} className="text-green-600 text-sm font-bold">
          माझी जनावरे &gt;
        </button>
      </div>

      <div className="px-4 py-3 space-y-5">

        {/* === Animal Type === */}
        <section className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-xl">🐄</span> कोणते जनावर <span className="text-red-500">*</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {ANIMAL_TYPES.map(({ key, label, emoji }) => (
              <button
                key={key}
                onClick={() => { set('type', key); set('breed', ''); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 font-semibold text-sm
                            transition-all active:scale-95
                            ${form.type === key
                              ? 'bg-green-600 border-green-600 text-white'
                              : 'bg-white border-gray-300 text-gray-700'
                            }`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </section>

        {/* === Breed (जाती) === */}
        {BreedOptions.length > 1 && (
          <section className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">🐄</span> जाती <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {BreedOptions.map((b) => (
                <button
                  key={b}
                  onClick={() => set('breed', b)}
                  className={`px-4 py-2 rounded-full border-2 font-semibold text-sm transition-all active:scale-95
                              ${form.breed === b
                                ? 'bg-green-600 border-green-600 text-white'
                                : 'bg-white border-gray-300 text-gray-700'
                              }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* === Calving period (दुधाचा कालावधी) === */}
        <section className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-xl">🐄</span> दुधाचा कालावधी निवडा <span className="text-red-500">*</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {CALVING_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => set('calving', c)}
                className={`px-4 py-2 rounded-full border-2 font-semibold text-sm transition-all active:scale-95
                            ${form.calving === c
                              ? 'bg-green-600 border-green-600 text-white'
                              : 'bg-white border-gray-300 text-gray-700'
                            }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* === Milk per day === */}
        <section className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <span className="text-xl">🥛</span> आता च दूध (प्रति दिवस)
          </p>
          <p className="text-xs text-gray-400 mb-3">आज पर्यंतच्या 2 वेळेस पूर्ण दूध</p>
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden
                          focus-within:border-green-500">
            <input
              type="number"
              inputMode="decimal"
              value={form.milkPerDay}
              onChange={(e) => set('milkPerDay', e.target.value)}
              placeholder="उदा: 10"
              className="flex-1 px-4 py-3 text-base outline-none"
            />
            <span className="px-4 py-3 bg-gray-50 text-gray-500 font-semibold border-l border-gray-200">
              लीटर
            </span>
          </div>
        </section>

        {/* === Price === */}
        <section className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <span className="text-xl">💰</span> भाव (₹) <span className="text-red-500">*</span>
          </p>
          <p className="text-xs text-gray-400 mb-3">योग्य भाव टाका, यामुळे अधिक खरेदीदार कॉल करतात</p>
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden
                          focus-within:border-green-500">
            <input
              type="number"
              inputMode="numeric"
              value={form.price}
              onChange={(e) => set('price', e.target.value)}
              placeholder="उदा: ₹40,000"
              className="flex-1 px-4 py-3 text-base outline-none"
            />
            <span className="px-4 py-3 bg-gray-50 text-gray-500 font-semibold border-l border-gray-200">
              रुपए
            </span>
          </div>
        </section>

        {/* === Photos (2 slots: side + head) === */}
        <section className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <span className="text-xl">📷</span> फोटो अपलोड करा (किमान एक)
            <span className="text-red-500">*</span>
          </p>
          <p className="text-xs text-gray-400 mb-3">चांगले फोटो लवकर विकीस मदत करतात</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'साइड फोटो निवडा', ref: fileInputRef1, slot: 0 },
              { label: 'थनाचा फोटो निवडा', ref: fileInputRef2, slot: 1 },
            ].map(({ label, ref, slot }) => (
              <div key={slot}>
                <input
                  ref={ref}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handlePhoto(e, slot)}
                />
                <button
                  type="button"
                  onClick={() => ref.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl overflow-hidden
                             aspect-square flex flex-col items-center justify-center gap-2
                             bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  {previews[slot] ? (
                    <img src={previews[slot]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <span className="text-gray-300 text-4xl">🐄</span>
                      <span className="text-xs text-gray-400 px-2 text-center">{label}</span>
                    </>
                  )}
                </button>
                {previews[slot] && (
                  <button
                    className="w-full mt-1 py-2 bg-green-600 text-white text-xs font-bold rounded-xl"
                    onClick={() => ref.current?.click()}
                  >
                    फोटो निवडा
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* === Location === */}
        <section className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
            <span className="text-xl">📍</span> स्थान
          </p>
          <p className="text-xs text-gray-400 mb-3">खरेदीदारांना तुमचे जनावर येथे दिसेल</p>
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden
                          focus-within:border-green-500">
            <input
              type="text"
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
              placeholder="आपल्या जिल्हा आणि गावचे नाव प्रविष्ट करा"
              className="flex-1 px-4 py-3 text-base outline-none"
            />
            <button className="px-3 py-3 text-green-600 font-bold text-sm border-l border-gray-200">
              बदलें
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">दर 30 दिवसांनी 1 जनावर विनामूल्य नोंदणी करू शकतात</p>
        </section>

        {/* === Contact === */}
        <section className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-xl">📞</span> संपर्क नंबर <span className="text-red-500">*</span>
          </p>
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden
                          focus-within:border-green-500">
            <span className="px-3 py-3 text-gray-500 font-bold border-r border-gray-200">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              value={form.contactPhone}
              onChange={(e) => set('contactPhone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="9876543210"
              className="flex-1 px-4 py-3 text-base font-semibold outline-none"
            />
          </div>
        </section>

      </div>

      {/* === Sticky CTA === */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        {/* Live buyer count badge */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold
                           px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </span>
          <span className="text-xs text-gray-600 flex items-center gap-1">
            👥 200 खरेदीदार पशु शोधत आहेत
          </span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-green-600 text-white py-4 rounded-2xl text-lg font-bold
                     shadow-button active:scale-95 transition-transform
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'अपलोड होत आहे...' : '✓ अपलोड करा'}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
