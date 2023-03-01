import { StatusEnum } from '../../../../constants/status.enum';
import { PlotDTO } from '../../../../types/entities/plot';
import { TranslationNamespace } from '../translationsSchema';

export const DEFAULT_FORM_VALUES: PlotDTO = {
  id: '',
  name: '',
  status: StatusEnum.Draft,
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
