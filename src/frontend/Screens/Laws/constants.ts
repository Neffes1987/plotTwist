import { LawDTO } from '../../../app/domain/entities/interface';
import { TranslationNamespace } from '../../App/initI18n/translationsSchema';

export const DEFAULT_FORM_VALUES: Omit<LawDTO, 'id'> = {
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
  },
  errors: {},
  labels: {
    name: 'name',
    description: 'description',
  },
};

export const plotListTranslations = new TranslationNamespace<typeof TRANSLATION_SCHEMA>('pages.plotList', TRANSLATION_SCHEMA);
