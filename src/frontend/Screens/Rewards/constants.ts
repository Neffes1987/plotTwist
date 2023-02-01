import { TranslationNamespace } from '../../App/initI18n/translationsSchema';

export const DEFAULT_FORM_VALUES: RewardInEdgeDTO = {
  description: '',
  name: '',
  id: '',
  isAssigned: false,
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

export const lawListTranslations = new TranslationNamespace<typeof TRANSLATION_SCHEMA>('pages.rewardsList', TRANSLATION_SCHEMA);
