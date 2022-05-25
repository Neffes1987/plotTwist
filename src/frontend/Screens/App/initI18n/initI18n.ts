import { initReactI18next } from 'react-i18next';
import { use } from 'i18next';

import Resources from './translations.json';

export function initI18n(): void {
  use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: Resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

initI18n();
