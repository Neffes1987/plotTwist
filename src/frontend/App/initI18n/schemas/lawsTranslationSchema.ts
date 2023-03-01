import { TranslationNamespace } from '../translationsSchema';

import { COMMON_LIST_TRANSLATION_SCHEMA } from './common-options';

export const DEFAULT_FORM_VALUES: LawInWorldDTO = {
  id: '',
  isBroken: false,
  punishment: '',
  name: '',
  description: '',
};

const LAWS_EXTENDED_SCHEMA = {
  ...COMMON_LIST_TRANSLATION_SCHEMA,
  labels: {
    ...COMMON_LIST_TRANSLATION_SCHEMA.labels,
    punishment: 'punishment',
  },
};

export const lawListTranslations = new TranslationNamespace<typeof LAWS_EXTENDED_SCHEMA>('pages.lawsList', LAWS_EXTENDED_SCHEMA);
