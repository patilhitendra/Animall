import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import toast from 'react-hot-toast';

import Header from '../components/common/Header';
import { updateUser } from '../store/slices/authSlice';
import useLanguage from '../hooks/useLanguage';
import { Input, Select, Button, Card } from '../components/ui';
import { LANG_OPTIONS } from '../i18n';
import { setLang } from '../store/slices/uiSlice';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tr, lang } = useLanguage();
  const { user } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: user?.name || '',
    language: lang,
    location: user?.location || '',
    whatsapp: user?.phone || '',
    phone: user?.phone || '',
    dob: user?.dob || '',
    livestock: user?.livestock || '',
    occupation: user?.occupation || '',
    experience: user?.experience || '',
    appUsage: user?.appUsage || '',
    education: user?.education || '',
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      name: form.name,
      location: form.location,
      phone: form.phone,
      dob: form.dob,
      livestock: form.livestock,
      occupation: form.occupation,
      experience: form.experience,
      appUsage: form.appUsage,
      education: form.education,
    }));
    if (form.language !== lang) dispatch(setLang(form.language));
    toast.success(tr('done'));
    navigate('/profile');
  };

  const langOptions = LANG_OPTIONS.map(({ code, label }) => ({ value: code, label }));
  const occupationOptions = [
    { value: 'HOME',    label: tr('occupation_home') },
    { value: 'FARMING', label: tr('occupation_farming') },
    { value: 'DAIRY',   label: tr('occupation_dairy') },
    { value: 'TRADING', label: tr('occupation_trading') },
    { value: 'OTHER',   label: tr('occupation_other') },
  ];
  const experienceOptions = [
    { value: '0-5',   label: '0-5' },
    { value: '6-10',  label: '6-10' },
    { value: '11-15', label: '11-15' },
    { value: '16-25', label: '16-25' },
    { value: '25-30', label: '25-30' },
    { value: '30+',   label: '30+' },
  ];
  const appUsageOptions = [
    { value: 'HOME_BUY_SELL',  label: tr('app_usage_home') },
    { value: 'BUSINESS',       label: tr('app_usage_business') },
    { value: 'DAIRY_BUY_SELL', label: tr('app_usage_dairy') },
  ];
  const educationOptions = [
    { value: 'NONE',     label: tr('edu_none') },
    { value: 'BASIC',    label: tr('edu_basic') },
    { value: 'UPTO_5',   label: tr('edu_upto_5') },
    { value: 'UPTO_8',   label: tr('edu_upto_8') },
    { value: 'UPTO_10',  label: tr('edu_upto_10') },
    { value: 'UPTO_12',  label: tr('edu_upto_12') },
    { value: 'GRADUATE', label: tr('edu_graduate') },
    { value: 'OTHER',    label: tr('edu_other') },
  ];

  return (
    <div className="min-h-screen pb-12">
      <Header title={tr('edit_profile')} showBack />

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Profile photo */}
        <Card className="p-5 flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-100 to-accent-300 flex items-center justify-center text-4xl text-accent-800 font-bold">
              {form.name?.[0]?.toUpperCase() || '👤'}
            </div>
            <button type="button" aria-label={tr('add_photo')}
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-surface-0 border border-surface-200 shadow flex items-center justify-center">
              <Camera size={16} className="text-surface-700" />
            </button>
          </div>
          <p className="text-sm font-bold mt-2 text-surface-900">{tr('add_photo')}</p>
          <p className="text-xs text-surface-500 mt-0.5 max-w-xs">{tr('edit_profile_photo')}</p>
        </Card>

        <Input
          label={tr('edit_profile_name')}
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder={tr('edit_profile_name')}
        />

        <Select
          label={tr('edit_profile_language')}
          value={form.language}
          onChange={(e) => set('language', e.target.value)}
          options={langOptions}
        />

        <Input
          label={tr('edit_profile_address')}
          hint={tr('edit_profile_address_once_warning')}
          value={form.location}
          onChange={(e) => set('location', e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label={tr('edit_profile_whatsapp')}
            type="tel"
            inputMode="numeric"
            value={form.whatsapp}
            onChange={(e) => set('whatsapp', e.target.value.replace(/\D/g, '').slice(0, 10))}
          />
          <Input
            label={tr('edit_profile_phone')}
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
          />
        </div>

        <Input
          label={tr('edit_profile_dob')}
          type="date"
          value={form.dob}
          onChange={(e) => set('dob', e.target.value)}
        />

        <Input
          label={tr('edit_profile_livestock')}
          type="number"
          inputMode="numeric"
          value={form.livestock}
          onChange={(e) => set('livestock', e.target.value)}
        />

        <Select
          label={tr('edit_profile_occupation')}
          value={form.occupation}
          onChange={(e) => set('occupation', e.target.value)}
          options={occupationOptions}
          placeholder={tr('select')}
        />

        <Select
          label={tr('edit_profile_experience')}
          value={form.experience}
          onChange={(e) => set('experience', e.target.value)}
          options={experienceOptions}
          placeholder={tr('experience_pick')}
        />

        <Select
          label={tr('edit_profile_app_usage')}
          value={form.appUsage}
          onChange={(e) => set('appUsage', e.target.value)}
          options={appUsageOptions}
          placeholder={tr('select')}
        />

        <Select
          label={tr('edit_profile_education')}
          value={form.education}
          onChange={(e) => set('education', e.target.value)}
          options={educationOptions}
          placeholder={tr('select')}
        />

        <Button type="submit" size="lg" fullWidth>
          {tr('edit_profile_save')}
        </Button>
      </form>
    </div>
  );
}
