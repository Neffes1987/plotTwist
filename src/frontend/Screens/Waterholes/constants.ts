import { TranslationNamespace } from '../../App/initI18n/translationsSchema';

export const DEFAULT_FORM_VALUES: LawInWorldDTO = {
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
  },
};

export const waterholesListTranslations = new TranslationNamespace<typeof TRANSLATION_SCHEMA>('pages.waterholesList', TRANSLATION_SCHEMA);
