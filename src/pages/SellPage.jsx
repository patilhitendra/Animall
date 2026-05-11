import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight, Check, PartyPopper } from 'lucide-react';

import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';
import StepProgress from '../components/animal/StepProgress';
import StepType from '../components/animal/sellSteps/StepType';
import StepPhotos from '../components/animal/sellSteps/StepPhotos';
import StepDetails from '../components/animal/sellSteps/StepDetails';
import StepContact from '../components/animal/sellSteps/StepContact';
import StepReview from '../components/animal/sellSteps/StepReview';

import { Button } from '../components/ui';
import useLanguage from '../hooks/useLanguage';
import { addAnimal } from '../store/slices/animalsSlice';
import { isValidIndianMobile } from '../utils/formatters';

const STEP_TYPE = 0;
const STEP_PHOTOS = 1;
const STEP_DETAILS = 2;
const STEP_CONTACT = 3;
const STEP_REVIEW = 4;

export default function SellPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tr } = useLanguage();
  const { token, user } = useSelector((s) => s.auth);

  const [step, setStep] = useState(STEP_TYPE);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

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

  // ── Step labels (i18n)
  const stepLabels = useMemo(() => ([
    tr('sell_step_type'),
    tr('sell_step_photos'),
    tr('sell_step_details'),
    tr('sell_step_contact'),
    tr('sell_step_review'),
  ]), [tr]);

  // ── Schemas (built lazily so messages stay localized)
  const detailsSchema = z.object({
    breed: z.string().min(1, tr('required_breed')),
    price: z.string().min(1, tr('required_price')),
    location: z.string().min(1, tr('required_location')),
  });
  const contactSchema = z.object({
    contactPhone: z.string().refine(isValidIndianMobile, tr('required_contact')),
  });

  // ── Step validators
  const validateStep = (n) => {
    setErrors({});
    if (n === STEP_PHOTOS && files.length === 0) {
      toast.error(tr('required_photo'));
      return false;
    }
    if (n === STEP_DETAILS) {
      const res = detailsSchema.safeParse(form);
      if (!res.success) {
        const flat = Object.fromEntries(
          res.error.issues.map((i) => [i.path[0], i.message])
        );
        setErrors(flat);
        return false;
      }
    }
    if (n === STEP_CONTACT) {
      const res = contactSchema.safeParse(form);
      if (!res.success) {
        setErrors({ contactPhone: res.error.issues[0].message });
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(STEP_REVIEW, s + 1));
  };
  const back = () => {
    if (step === STEP_TYPE) return navigate(-1);
    setStep((s) => Math.max(STEP_TYPE, s - 1));
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
      files.forEach((f) => f && fd.append('images', f));
      fd.append('sellerName', user?.name || '');
      fd.append('sellerPhone', form.contactPhone);
      fd.append('age', '');
      fd.append('ageUnit', 'years');

      await dispatch(addAnimal({ formData: fd, token }));
      toast.success(tr('listing_added'));
      setDone(true);
    } catch {
      toast.error(tr('error_generic'));
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col">
        <Header title={tr('sell_step_review')} showBack onBack={() => navigate('/')} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 220 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-2xl shadow-primary-500/30 mb-5 text-white"
          >
            <PartyPopper size={42} />
          </motion.div>
          <h2 className="text-2xl font-extrabold text-surface-900 mb-1">{tr('sell_success_title')}</h2>
          <p className="text-sm text-surface-500 mb-6 max-w-xs">{tr('sell_success_subtitle')}</p>
          <div className="flex gap-3 w-full max-w-sm">
            <Button fullWidth variant="secondary" onClick={() => navigate('/')}>
              {tr('nav_home')}
            </Button>
            <Button fullWidth onClick={() => navigate('/my-listings')}>
              {tr('sell_my_animals')}
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    // BottomNav is intentionally hidden in the wizard — it's a focused task.
    // The user exits via the header back arrow.
    <div className="min-h-screen pb-28">
      <Header title={tr('home_banner_sell_title')} showBack onBack={back} />

      <div className="px-4 pt-3">
        <StepProgress steps={stepLabels} current={step} />
      </div>

      <main className="px-4 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {step === STEP_TYPE && (
              <StepType
                value={form.type}
                onChange={(v) => setForm((f) => ({ ...f, type: v, breed: '', calving: '', milkPerDay: '' }))}
              />
            )}
            {step === STEP_PHOTOS && (
              <StepPhotos
                files={files}
                previews={previews}
                onChange={(f, p) => { setFiles(f); setPreviews(p); }}
              />
            )}
            {step === STEP_DETAILS && (
              <StepDetails value={form} onChange={setForm} errors={errors} />
            )}
            {step === STEP_CONTACT && (
              <StepContact value={form} onChange={setForm} errors={errors} />
            )}
            {step === STEP_REVIEW && (
              <StepReview value={form} previews={previews} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky action bar — sits at the bottom (no BottomNav in wizard) */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface-0 border-t border-surface-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex gap-3">
        <Button
          variant="secondary"
          size="lg"
          leftIcon={ArrowLeft}
          onClick={back}
        >
          {tr('back')}
        </Button>
        {step < STEP_REVIEW ? (
          <Button fullWidth size="lg" onClick={next} rightIcon={ArrowRight}>
            {tr('next')}
          </Button>
        ) : (
          <Button fullWidth size="lg" loading={submitting} onClick={submit} rightIcon={Check}>
            {tr('submit')}
          </Button>
        )}
      </div>
    </div>
  );
}
