import { PlotDTO } from 'backend';

import { TranslationNamespace } from '../../App/initI18n/translationsSchema';

export const DEFAULT_FORM_VALUES: Omit<PlotDTO, 'worlds'> = {
  id: '',
  name: '',
  description: '',
  status: 'draft',
};

export const PLOT_TRANSLATION_SCHEMA = {
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

export const plotListTranslations = new TranslationNamespace<typeof PLOT_TRANSLATION_SCHEMA>('pages.plotList', PLOT_TRANSLATION_SCHEMA);
