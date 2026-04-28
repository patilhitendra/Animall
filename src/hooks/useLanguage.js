import { useSelector } from 'react-redux';
import { t } from '../i18n';

/**
 * Hook: returns a translation function bound to the current language.
 * Usage:
 *   const { tr, lang } = useLanguage();
 *   tr('cow') → 'गाय' (Marathi) or 'Cow' (English)
 */
export default function useLanguage() {
  const lang = useSelector((s) => s.ui.lang);
  return {
    lang,
    tr: (key) => t(key, lang),
  };
}
