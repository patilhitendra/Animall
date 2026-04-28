import mr from './mr';
import en from './en';

export const translations = { mr, en };

/**
 * Get translation string.
 * Usage: t('cow', lang) → 'गाय' or 'Cow'
 */
export const t = (key, lang = 'mr') => {
  return translations[lang]?.[key] ?? translations['en']?.[key] ?? key;
};

export default translations;
