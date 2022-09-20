import { LawDTO } from 'backend';

import { TranslationNamespace } from '../../App/initI18n/translationsSchema';

export const DEFAULT_FORM_VALUES: LawDTO = {
  id: '',
  isBroken: false,
  punishment: '',
  name: '',
  description: '',
};

export const TRANSLATION_SCHEMA = {
  caption: 'caption',
  messages: {
    wasCreated: 'wasCreated',
    emptyList: 'emptyList',
  },
  actions: {
    addNew: 'addNew',
    update: 'update',
    delete: 'delete',
    open: 'open',
    assign: 'assign',
    unAssign: 'unAssign',
  },
  errors: {},
  labels: {
    name: 'name',
    description: 'description',
    punishment: 'punishment',
  },
};

export const lawListTranslations = new TranslationNamespace<typeof TRANSLATION_SCHEMA>('pages.lawsList', TRANSLATION_SCHEMA);
