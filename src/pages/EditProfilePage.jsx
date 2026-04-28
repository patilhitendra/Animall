import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    language: 'मराठी',
    location: user?.location || '',
    whatsapp: user?.phone || '',
    phone: user?.phone || '',
    dob: '',
    livestock: '',
    occupation: '',
    experience: '',
    appUsage: '',
    education: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-gray-700 text-2xl">←</button>
          <h1 className="text-lg font-bold text-gray-800">तुमची प्रोफाइल</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center py-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl mb-2 relative">
            👤
            <button type="button" className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              📷
            </button>
          </div>
          <p className="text-sm font-semibold text-gray-900">फोटो जोडा</p>
          <p className="text-xs text-gray-500">तुमचा फोटो जोडून तुमचा प्रोफाइल अधिक विश्वासार्ह करा</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-700">⚠️ तुमची प्रोफाइल पूर्ण करा आणि 10 🪙 कमवा!</span>
            <span className="text-sm font-bold text-orange-600">25 %</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">तुमचे नाव</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
            placeholder="Hitendra"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">निवडलेली भाषा / Language</label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({...formData, language: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none appearance-none bg-white"
          >
            <option value="मराठी">मराठी</option>
            <option value="English">English</option>
            <option value="हिंदी">हिंदी</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">तुमच्या पत्ता</label>
          <div className="relative">
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
              placeholder="अलवर, राजस्थान"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 flex items-center gap-1">
              ➕ शोधा
            </button>
          </div>
          <p className="text-xs text-orange-500 mt-1">ते फक्त एकदाच बदलले जाऊ शकते</p>
        </div>

        {/* Contact Numbers */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">WhatsApp नंबर</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">💬</span>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                placeholder="कृपया प्रविष्ट करा"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">फोन नंबर</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">📞</span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                placeholder="7798865981"
              />
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">जन्मदिन</label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({...formData, dob: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
          />
        </div>

        {/* Livestock Count */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">माझ्याकडे प्राणी आहेत</label>
          <input
            type="number"
            value={formData.livestock}
            onChange={(e) => setFormData({...formData, livestock: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
            placeholder="3"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">काम</label>
          <select
            value={formData.occupation}
            onChange={(e) => setFormData({...formData, occupation: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none appearance-none bg-white"
          >
            <option value="">निवडा</option>
            <option value="HOME">घरासाठी प्राणी पाळणे</option>
            <option value="FARMING">शेती करणे</option>
            <option value="DAIRY">डेअरी व्यवसाय</option>
            <option value="TRADING">खरेदी/विक्री व्यवसाय</option>
            <option value="OTHER">इतर</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">तुम्ही किती वर्षे पशुपालन करत आहात?</label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none appearance-none bg-white"
          >
            <option value="">निवडा</option>
            <option value="0-5">0-5 वर्षे</option>
            <option value="6-10">6-10 वर्षे</option>
            <option value="11-15">11-15 वर्षे</option>
            <option value="16-25">16-25 वर्षे</option>
            <option value="25-30">25-30 वर्षे</option>
            <option value="30+">30 पेक्षा जास्त वर्षे</option>
          </select>
        </div>

        {/* App Usage */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">तुम्ही Animall अ‍ॅप कोणत्या कारणासाठी वापरता?</label>
          <select
            value={formData.appUsage}
            onChange={(e) => setFormData({...formData, appUsage: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none appearance-none bg-white"
          >
            <option value="">निवडा</option>
            <option value="HOME_BUY_SELL">घरासाठी प्राणी खरेदी किंवा विक्रीसाठी</option>
            <option value="BUSINESS">व्यवसायासाठी</option>
            <option value="DAIRY_BUY_SELL">डेअरीसाठी प्राणी खरेदी किंवा विक्रीसाठी</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">तुमचे शिक्षण किती आहे?</label>
          <select
            value={formData.education}
            onChange={(e) => setFormData({...formData, education: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none appearance-none bg-white"
          >
            <option value="">निवडा</option>
            <option value="NONE">शिक्षण नाही</option>
            <option value="BASIC">मूलभूत शिक्षण</option>
            <option value="UPTO_5">5वीपर्यंत</option>
            <option value="UPTO_8">8वीपर्यंत</option>
            <option value="UPTO_10">10वीपर्यंत</option>
            <option value="UPTO_12">12वीपर्यंत</option>
            <option value="GRADUATE">पदवीधर</option>
            <option value="OTHER">इतर</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-teal-700 active:scale-[0.98] transition-all"
        >
          प्रविष्ट करा
        </button>
      </form>
    </div>
  );
}
