import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

export const I18N_CORE = 'translations';
const DEFAULT_LANGUAGE_CODE = 'en';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    load: 'languageOnly',
    ns: [I18N_CORE],
    defaultNS: I18N_CORE,
    lng: DEFAULT_LANGUAGE_CODE,
    preload: [DEFAULT_LANGUAGE_CODE],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      useSuspense: false,
    },
  });

export default i18n;
