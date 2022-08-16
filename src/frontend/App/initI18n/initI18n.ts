import { initReactI18next } from 'react-i18next';
import { Resource, use } from 'i18next';

import { Translation } from './translations';

export function initI18n(): void {
  use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: (Translation as unknown) as Resource,
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
